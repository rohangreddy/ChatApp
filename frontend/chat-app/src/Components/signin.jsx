import React, { Component } from 'react'
import { auth } from '../services/firebase';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect, Link } from "react-router-dom";

const uiConfig = {
    signInFlow: 'popup',
    //signInSuccessUrl: '/main',
    signInOptions :[
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: false,
};

class SignedInComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }
    }

    signOut() {
        auth().signOut()
    }

    render() {
        return (
            <Redirect to="/main" />
        )
    }
}

export default class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user})
            } else {
                this.setState({ user: null });
            }
        });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        if (this.state.user) {
            return <SignedInComponent user={this.state.user}/>
        }
        return (
            <section class="section">
                <div class="container has-text-centered">
                    <div class="title has-text-white">ChatApp</div>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={auth()}/>
                    <div class="column"></div>
                        <div class="title is-4">
                            <Link to="/">
                                Home
                            </Link>
                        </div>
                </div>
            </section>
        )
    }
}