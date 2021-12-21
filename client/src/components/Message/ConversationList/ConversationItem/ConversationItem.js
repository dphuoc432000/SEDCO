import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConversationItemCss from './ConversationItem.module.css';
import {get_user_detail_by_account_id_action} from '../../../../stores/actions/user.action';
import {get_role_by_account_id} from '../../../../stores/actions/role.action';
import {GET_USER_BY_ACCOUNT_ID_SUCCESS} from '../../../../constants/actions';
import {API_URL} from '../../../../constants/api';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi.json';

TimeAgo.addDefaultLocale(vi);
const timeAgo = new TimeAgo('vi-VI');

class ConversationItem extends Component {
    state ={
        friend:{},
    }
    componentDidMount = async () =>{
        const conversation = this.props.conversation;
        const account_id = conversation.members.find(member => member!== this.props.account_id);
        await axios(`${API_URL}/api/user/account_id/${account_id}/detail`)
            .then(res =>{
                this.setState({
                    friend: res.data
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }
    render() {
        const {friend} = this.state;
        const {conversation} = this.props;
        // console.log(friend)
        return (
            <div style={!conversation.watched?{background: '#ddf0fe'}:{}} className={ConversationItemCss.item_container} onClick={() =>{this.props.handleShowMessageWhenClickConversation(conversation); this.props.handleShowConversationList()}}>
                <div className={ConversationItemCss.name_container}>
                    <p>{friend.full_name}</p>
                   { /*<p>Người vận chuyển</p>*/}
                </div>
                <div className={ConversationItemCss.time}>
                    <p style={{fontSize:'12px'}}>{timeAgo.format(conversation.updatedAt?(new Date(conversation.updatedAt)):(Date.now()))}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        userReducer: state.userReducer,
        roleReducer: state.roleReducer
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        get_user_detail_by_account_id_action : async (account_id) =>{
            const action = await get_user_detail_by_account_id_action(account_id);
            return dispatch(action);
        },
        get_role_by_account_id: async(account_id) =>{
            const action = await get_role_by_account_id(account_id);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationItem));
