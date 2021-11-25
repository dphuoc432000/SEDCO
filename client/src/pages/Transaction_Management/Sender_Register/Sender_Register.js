import React, { Component} from 'react';
import { connect } from 'react-redux';
import StatusList from '../StatusList/StatusList';
import { withRouter } from 'react-router';
import Sender_Content from './Sender_Content/Sender_Content';
import getEssentials from '../../../stores/actions/essentials.action';

class Sender_Register extends Component {
    state={
        sender_status_information:{},
    }
    componentDidMount = async() =>{
        await this.props.getEssentials();
        const essentialsReducer = await this.props.essentialsReducer;
        // console.log(essentialsReducer.essentials);
    }
    //Lấy ra mảng essentials của status
    getEssentialsToStatus_Item = (status_item) =>{
        const essentialsOfStatus = status_item.detail.essentials;
        return essentialsOfStatus
    }

    //map essentials của status từ bảng essentials(name, code_name, quantity, unit, type)
    mapEssentials_StatusToEssentialsTable = (essentials_status) =>{
        //essentials table => arr
        const essentialsReducer = this.props.essentialsReducer.essentials;//arr
        //map essentials
        return essentials_status.map(essential =>{
            const essential_table_find = essentialsReducer.find(ess => essential.essential_id === ess._id)
            // return essential_table_find
            return {
                essential_id: essential_table_find._id,
                name: essential_table_find.name,
                code_name: essential_table_find.code_name,
                unit: essential_table_find.unit,
                quantity: essential.quantity,
            }
        })
    }

    handleInfomationStatusItem = (sender_status_item) =>{
        const essential_map = this.mapEssentials_StatusToEssentialsTable(sender_status_item.detail.essentials);
        const sender_status_map = sender_status_item;
        sender_status_map.detail.essentials = essential_map;
        this.setState({
            sender_status_information: sender_status_map
        })
    }
    handleRemoveStatusAfterCorfirmOrCancle_sender_list = (sender_status) => {
        this.props.handleRemoveStatusAfterCorfirmOrCancle_sender_list(sender_status)
        this.setState({
            sender_status_information:{},
        })
    }
    render() {
        return (
            <React.Fragment>
                <StatusList handleInfomationStatusItem={this.handleInfomationStatusItem} status_list = {this.props.status_list}/>
                <Sender_Content 
                    car_status = {this.props.car_status}
                    handleRemoveStatusAfterCorfirmOrCancle_sender_list = {this.handleRemoveStatusAfterCorfirmOrCancle_sender_list} 
                    sender_status_information={this.state.sender_status_information} 
                    handleChangeQuantityCarAfterConfirm= {this.props.handleChangeQuantityCarAfterConfirm}
                />
            </React.Fragment>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {
        essentialsReducer: state.essentialsReducer,
    }
  }
  
  //dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        getEssentials: async() =>{
            const action = await getEssentials();
            return dispatch(action)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sender_Register))