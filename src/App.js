import React from 'react';
import 'bulma';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Glove from './pages/algorithms/GloVe/glove';
import Word2Vec from './pages/algorithms/Word2Vec/word2vec';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>

                        <Route exact path="/glove">
                            <Glove/>
                        </Route>

                        <Route exact path="/word2vec">
                            <Word2Vec/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;