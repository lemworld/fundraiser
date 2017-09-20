import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Loadable from 'react-loadable';
import WebFont from 'webfontloader';

// Our Routed Pages
import Loading from "./routes/Loading";

const AsyncHome = Loadable({
    loader: () => import("./routes/Home"),
    loading: Loading,
    delay: 200,
    timeout: 10000
});

const AsyncDonate = Loadable({
    loader: () => import("./routes/Donate"),
    loading: Loading,
    delay: 200,
    timeout: 10000
});


class App extends Component {
    constructor(props) {
        super(props);
        WebFont.load({
            google: {
                families: ['Lato:400,400i,700,700i', 'sans-serif']
            }
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={AsyncHome} />
                    <Route path="/donate" component={AsyncDonate} />
                </div>
            </Router>
        );
    }
}

export default App;
