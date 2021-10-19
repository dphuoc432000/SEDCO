import React from "react";
// import logo from "../../assets/images/logo.png";
import {withRouter}from "react-router-dom";
// import Home from "../../pages/Home/Home"
import Map from './Map/Map.js'
import Status from './Status/Status.js'
// import './MainContent.css'
import '../../styles/main.css'
class Main extends React.Component {
    render() {
        return (
            
            <React.Fragment>
            {/*<main className="main">
                <Map/>
                <Status/>
            </main>*/}
                <Map/>
                <Status/>
            </React.Fragment>
        )
    }
}

export default withRouter(Main);
