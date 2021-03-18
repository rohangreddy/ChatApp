import React, { Component } from 'react'

var rootStyle = {
    backgroundColor: '#212226',
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
                <div class="columns">
                    <div class="column is-narrow" style={{ backgroundColor: '#303136', height: '85vh', width: '300px' }}>
                        <div class="field">
                            <button class="button is-fullwidth" style={{backgroundColor: '#6979F8'}}>Friends</button>
                            </div>
                        <div class="field">
                            <button class="button is-fullwidth" style={{backgroundColor: '#6979F8'}}>Messages</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}



