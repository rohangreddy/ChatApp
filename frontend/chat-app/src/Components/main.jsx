import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import { auth } from '../services/firebase'


var rootStyle = {
    backgroundColor: '#212226',
    color : 'white',
    height: '100vh'
}

export default class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: auth().currentUser
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({user})
            }
            else {
                this.setState({user: null})
            }

         });
    }

    signOut() {
        auth().signOut()
    }
    render() {
        if (this.state.user) {
            return (
                <div style={rootStyle}>
                    <div class="title has-text-white">
                            ChatApp
                    </div>
                    <div class="column" align="right">
                        <button class="button" style={{backgroundColor: '#40454B', color: '#FFFFFF'}} onClick={() => this.signOut()}>Sign Out</button>
                    </div>
                    <div class="columns">
                        <div class="column is-narrow" style={{ backgroundColor: '#303136', height: '85vh', width: '300px' }}>
                            <div class="field">
                                <button class="button is-fullwidth" style={{backgroundColor: '#40454B', color: '#FFFFFF'}}>Friends</button>
                                </div>
                            <div class="field">
                                <button class="button is-fullwidth" style={{backgroundColor: '#40454B', color: '#FFFFFF'}}>Messages</button>
                            </div>
                        </div>
                        <div class="column" style={{backgroundColor: '#363940', height: '100vh'}}>
                                <h1>Welcome {this.state.user.displayName}, {this.state.user.email}!</h1>
                        </div>
                    </div>
                </div>
            ); 
        }
        return (
            <Redirect to="/signin" />
        );    
    }
}



