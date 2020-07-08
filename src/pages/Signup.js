import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {signInWithGitHub, signInWithGoogle, signUp} from "../helpers/auth";

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
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
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

    async googleSignIn() {
        try {
            await signInWithGoogle()
        } catch (error) {
            this.setState({error: error.message})
        }
    }

    async githubSignIn() {
        try {
            await signInWithGitHub()
        } catch (error) {
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div className="container">
                <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to
                        <Link className="title ml-2" to='/'>
                            ChatWat
                        </Link>
                    </h1>
                    <p className="lead">Fill in the form below to create an account.</p>
                    <div className="form-group">
                        <input className="form-control" placeholder='Email' name='email' type='email'
                               onChange={this.handleChange}
                               value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder='Password' name='password' type='password'
                               onChange={this.handleChange}
                               value={this.state.password}/>
                    </div>
                    <div className="form-group">
                        {this.state.error ? (
                            <p className="text-danger">{this.state.error}</p>
                        ) : null}
                        <button className="btn btn-primary px-5" type="submit">Sign Up</button>
                    </div>
                    <p>Or</p>
                    <button className="btn btn-danger mr-2" onClick={this.googleSignIn} type='button'>
                        Sign Up with Google
                    </button>
                    <button className="btn btn-secondary" type='button' onClick={this.githubSignIn}>
                        Sign Up with GitHub
                    </button>
                    <hr/>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        )
    }
}