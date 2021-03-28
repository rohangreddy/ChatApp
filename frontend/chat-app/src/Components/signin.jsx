import React, { Component } from 'react'
import { auth } from '../services/firebase';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from "react-router-dom";


var rootStyle = {
    backgroundColor: '#363940',
    color : 'white',
    height: '100vh',
    minheight : '100vh'
}

var boxStyle = {
    backgroundColor: '#303136',
}

var fieldStyle = {
    backgroundColor: '#40454B',
    color: 'white'
}

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
            /*<section className="section">
                <div className="container has-text-centered">
                    Hello {this.props.user.displayName} {this.props.user.email}!
                    You are now signed in.
                    <button onClick={() => this.signOut()}>Sign out </button>
                </div>
            </section>*/
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

    render() {
        if (this.state.user) {
            return <SignedInComponent user={this.state.user}/>
        }
        return (
            <section className="section" style={rootStyle}>
                <div className="container has-text-centered">
                    <h1 className="title has-text-white">ChatApp</h1>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={auth()}/>
                </div>
            </section>
        )
    }
}



/*export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
          await signin(this.state.email, this.state.password);
        } catch (error) {
          this.setState({ error: error.message });
        }
    }
    
    render() {
        return (
            <div style={rootStyle}>
                <div class="title">
                    <div class="column is-4 has-text-white">
                        ChatApp
                    </div>
                </div>
                <div class="columns is-centered">
                    <form class="box" onSubmit={this.handleSubmit} style={boxStyle}>
                        <div class="title is-centered has-text-white">Welcome!</div>
                        <div class="field">
                            <label class="label" style={{ color: '#60636A'}}>Email</label>
                            <input class="input"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            ></input>
                        </div>
                        <div class="field">
                            <label class="label" style={{ color: '#60636A'}} >Password</label>
                            <input class="input"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            type="password"
                            />
                        </div>
                        <div style={{color: '#FFFFFF'}}>
                            {this.state.error ? (
                            <p>{this.state.error}</p>
                            ) : null}
                        </div>
                        <div>
                        <button class="button is-primary" type="submit" style={{backgroundColor: '#6979F8'}}>Login</button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}
*/
