import * as React from 'react';
import {Search} from 'styled-icons/material'
import {Spinner} from 'styled-icons/fa-solid/Spinner'
import debounce from 'lodash.debounce';
import qs from 'qs';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    -webkit-transform: rotate(360deg); 
    transform:rotate(360deg);
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 10px;
`

const SpinnerImpl = styled(Spinner)`
  animation: ${spin} 1.2s linear infinite; 
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 10px;
`

const Input = styled.input`
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #d0d0d0;
  color: #333333;
  padding: 10px 10px 10px 35px;
  height: 40px;
  font-size: 20px;
  line-height: 20px;
  outline: 0;
  box-shadow: 0 8px 6px -6px #000000;
  width: 100%;

  :focus {
    border-color: #004877;
  }
`;

const OuterWrapper = styled.div`
  font-family: sans-serif;
  width: 100%;
  position: relative;
`;

const ResultsWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #f3f3f3;
  box-shadow: 0 8px 6px -6px #000000;
`;

const ResultsHeading = styled.div`
  text-transform: uppercase;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  padding: 10px;
`;

const User = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  border: 1px solid #d0d0d0;
  border-top: 0;
  background-color: #ffffff;
  display: flex;
  cursor: pointer;

  :hover {
    background-color: #004877;
    color: #ffffff;
  }

`;

const SelectedUser = styled(User)`
  background-color: #00395e;
  color: #ffffff;

  :hover {
    background-color: #00395e;
  }
`;

interface Props {
    placeholder?: string;
}

interface State {
    value: string;
    results: GithubUser[];
    selectedItemIndex: number;
    isSearching: boolean;
}

interface GithubUser {
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    login: string;
    html_url: string;
    followers_url: string;
    gists_url: string;
    following_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: number;
}

interface GithubUserSearchResult {
    incomplete_results: boolean;
    items: GithubUser[];
    total_count: number;
}

class GithubUsersAutocomplete extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        placeholder: 'type a github username'
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            isSearching: false,
            value: '', 
            selectedItemIndex: 0,
            results: [{
                "login": "andreamancuso",
                "id": 19411542,
                "node_id": "MDQ6VXNlcjE5NDExNTQy",
                "avatar_url": "https://avatars0.githubusercontent.com/u/19411542?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/andreamancuso",
                "html_url": "https://github.com/andreamancuso",
                "followers_url": "https://api.github.com/users/andreamancuso/followers",
                "following_url": "https://api.github.com/users/andreamancuso/following{/other_user}",
                "gists_url": "https://api.github.com/users/andreamancuso/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/andreamancuso/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/andreamancuso/subscriptions",
                "organizations_url": "https://api.github.com/users/andreamancuso/orgs",
                "repos_url": "https://api.github.com/users/andreamancuso/repos",
                "events_url": "https://api.github.com/users/andreamancuso/events{/privacy}",
                "received_events_url": "https://api.github.com/users/andreamancuso/received_events",
                "type": "User",
                "site_admin": false,
                "score": 54.50521
              }]
        };
    }

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value});
        this.searchUsers();
    };

    private navigateToUrl = (url: string) => {
        window.location.href = url;
    }

    private searchUsers = debounce(async () => {
        this.setState({isSearching: true});

        const qsParams = qs.stringify({q: this.state.value});
        const response = await fetch(`https://api.github.com/search/users?${qsParams}`);
        const result: GithubUserSearchResult = await response.json();

        this.setState({results: result.items.slice(0, 10), isSearching: false});
    }, 1000);

    render() {
        const { placeholder } = this.props;

        return (
            <OuterWrapper>
                <InputWrapper>
                    {!this.state.isSearching && <SearchIcon/> }
                    {this.state.isSearching && <SpinnerImpl/>}
                    <Input 
                        type="text" 
                        value={this.state.value}
                        onChange={this.handleOnChange}
                        placeholder={placeholder}
                    />
                </InputWrapper>
                {this.state.results.length > 0 && !this.state.isSearching && <ResultsWrapper>
                    <ResultsHeading>Github users</ResultsHeading>
                    {this.state.results.map((result, index) => {
                        const UserComp = index === this.state.selectedItemIndex ? SelectedUser : User
                        return (
                            <UserComp key={result.login} onClick={() => {this.navigateToUrl(result.html_url)}}>{result.login}</UserComp>
                        )
                    })}
                </ResultsWrapper>}
            </OuterWrapper>
        );
    }
}
export default GithubUsersAutocomplete;

