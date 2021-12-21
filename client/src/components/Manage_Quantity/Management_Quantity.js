import React, { Component } from "react";
import "./Management_Quantity.css";
import {connect} from 'react-redux'
import getEssentials from "../../stores/actions/essentials.action";
import {confirm_driver_censorship_action, get_number_of_people_cartrip_registed} from '../../stores/actions/car_trip.action'

class Management_Quantity extends Component {
    state = {
        essentials : [],
        list_people_cartrip_registed : {},
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
        const status_current = this.props.status_current;
        await this.props.get_number_of_people_cartrip_registed(status_current.detail._id);
        console.log(this.props.carTripReducer.list_people_cartrip_registed);
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_car = this.props.status_current.detail.essentials;
        
        const essentials_map = essentials_car.map((essential) =>{
            const object = {};
            essentialsReducer.find(item => {
                if(item._id === essential.essential_id ){
                    object.quantity = essential.quantity;
                    object.essential_id = essential.essential_id;
                    object.name = item.name;
                    object.unit = item.unit;
                }
                return item._id === essential.essential_id;
                
            })
            return object;
        })
        this.setState({
            essentials: essentials_map ,
            list_people_cartrip_registed : this.props.carTripReducer.list_people_cartrip_registed,
        })
    };
    componentDidUpdate = async (prevProps,prevState) => {
        if (this.props.status_current !== prevProps.status_current) {
            console.log('vao')
            const status_current = this.props.status_current;
            console.log(status_current);
          
            await this.props.get_number_of_people_cartrip_registed(status_current.detail._id);
            this.setState({
                
                list_people_cartrip_registed : this.props.carTripReducer.list_people_cartrip_registed,
                

            })
        }
    }
    render() {
        const {essentials , list_people_cartrip_registed } = this.state ;
        console.log('check',this.state.list_people_cartrip_registed);
        return (
            <div id="management_Quantity_wrapped">
                <h2 style={{
                    marginBottom: '15px',
                    fontWeight: '400',
                    fontSize: '16px',
                }}>
                    Quản lý số lượng</h2>

                <table id="manage_quantity">
                    <tr>
                        <td>Nhu yếu</td>
                        <td>Số lượng còn lại</td>
                        <td>Đơn vị</td>
                        
                    </tr>
                    {essentials && essentials.map( (essential) => {
                        return (

                            <tr key={essential.essential_id}>
                                <td>{essential.name}</td>
                                <td>{essential.quantity}</td>
                                <td>{essential.unit}</td>
                            </tr>
                        )
                    })
                       
                    }
                
                </table>
                <div style={{ display: "flex", marginTop: "15px", marginLeft: '12px' }}>
                    <h3 style={{ marginRight: '36px', fontWeight: '600' }}>Số người đăng ký nhận</h3>
                    <h3 style={{ fontWeight: '600' }}>{this.state.list_people_cartrip_registed.number_of_sender_regis}</h3>
                </div>
                <div style={{ display: "flex", marginTop: "17px", marginLeft: '12px' }}>
                    <h3 style={{ marginRight: '28px', fontWeight: '600' }}>Số người đăng ký hỗ trợ</h3>
                    <h3 style={{ fontWeight: '600' }}>{this.state.list_people_cartrip_registed.number_of_receiver_regis}</h3>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        essentialsReducer : state.essentialsReducer,
        carTripReducer: state.carTripReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials: async () => {
            const action = await getEssentials();
            return dispatch(action);
        },
        get_number_of_people_cartrip_registed: async (car_status_id) => {
            const action = await get_number_of_people_cartrip_registed(car_status_id);
            return dispatch(action);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Management_Quantity);
