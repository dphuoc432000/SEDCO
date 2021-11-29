import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConversationItemCss from './ConversationItem.module.css';
import {get_user_detail_by_account_id_action} from '../../../../stores/actions/user.action';
import {GET_USER_BY_ACCOUNT_ID_SUCCESS} from '../../../../constants/actions';
import {API_URL} from '../../../../constants/api';
import axios from 'axios';
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
        return (
            <div className={ConversationItemCss.item_container} onClick={() =>{this.props.handleShowMessageWhenClickConversation(conversation); this.props.handleShowConversationList()}}>
                <div className={ConversationItemCss.name_container}>
                    <h4>{friend.full_name}</h4>
                    <p>Người vận chuyển</p>
                </div>
                <div className={ConversationItemCss.time}>
                    <p>12:20</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        userReducer: state.userReducer
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        get_user_detail_by_account_id_action : async (account_id) =>{
            const action = await get_user_detail_by_account_id_action(account_id);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationItem));
