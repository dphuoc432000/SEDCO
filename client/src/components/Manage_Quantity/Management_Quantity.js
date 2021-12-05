import React, { Component } from "react";
import "./Management_Quantity.css";
import {connect} from 'react-redux'
import getEssentials from "../../stores/actions/essentials.action";

class Management_Quantity extends Component {
    state = {
        essentials : [],
    }
    componentDidMount = async () => {
        await this.props.getEssentials();
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
        })
    };
    render() {
        const {essentials} = this.state ;
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
                    <h3 style={{ marginRight: '36px', fontWeight: '600' }}>Số người đã nhận</h3>
                    <h3 style={{ fontWeight: '600' }}>9</h3>
                </div>
                <div style={{ display: "flex", marginTop: "17px", marginLeft: '12px' }}>
                    <h3 style={{ marginRight: '28px', fontWeight: '600' }}>Số người đã hỗ trợ</h3>
                    <h3 style={{ fontWeight: '600' }}>9</h3>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        essentialsReducer : state.essentialsReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials: async () => {
            const action = await getEssentials();
            return dispatch(action);
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Management_Quantity);
