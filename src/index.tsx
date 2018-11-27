// declare var API_URL: string;
// declare var MOCKS_URL: string;
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./App";

declare var NODE_ENV: string;
declare let module: any;

if (NODE_ENV === 'development') {
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

if (module.hot) {
    // Enable Webpack hot module replacement for the main App component
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        ReactDOM.render(
            <NextApp />,
            document.getElementById('root')
        );
    });
}
