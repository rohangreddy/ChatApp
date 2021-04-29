import firebase from 'firebase';
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { auth } from '../services/firebase'

let backendURL = 'https://ogm125joca.execute-api.us-east-1.amazonaws.com/dev'
/*if (window.location.href.includes('localhost')) {
    backendURL = 'http://localhost:4000/dev'
}*/

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
                <div class="title is-5 has-text-white">My Chatrooms </div>
                <ul>
                    {
                        this.state.chatrooms && this.state.chatrooms.map(chatroom => {
                            return (
                                <li>
                                    <div class="card column has-text-white" style={{ backgroundColor: '#2a2b2f'}}>
                                            <p>
                                                {chatroom.chatId}
                                            </p>
                                            <p>
                                                Members: {chatroom.info.map(member => {
                                                    return(
                                                        member+" "
                                                    )
                                                })}
                                            </p>
                                    </div>
                                    <div class="column"></div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div class="card column is-narrow" style={{ backgroundColor: '#2a2b2f' }}>
                    <div class="title has-text-white has-text-centered">Create a Chatroom</div>
                    <div class="column" align="center">
                        <div class="label has-text-white">Room Name</div>
                        <input class="input" type ="text" onChange={(event) => this.onNewChatroomNameUpdated(event)}></input>
                    </div>
                    <div class="column" align="center">
                        <div class="label has-text-white">Members</div>
                        {
                            this.state.members.map((member, index) => {
                                return (
                                    <div key={index}>
                                        <input class="input" onChange={(event) => this.handleChange(event, index)} type="text" value={member} />
                                        <button onClick={(event) => this.handleRemove(index)}>X</button>
                                    </div>  
                                )
                            })
                        }
                        <button class="button" style={{backgroundColor: '#40454B', color: '#FFFFFF'}} onClick={(event) => this.addMember(event)}>Add Member</button>
                    </div>
                    <div class="column" align="center">
                        <button class="button" style={{backgroundColor: '#40454B', color: '#FFFFFF'}} onClick={() => this.createNewChatroom()}>Create</button>
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
                <div style={{backgroundColor: '#212226'}}>
                    <div class="columns">
                        <div class="column">
                            <div class="title has-text-white">ChatApp</div>
                        </div>
                        <div class="column" align="right">
                            <button class="button mt-1" style={{backgroundColor: '#40454B', color: '#FFFFFF'}} onClick={() => this.signOut()}>Sign Out</button>
                        </div>
                    </div>
                    <div class="columns" style={{height: '92vh'}}>
                        <div class="column is-one-fifth" style={{backgroundColor: '#303136', overflow: "auto"}}>
                            <Chats/>
                        </div>
                        <div class="column" style={{backgroundColor: '#363940'}}></div>
                    </div>
                    <div class="columns">
                        <div class="column is-one-fifth has-text-white" style={{backgroundColor: '#212226'}}>
                            Welcome {this.state.user.displayName}, {this.state.user.email}!
                        </div>
                        <div class="column" style={{backgroundColor: '#363940'}}>
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



