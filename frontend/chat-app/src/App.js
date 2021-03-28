import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Landing from './Components/landing'
import SignIn from './Components/signin'
import MainPage from './Components/main'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path ="/" component={Landing}></Route>
                    <Route path="/main" component={MainPage}></Route>
                    <Route path="/signin" component={SignIn}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
