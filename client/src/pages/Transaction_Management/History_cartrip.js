import React, { Component } from 'react';
import './History.css'
import See_detail_history_cartrip from './See_detail_history_cartrip';
import { connect } from 'react-redux';
import { get_list_history_cartrip } from '../../stores/actions/car_trip.action'
import lodash from 'lodash';
import _ from 'lodash';
class History_cartrip extends Component {
    state = {
        see_detail_history: false,
        list_history_of_cartrip: [],
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
    handleShowDetailHistory = () => {
        this.setState({
            see_detail_history: !this.state.see_detail_history,
        })
    }
    render() {
        let { see_detail_history, list_history_of_cartrip } = this.state;
        console.log(' state ', list_history_of_cartrip);

        // let arr_history_sender = list_history_of_cartrip.length > 0 && list_history_of_cartrip.filter( item => item.status_type === 'SENDER')
        // console.log(arr_history_sender);
        let arr_his_sender = _.filter(list_history_of_cartrip , function(item){
            return item.status_type === 'SENDER';
        }) 
        console.log(arr_his_sender);
        const checkSeeDetailHistory = see_detail_history === true ?
            <See_detail_history_cartrip
                handleShowDetailHistory={this.handleShowDetailHistory}
            />
            : "";
        return (
            <div className="History_block--left">

                <div className="QLGD-History">
                    <h3> </h3>

                    
                    

                    {/* // <ul className="QLGD-History__List">
                            //     <li onClick={() => {this.handleShowDetailHistory()}} className="QLGD-History__Item" >
                            //         <div style={{display: 'flex'}}>
                            //             Đã xác nhận nhận nhu yếu phẩm của
                            //             <h3 style={{fontWeight: '500'}}>{history_name_sender}</h3>
                            //         </div>
                            //         <div style={{marginLeft: '40px'}}>
                            //             <h3>Đã xác nhận</h3>
                            //         </div>
                                    
                            //     </li>
                            // </ul> */}

                

                
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