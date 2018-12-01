import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./App";

declare let module: any;

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
