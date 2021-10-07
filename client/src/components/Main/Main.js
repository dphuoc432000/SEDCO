import React from "react";
import logo from "../../assets/images/logo.png";
import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import Auth from '../../pages/Auth/Auth';
import Home from "../../pages/Home/Home"

export default class Main extends React.Component {
    render() {
        return (
            <main className="main">
                <Auth/>
                {    /*<Switch>
                                <Route path="/" exact>
                                    <Home/>
                                </Route>
                                <Route path="/login">
                                    <Auth/>
                                </Route>
                </Switch>*/}
            </main>
            
        )
    }
}
