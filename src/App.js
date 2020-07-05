import React, {Component} from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {auth} from "./services/firebase";
import './styles.css';

function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props}/>
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props}/>
                : <Redirect to='/chat'/>}
        />
    )
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            loading: true
        };
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false
                })
            }
        })
    }

    render() {
        return this.state.loading === true ? <h2>Loading...</h2> : (
            <Router>
                <Switch>
                    <Route exact path='/' Component={Home}/>
                    <PrivateRoute path='/chat' authenticated={this.state.authenticated} Component={Chat}/>
                    <PublicRoute path='/signup' authenticated={this.state.authenticated} Component={Signup}/>
                    <PublicRoute path='/login' authenticated={this.state.authenticated} Component={Login}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
