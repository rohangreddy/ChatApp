import firebase from 'firebase';
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { auth } from '../services/firebase'

let backendURL = 'https://ogm125joca.execute-api.us-east-1.amazonaws.com/dev'
if (window.location.href.includes('localhost:4000')) {
    backendURL = 'http://localhost:4000/dev'
}


var rootStyle = {
    backgroundColor: '#212226',
    color : 'white',
    height: '100vh',
    margin: '0'
}

class Chats extends React.Component {
    state = {
            chatrooms: [],
            newChatroomName: null,
            members: []
        }
    
    async fetchChatrooms() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        const response = await fetch(backendURL + '/chats', {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
        })
        const chats = await response.json()
        this.setState({chatrooms: chats})
    }

    addMember() {
        this.setState({members: [...this.state.members, ""]})
    }

    handleChange(event, index) {
        this.state.members[index] = event.target.value
        this.setState({members: this.state.members})
    }

    handleRemove(index) {
        this.state.members.splice(index,1)
        this.setState({members: this.state.members})
        
    }

    componentDidMount() {
        this.fetchChatrooms()
    }

    onNewChatroomNameUpdated(event) {
        this.setState({newChatroomName: event.target.value})
    }

    onNewMemberNameUpdated(event) {
        this.setState({members: event.target.value})
    }

    async createNewChatroom() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        const response = await fetch(backendURL + '/chats', {
            method: 'POST',
            headers: {
                'Authorization': idToken
            },
            body: JSON.stringify({
                chatId: this.state.newChatroomName,
                info: this.state.members
            })
        })
        this.fetchChatrooms()
    }

    render() {
        return (
            <div>
                <div className="title has-text-white has-text-centered">My Chatrooms </div>
                <ul>
                    {
                        this.state.chatrooms && this.state.chatrooms.map(chatroom => {
                            return (
                                <li>
                                    <div class="card column is-narrow is-half is-offset-one-quarter" style={{ backgroundColor: '#303136' }}>
                                        <header class="card-header">
                                            <p class="card-header-title has-text-white has-text-centered">
                                                {chatroom.chatId}
                                            </p>
                                        </header>
                                        <div class="card-content">
                                            <div class="content has-text-white">
                                                Members: {chatroom.info.map(member => {
                                                    return(
                                                        member+" "
                                                    )
                                                })}
                                            </div>
                                            <div class="content has-text-white">
                                                Number of Messages: 
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="column"></div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <div class="title has-text-white has-text-centered">Create a Chatroom</div>
                    <div class="column" align="center">
                        <input type ="text" onChange={(event) => this.onNewChatroomNameUpdated(event)}></input>
                    </div>
                    <div class="column" align="center">
                        <div class="label has-text-white">Members</div>
                        {
                            this.state.members.map((member, index) => {
                                return (
                                    <div key={index}>
                                        <input onChange={(event) => this.handleChange(event, index)} type="text" value={member} />
                                        <button onClick={(event) => this.handleRemove(index)}>X</button>
                                    </div>

                                    
                                )
                            })
                        }
                        <button onClick={(event) => this.addMember(event)}>Add Member</button>
                    </div>
                    <div class="column" align="center">
                        <button onClick={() => this.createNewChatroom()}>Create</button>
                    </div>
                    
                </div>
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

    makeRoom() {
        <Redirect to="/create"/>
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
                                <div class="column"></div>
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



