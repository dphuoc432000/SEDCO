import React from "react";
// import logo from "../../assets/images/logo.png";
// import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
// import Home from "../../pages/Home/Home"
import Map from './Map/Map.js'
import Status from './Status/Status.js'
import './MainContent.css'
export default class Main extends React.Component {
    render() {
        return (
            <main className="main">
                <Map/>
                <Status/>
            </main>
            
        )
    }
}
