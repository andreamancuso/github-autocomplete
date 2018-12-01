import * as React from 'react';
import debounce from 'lodash.debounce';
import qs from 'qs';

import {GithubUser, GithubUserSearchResult} from './typings';

import {
    InputWrapper, 
    Input, 
    SearchIcon, 
    SpinnerImpl,
    OuterWrapper, 
    ResultsWrapper, 
    ResultsHeading, 
    User, 
    SelectedUser,
    UserAvatar
} from './styled-components';

interface Props {
    placeholder?: string;
    githubUsersEndpoint?: string;
}

interface State {
    value: string;
    results: GithubUser[];
    selectedItemIndex: number;
    isSearching: boolean;
    hasFocus: boolean;
    error: string;
}

class GithubUsersAutocomplete extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        placeholder: 'type a github username',
        githubUsersEndpoint: 'https://api.github.com/search/users'
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            error: '',
            isSearching: false,
            hasFocus: false,
            value: '', 
            selectedItemIndex: 0,
            results: []
        };
    }

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        this.setState(() => ({value}));
        this.searchUsers();
    };

    private handleOnFocus = () => {
        this.setState(() => ({hasFocus: true}));
    };

    private handleOnBlur = () => {
        // the delay allows for the click event to be captured
        window.setTimeout(() => this.setState(() => ({ hasFocus: false })), 250);
    };

    private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectedItemIndex, results, isSearching } = this.state;

        if (results.length === 0 || isSearching) {
            return;
        }

        if (e.keyCode === 38 && selectedItemIndex > 0) {
            // Down arrow
            this.setState(prevState => ({
                selectedItemIndex: prevState.selectedItemIndex - 1
            }))
        } else if (e.keyCode === 40 && selectedItemIndex < results.length - 1) {
            // Up arrow
            this.setState(prevState => ({
                selectedItemIndex: prevState.selectedItemIndex + 1
            }))
        } else if (e.keyCode === 13) {
            // Enter
            const selectedUser = this.state.results[selectedItemIndex];

            if (selectedUser) {
                // Can't take chances here, as setState() is asynchronous
                this.navigateToUrl(selectedUser.html_url);
            }
        }
    };

    private navigateToUrl = (url: string) => {
        window.location.href = url;
    };

    private searchUsers = debounce(async () => {
        this.setState(() => ({isSearching: true, error: '', selectedItemIndex: 0}));

        const {githubUsersEndpoint} = this.props;
        const qsParams = qs.stringify({q: this.state.value});

        try {
            const response = await fetch(`${githubUsersEndpoint}?${qsParams}`);
            const result: GithubUserSearchResult = await response.json();
            
            this.setState(() => ({ results: result.items.slice(0, 10), isSearching: false }));
        } catch (error) {
            this.setState(() => ({ isSearching: false, error: String(error)}));
            // todo: do something with the error
        }
    }, 1000);

    render() {
        const { placeholder } = this.props;
        const {results, isSearching, hasFocus} = this.state;

        const showResults = results.length > 0 && !isSearching && hasFocus;
        return (
            <OuterWrapper>
                <InputWrapper>
                    {!this.state.isSearching && <SearchIcon/> }
                    {this.state.isSearching && <SpinnerImpl/>}
                    <Input 
                        type="text" 
                        value={this.state.value}
                        onChange={this.handleOnChange}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleOnBlur}
                        placeholder={placeholder}
                        onKeyUp={this.handleOnKeyUp}
                    />
                </InputWrapper>
                {showResults && <ResultsWrapper>
                    <ResultsHeading>Github users</ResultsHeading>
                    {this.state.results.map((result, index) => {
                        const UserComp = index === this.state.selectedItemIndex ? SelectedUser : User
                        return (
                            <UserComp 
                                key={result.login} 
                                onClick={() => this.navigateToUrl(result.html_url)}
                            >
                                <UserAvatar src={result.avatar_url}/>{result.login}
                            </UserComp>
                        )
                    })}
                </ResultsWrapper>}
            </OuterWrapper>
        );
    }
}

export default GithubUsersAutocomplete;
