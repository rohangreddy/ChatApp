import React, { Component } from 'react'
import {Link } from "react-router-dom";

var rootStyle = {
    backgroundColor: '#363940',
    color : 'white',
    height: '100vh',
    minheight : '100vh'
}

var boxStyle = {
    backgroundColor: '#303136',
    width: '500px'
}

var fieldStyle = {
    backgroundColor: '#40454B',
    color: 'white'
}


export default class Landing extends Component {
    render() {
        return (
            <div style={rootStyle}>
                <div class="title">
                    <div class="column is-4 has-text-white">
                        ChatApp
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <form class="box" style={boxStyle}>
                            <div class="column is-offset-one-third">
                                <div class="title has-text-white">Welcome!</div>
                            </div>
                            <div class="field">
                                <label class="label" style={{ color: '#60636A'}}>Email</label>
                                <div class="control">
                                    <input class="input" type="email" placeholder="e.g. alex@example.com has-text-white" style={fieldStyle}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" style={{ color: '#60636A'}} >Password</label>
                                <div class="control">
                                    <input class="input" type="password" placeholder="*******" style={fieldStyle}></input>
                                </div>
                            </div>
                                <Link to="/main"><button class="button" style={{backgroundColor: '#6979F8'}}>Login</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}