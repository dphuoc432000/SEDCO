import React, { Component } from 'react'
import {get_role_by_account_id} from '../../../../stores/actions/role.action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class Role_conversation extends Component {
    state = {
        role:{},
    }
    componentDidMount = async() =>{
        const conversation = this.props.conversation;
        const account_id = conversation.members.find(member => member!== this.props.account_id);
        const role = await this.translateRoleName(account_id)
        this.setState({
            role:role
        })
    }
    componentDidUpdate = async (prevProps) =>{
        if(this.props.conversation!== prevProps.conversation){
            console.log('khacs')
        }
    }
    translateRoleName = async (account_id)=>{
        await this.props.get_role_by_account_id(account_id);
        const role_conversation = this.props.roleReducer.role_conversation;
        switch(role_conversation.role_name) {
            case "user":
                return {name:"Người dùng",color:"#808E9B" };
            case "sender":
                return {name:"Người hỗ trợ",color:"#FED330" };
            case "receiver":
                return {name:"Người cần hỗ trợ",color:"#EE5A24" };
            case "car_trip":
                return {name:"Người vận chuyển",color:"#A3CB38" };
            case "mod":
                return {name:"Mod",color:"#EA2027" };
            case "admin":
                return {name:"Admin",color: "#EA2027"};
            default:
                return;
        }
    }
    render() {
        return (
            <React.Fragment>
                <p>Người vận chuyển</p>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        roleReducer: state.roleReducer
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        get_role_by_account_id: async(account_id) =>{
            const action = await get_role_by_account_id(account_id);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Role_conversation));
