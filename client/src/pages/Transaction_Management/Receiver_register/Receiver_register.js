import React, { Component} from 'react';
import { connect } from 'react-redux';
import StatusList from '../StatusList/StatusList';
import { withRouter } from 'react-router';
import Receiver_content from './Receiver_content/Receiver_content';
import getEssentials from '../../../stores/actions/essentials.action';

class Receiver_register extends Component {
    state={
        receiver_status_information:{},
    }
    
    componentDidMount = async() =>{
        await this.props.getEssentials();
        const essentialsReducer = await this.props.essentialsReducer;
        // console.log(essentialsReducer.essentials);
    }

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

    handleInfomationStatusItem = (receiver_status_item) =>{
        const essential_map = this.mapEssentials_StatusToEssentialsTable(receiver_status_item.detail.essentials);
        const receiver_status_map = receiver_status_item;
        receiver_status_map.detail.essentials = essential_map;
        this.setState({
            receiver_status_information: receiver_status_map
        })
    }

    handleRemoveStatusAfterCorfirmOrCancle_receiver_list = (receiver_status) => {
        this.props.handleRemoveStatusAfterCorfirmOrCancle_receiver_list(receiver_status)
        this.setState({
            receiver_status_information:{},
        })
    }

    render() {
        return (
            <React.Fragment>
                <StatusList handleInfomationStatusItem={this.handleInfomationStatusItem} status_list = {this.props.status_list}/>
                <Receiver_content 
                    car_status = {this.props.car_status}
                    handleRemoveStatusAfterCorfirmOrCancle_receiver_list = {this.handleRemoveStatusAfterCorfirmOrCancle_receiver_list} 
                    receiver_status_information={this.state.receiver_status_information} 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver_register))