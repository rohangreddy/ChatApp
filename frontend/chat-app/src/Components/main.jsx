import firebase from 'firebase';
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { auth } from '../services/firebase'


var rootStyle = {
    backgroundColor: '#212226',
    color : 'white',
    height: '100vh',
    margin: '0'
}

class Chats extends React.Component {
    state = {
            chats: null
        }

    async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        const response = await fetch('http://localhost:4000/dev/chats', {
            headers: {
                'Authorization': idToken
            }
        })
        if (response.status === 401) {
            return console.log('unauthorized')
        }
        const chats = await response.json()
        this.setState({chats: chats})
    }

    render() {
        return (
            <div>
                <div className="title has-text-white has-text-centered">My Chats </div>
                <ul>
                    {
                        this.state.chats && this.state.chats.map(chat => {
                            return (
                                <li>
                                    <div class="card column is-narrow is-half is-offset-one-quarter" style={{ backgroundColor: '#303136' }}>
                                        <header class="card-header">
                                            <p class="card-header-title has-text-white has-text-centered">
                                                {chat.room_name}
                                            </p>
                                        </header>
                                        <div class="card-content">
                                            <div class="content has-text-white">
                                                Members: {chat.member_ids}
                                            </div>
                                            <div class="content has-text-white">
                                                Number of Messages: {chat.num_msgs}
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="column"></div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: auth().currentUser,
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

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        if (this.state.user) {
            return (
                <div style={rootStyle}>
                    <div class="column" align="right">
                        <button class="button" style={{backgroundColor: '#40454B', color: '#FFFFFF'}} onClick={() => this.signOut()}>Sign Out</button>
                    </div>
                    <div class="columns">
                        <div class="column" style={{backgroundColor: '#363940', height: '100vh'}}>
                                <h1>Welcome {this.state.user.displayName}, {this.state.user.email}!</h1>
                                <Chats/>
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



