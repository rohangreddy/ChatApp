import React, { Component } from 'react'

var rootStyle = {
    backgroundColor: '#363940',
    color : 'white',
    height: '100vh',
    minheight : '100vh'
}

export default class MainPage extends Component {
    render() {
        return (
            <div style={rootStyle}>
                <div class="title">
                    <div class="column is-4 has-text-white">
                        ChatApp
                    </div>
                </div>
            </div>

        );
    }
}