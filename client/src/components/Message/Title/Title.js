import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TitleCss from './Title.module.css';
import axios from 'axios';
import {API_URL} from '../../../constants/api';
import {get_role_by_account_id_friend_conversation} from '../../../stores/actions/role.action';

const translateRoleName = (role_name)=>{
    switch(role_name) {
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

class Title extends Component {
    state ={
        friend:{},
        role_friend_conversation: {}
    }
    componentDidMount = async () =>{
        const conversation = this.props.conversation;
        const account_id = conversation.members.find(member => member!== this.props.account_id);
        const get_role_by_account_id_friend_conversation = await this.props.get_role_by_account_id_friend_conversation(account_id);
        // console.log(translateRoleName(this.props.roleReducer.role_name))
        const role_object = translateRoleName(this.props.roleReducer.role_friend_conversation.role_name);
        await axios(`${API_URL}/api/user/account_id/${account_id}/detail`)
            .then(res =>{
                this.setState({
                    friend: res.data,
                    role_friend_conversation: role_object
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }
    componentDidUpdate = async (prevProps) =>{
        if(prevProps.conversation !== this.props.conversation){
            const conversation = this.props.conversation;
            const account_id = conversation.members.find(member => member!== this.props.account_id);
            const get_role_by_account_id_friend_conversation = await this.props.get_role_by_account_id_friend_conversation(account_id);
            const role_object = translateRoleName(this.props.roleReducer.role_friend_conversation.role_name);
            await axios(`${API_URL}/api/user/account_id/${account_id}/detail`)
                .then(res =>{
                    this.setState({
                        friend: res.data,
                        role_friend_conversation: role_object
                    })
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    render() {
        const {friend, role_friend_conversation} = this.state;
        const {conversation} = this.props;
        // console.log(friend)
        return (
            <div className={TitleCss.send_message_container}>
                <div className={TitleCss.name_container}>
                    <h4>{friend.full_name}</h4>
                    <p style={{color: role_friend_conversation.color, fontSize: '12px', fontWeight: 300}}>{role_friend_conversation.name}</p>
                </div>
                <div className={TitleCss.btn_container}>
                    <button className={TitleCss.btn_close} onClick={()=>{this.props.handleShowMessage()}}><CloseOutlinedIcon/></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        roleReducer: state.roleReducer
    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        get_role_by_account_id_friend_conversation: async (account_id) =>{
            const action = await get_role_by_account_id_friend_conversation(account_id);
            return dispatch(action)
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Title));
