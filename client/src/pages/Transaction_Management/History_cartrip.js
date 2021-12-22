import React, { Component } from 'react';
import './History.css'
import See_detail_history_cartrip from './See_detail_history_cartrip';
import { connect } from 'react-redux';
import { get_list_history_cartrip } from '../../stores/actions/car_trip.action'
import lodash from 'lodash';
import _ from 'lodash';
import Sender_Register from './Sender_Register/Sender_Register';
import History_cartrip_item from './History_cartrip_item';
class History_cartrip extends Component {
    state = {
        see_detail_history: false,
        list_history_of_cartrip: [],
        essentials_transaction: [],
        history: {},
        infor: {},
        filter : ''
    }
    componentDidMount = async () => {

        const status_current = this.props.car_status;
        // console.log('status_current',status_current);
        await this.props.get_list_history_cartrip(status_current.detail._id);
        console.log(this.props.carTripReducer.list_people_cartrip_registed);

        this.setState({

            list_history_of_cartrip: this.props.carTripReducer.list_history_of_cartrip,
        })
    };
    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.status_current !== prevProps.status_current) {
            console.log('vao')
            const status_current = this.props.car_status;
            console.log("~ status_current", status_current)


            await this.props.get_list_history_cartrip(status_current.detail._id);
            this.setState({

                list_history_of_cartrip: this.props.carTripReducer.list_history_of_cartrip,


            })
        }
    }
    handleShowDetailHistory = (essentials_transaction, infor) => {

        this.setState({
            see_detail_history: !this.state.see_detail_history,
            essentials_transaction: essentials_transaction,
            infor: infor
        })
    }
    handleFilter =async (event, arr ) => {
        const value = event.target.value;
        const status_current = this.props.car_status;
        await this.props.get_list_history_cartrip(status_current.detail._id);
        const {list_history_of_cartrip} = this.props.carTripReducer
        let arr_his = list_history_of_cartrip && list_history_of_cartrip.filter((item) => item && item);
        switch (value){
            case 'true':
                // console.log('status_current',status_current);
                arr_his = arr_his.filter(history => { 
                    return (
                            history.history.sender_confirm === true 
                            || history.history.receiver_confirm === true );
                })
                break;
            case 'false':
                arr_his = arr_his.filter(history => { 
                    return (
                            history.history.sender_confirm === false 
                            || history.history.receiver_confirm === false );
                })
                break;
            default:
                // console.log('status_current',status_current);
                break;
            
        }
        this.setState({
            filter : value ,
            list_history_of_cartrip: arr_his,
        })
    }
    render() {
        let { see_detail_history, list_history_of_cartrip } = this.state;
        // console.log(' state ', list_history_of_cartrip);

        let arr_his = list_history_of_cartrip && list_history_of_cartrip.filter((item) => item && item);
        // console.log("~ arr_his", arr_his)
        const checkSeeDetailHistory = see_detail_history === true ?
            <See_detail_history_cartrip
                handleShowDetailHistory={this.handleShowDetailHistory}
                essentials={this.state.essentials_transaction}
                infor={this.state.infor}
            />
            : "";
    
        return (
            <div className="History_block--left">
                <div className="QLGD-History">
                    <select value={this.state.filter} onChange={(event) => {this.handleFilter(event, arr_his)}} name="" id="" className="filter__history">
                        <option value="">Tất cả</option>
                        <option value="true">Đã xác nhận</option>
                        <option value="false">Chưa xác nhận</option>
                    </select>
                    <ul className="QLGD-History__List" >
                        {arr_his.length > 0 && arr_his.map(history => {
                            return (<History_cartrip_item
                                history={history}
                                handleShowDetailHistory={this.handleShowDetailHistory}
                            />)
                        })}
                    </ul>
                </div>
                {checkSeeDetailHistory}
            </div>


        );
    }
}
const mapStateToProps = (state) => {
    return {
        // essentialsReducer: state.essentialsReducer,
        carTripReducer: state.carTripReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {

        get_list_history_cartrip: async (car_status_id) => {
            const action = await get_list_history_cartrip(car_status_id);
            return dispatch(action);

        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(History_cartrip);