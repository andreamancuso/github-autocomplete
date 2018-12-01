import * as React from 'react';
import { ThemeProvider, ThemeInterface } from './styled-components';

import GithubUsersAutocomplete from './components/GithubUsersAutocomplete';

import './index.css';

// todo: inject from elsewhere
const theme: ThemeInterface = {
    fontFamily: 'sans-serif',
    textColor: '#333333',
    invertedTextColor: '#ffffff',
    primaryColor: '#004877',
    borderColor: '#d0d0d0',
    boxShadowColor: '#000000',
    wrapperColor: '#f3f3f3',
    selectedItemColor: '#00395e',
    standardBorderRadius: '4px',
    inputHeight: '40px'
}


export const App = () => (
    <div id="app">
        <ThemeProvider theme={theme}>
            <div className="width-50 mx-auto pt-10">
                <GithubUsersAutocomplete />
            </div>
        </ThemeProvider>
    </div>);

export default App;

