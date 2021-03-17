import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './Components/landing'
import MainPage from './Components/main'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path ="/" component={Landing} />
                    <Route path="/main" component={MainPage} />
                </Switch>
            </BrowserRouter> 
        );
    }
}

export default App;
