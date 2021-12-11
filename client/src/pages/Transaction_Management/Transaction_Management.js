import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';
import "../../styles/main.css";
import Nav  from './Nav/Nav';
import Sender_Register from './Sender_Register/Sender_Register';
import Receiver_register from './Receiver_register/Receiver_register';
import './Transaction_Management.css';
import {get_sender_status_list_no_complete, get_receiver_status_list_no_complete} from '../../stores/actions/car_regis_status';
import {
    REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_SENDER_LIST,
    REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_RECEIVER_LIST
} from '../../constants/actions';
import History_cartrip from './History_cartrip'
class Transaction_Management extends Component {
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

    handleRemoveStatusAfterCorfirmOrCancle_sender_list = (sender_status) =>{
        this.props.remove_status_after_corfirm_or_cancle_sender_list(sender_status._id); //sender_status._id: status_id
        const carRegisStatusReducer = this.props.carRegisStatusReducer;
        // console.log(carRegisStatusReducer)
        this.setState({
            sender_status_car_regis_list: carRegisStatusReducer.sender_status_car_regis_list,
            status_list: carRegisStatusReducer.sender_status_car_regis_list
        })
    }

    handleRemoveStatusAfterCorfirmOrCancle_receiver_list = (receiver_status) =>{
        this.props.remove_status_after_corfirm_or_cancle_receiver_list(receiver_status._id); //sender_status._id: status_id
        const carRegisStatusReducer = this.props.carRegisStatusReducer;
        // console.log(carRegisStatusReducer)
        this.setState({
            receiver_status_car_regis_list: carRegisStatusReducer.receiver_status_car_regis_list,
            status_list: carRegisStatusReducer.receiver_status_car_regis_list
        })
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
                                    account_id={this.props.account_id}
                                    car_status={this.state.car_status}
                                    status_list={this.state.status_list}
                                    handleInfomationStatusItem = {this.handleInfomationStatusItem}
                                    // sender_status_information = {this.state.sender_status_information}
                                    handleRemoveStatusAfterCorfirmOrCancle_sender_list = {this.handleRemoveStatusAfterCorfirmOrCancle_sender_list}
                                    handleChangeQuantityCarAfterConfirm= {this.props.handleChangeQuantityCarAfterConfirm}
                                    handleShowMessageWhenClickConversation= {this.props.handleShowMessageWhenClickConversation}
                                />
                            </Route>
                            <Route exact path={`/car_trip/transaction_management/receiver/register`}>
                                <Receiver_register  
                                    account_id={this.props.account_id}
                                    car_status={this.state.car_status}
                                    status_list={this.state.status_list}
                                    handleInfomationStatusItem = {this.handleInfomationStatusItem} 
                                    handleRemoveStatusAfterCorfirmOrCancle_receiver_list = {this.handleRemoveStatusAfterCorfirmOrCancle_receiver_list}
                                    handleChangeQuantityCarAfterConfirm= {this.props.handleChangeQuantityCarAfterConfirm}
                                    handleShowMessageWhenClickConversation= {this.props.handleShowMessageWhenClickConversation}
                                />
                            </Route>
                            <Route exact path={`/car_trip/transaction_management/history`}>
                                <History_cartrip
                                    
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
        },
        remove_status_after_corfirm_or_cancle_sender_list: (sender_status_id) =>{
            return dispatch({type: REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_SENDER_LIST, payload: sender_status_id})
        },
        remove_status_after_corfirm_or_cancle_receiver_list: (receiver_status_id) =>{
            return dispatch({type: REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_RECEIVER_LIST, payload: receiver_status_id})
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transaction_Management))