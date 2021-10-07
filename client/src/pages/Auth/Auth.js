import React from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import "./Auth.css";

class Auth extends React.Component{

    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/login">
                        <main>
                            <Login/>
                        </main>
                    </Route>
                    <Route path="/register">
                        <main>
                            <Register/>
                        </main>
                    </Route>
                </Switch>
            </Router>
        );
    }

}

export default Auth;