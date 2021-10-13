import React from "react";
// import logo from "../../assets/images/logo.png";
// import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
// import Home from "../../pages/Home/Home"
import Map from './Map/Map';
import Status from './Status/Status';
import {Switch,Route, withRouter} from 'react-router-dom'
import SenderForm from "../CreateStatusForm/SenderForm";
import CarTripForm from "../CreateStatusForm/CarTripForm";
import ReceiverForm from "../CreateStatusForm/ReceiverForm";


class Main extends React.Component {

    state = {
        show_form_create: ''
    }
    showForm = (type_form) =>{
        console.log(type_form)
        this.setState({
            show_form_create: type_form
        })
    }
    
    render() {
        const type_form = this.state.show_form_create;
        return (
            <main className="main">
                <Map/>
                <Status showForm={this.showForm}/>
                {type_form === 'btn_car_trip'?
                    <CarTripForm/>
                    :
                    type_form === "btn_support"?
                    <SenderForm/>
                    :
                    <ReceiverForm/>
                    
                }
            </main>
        )
    }
}

export default withRouter(Main);
