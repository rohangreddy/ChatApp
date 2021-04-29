import React, { Component } from 'react'
import {Link } from "react-router-dom";

var boxStyle = {
    backgroundColor: '#303136',
    color: 'white',
    width: '500px'
}

export default class Landing extends Component {
    render() {
        return (
            <div>
                <div class="column has-text-right">
                    <div class="title">
                        <Link to="/signin">
                            Login
                        </Link>
                    </div>
                </div>
                <section className="section">
                    <div className="container has-text-centered" style={boxStyle}>
                        <h1 className="title has-text-white">ChatApp</h1>
                        <p>A simple messaging app.</p>
                    </div>
                </section>
            </div>
        )
    }
}