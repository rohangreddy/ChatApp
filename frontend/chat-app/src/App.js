import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Landing from './Components/landing'
import MainPage from './Components/main'

class App extends Component {
    render() {
        return (
            <div>
                <Landing></Landing>
                <MainPage></MainPage>
            </div> 
        );
    }
}

export default App;
