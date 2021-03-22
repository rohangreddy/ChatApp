import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './Components/landing'
import MainPage from './Components/main'

var firebaseConfig = {
    apiKey: "AIzaSyDvQQjZjggLRGGXYhKccshhR8-GD8bheEY",
    authDomain: "chatapp-96c03.firebaseapp.com",
    projectId: "chatapp-96c03",
    storageBucket: "chatapp-96c03.appspot.com",
    messagingSenderId: "763312119498",
    appId: "1:763312119498:web:a1d1f020e1406e10e7de33"
  };

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
