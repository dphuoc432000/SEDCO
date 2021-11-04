import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';
import "../../styles/main.css";
import Nav  from './Nav/Nav';
import Sender_Register from './Sender_Register/Sender_Register';
import Receiver_register from './Receiver_register/Receiver_register';
import './Transaction_Management.css'

class Transaction_Management extends PureComponent {
    state ={
        car_status:{},
        sender_status_regist_list:[],
        sender_status_information:{
            user:{},
            status:{}
        }
    }

    componentDidMount = async() =>{
        
    }

    render() {
        console.log(this.props.account_id)
        return (
            <main className="Main">
                <div className="status_content_container">
                    <div className="nav_container">
                        <Nav/>
                    </div>
                    <div className="status_content">
                        <Switch>
                            <Route exact path={'/car_trip/transaction_management'}>
                                <Sender_Register/>
                            </Route>
                            <Route exact path={`/car_trip/transaction_management/receiver/register`}>
                                <Receiver_register/>
                            </Route>
                        </Switch>
                    </div>    
                </div>
            </main>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {

    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transaction_Management))