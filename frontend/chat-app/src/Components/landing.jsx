import React, { Component } from 'react'
import { Link } from "react-router-dom";

var boxStyle = {
    backgroundColor: '#303136',
    color: 'white',
}

export default class Landing extends Component {
    render() {
        return (
            <div>
                <section class="section">
                    <div class="card column is-4 is-offset-4" align="center" style={boxStyle}>
                        <div class="title has-text-white">ChatApp</div>
                        <div class="title has-text-white is-5">A simple messaging app.</div>
                        <div class="title" align="center">
                            <Link to="/signin">
                                Login
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}