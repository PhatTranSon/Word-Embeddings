import React from 'react';
import 'bulma';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;