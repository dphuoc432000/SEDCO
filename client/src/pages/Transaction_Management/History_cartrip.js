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
        history : {},
        infor : {}
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
    handleShowDetailHistory = (essentials_transaction , infor ) => {
        
        this.setState({
            see_detail_history: !this.state.see_detail_history,
            essentials_transaction : essentials_transaction ,
            infor : infor
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
                    <ul className="QLGD-History__List" >
                        {arr_his.length > 0 && arr_his.map( history  => {
                            return(<History_cartrip_item
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