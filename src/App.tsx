import * as React from 'react';

import './index.css';
import GithubUsersAutocomplete from './GithubUsersAutocomplete';

export const App = () => (
    <div id="app">
        <div className="width-50 mx-auto pt-10">
            <GithubUsersAutocomplete />
        </div>
    </div>);

export default App;

