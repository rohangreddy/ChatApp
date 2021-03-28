import React, { Component } from 'react'
import {Link } from "react-router-dom";



var rootStyle = {
    backgroundColor: '#363940',
    height: '100vh'
}

var boxStyle = {
    backgroundColor: '#303136',
    color: 'white',
    width: '200px'
}

export default class Landing extends Component {
    render() {
        return (
            <div style={rootStyle}>
                <div class="columns" style={{backgroundColor: '#303136'}}>
                    <div class="column has-text-white">
                        ChatApp
                    </div>
                    <div class="column has-text-right">
                        <div class="title">
                            <Link to="/signin">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column is-narrow" style={boxStyle}>
                        A simple messaging app.
                    </div>
                </div>
            </div>
        )
    }
}