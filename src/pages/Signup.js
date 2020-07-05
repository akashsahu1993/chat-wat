import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {signUp} from "../helpers/auth";

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        try {
            await signUp(this.state.email, this.state.password);
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to <Link to='/'>ChatWat</Link>
                    </h1>
                    <p>Fill in the form below to create an account.</p>
                    <div>
                        <input placeholder='Email' name='email' type='email' onChange={this.handleChange}
                               value={this.state.email}/>
                    </div>
                    <div>
                        <input placeholder='Password' name='password' type='password' onChange={this.handleChange}
                               value={this.state.password}/>
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type='submit'>Sign Up</button>
                    </div>
                    <hr/>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        )
    }
}