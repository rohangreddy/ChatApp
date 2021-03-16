import React, { Component } from 'react'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <div class="title">
                    <div class="column is-4">
                        ChatApp
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <form class="box">
                            <div class="column">
                                <div class="title">Welcome!</div>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="email" placeholder="e.g. alex@example.com"></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input class="input" type="password" placeholder="*******"></input>
                                </div>
                            </div>
                            <button class="button is-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}