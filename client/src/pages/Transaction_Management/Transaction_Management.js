import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';
import "../../styles/main.css";
import Nav  from './Nav/Nav';
import Sender_Register from './Sender_Register/Sender_Register';
import Receiver_register from './Receiver_register/Receiver_register';
import './Transaction_Management.css'
import {get_sender_status_list_no_complete, get_receiver_status_list_no_complete} from '../../stores/actions/car_regis_status'
class Transaction_Management extends PureComponent {
    state ={
        car_status: this.props.status_current,
        sender_status_car_regis_list:[],
        receiver_status_car_regis_list:[],
        status_list: [],
    }

    componentDidMount = async() =>{
        const car_status_id = this.props.status_current.detail._id;
        await this.props.get_sender_status_list_no_complete(car_status_id);
        await this.props.get_receiver_status_list_no_complete(car_status_id);
        this.setState({
            sender_status_car_regis_list: this.props.carRegisStatusReducer.sender_status_car_regis_list,
            receiver_status_car_regis_list: this.props.carRegisStatusReducer.receiver_status_car_regis_list,
            status_list: this.props.carRegisStatusReducer.sender_status_car_regis_list
        });
    }

    handleChangeState = (state_type) =>{
        switch(state_type){
            case 'sender_register':
                this.setState({
                    status_list: this.props.carRegisStatusReducer.sender_status_car_regis_list
                });
                break;
            case 'receiver_register':
                this.setState({
                    status_list: this.props.carRegisStatusReducer.receiver_status_car_regis_list
                });
                break;
            // case 'history':
            default: 
                break;
        }
    }

    render() {
        // console.log(this.state.status_list)
        return (
            <main className="Main">
                <div className="status_content_container">
                    <div className="nav_container">
                        <Nav handleChangeState= {this.handleChangeState}/>
                    </div>
                    <div className="status_content">
                        <Switch>
                            <Route exact path={'/car_trip/transaction_management'}>
                                <Sender_Register
                                    status_list={this.state.status_list}
                                    handleInfomationStatusItem = {this.handleInfomationStatusItem}
                                    // sender_status_information = {this.state.sender_status_information}
                                />
                            </Route>
                            <Route exact path={`/car_trip/transaction_management/receiver/register`}>
                                <Receiver_register  
                                    status_list={this.state.status_list}
                                    handleInfomationStatusItem = {this.handleInfomationStatusItem} 
                                />
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
        carRegisStatusReducer: state.carRegisStatusReducer,
    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        get_sender_status_list_no_complete: async(car_status_id)=>{
            const action = await get_sender_status_list_no_complete(car_status_id);
            return dispatch(action);
        },

        get_receiver_status_list_no_complete: async(car_status_id) =>{
            const action = await get_receiver_status_list_no_complete(car_status_id);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transaction_Management))