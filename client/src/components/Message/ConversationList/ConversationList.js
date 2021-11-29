import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConversationListCss from './ConversationList.module.css';
import ConversationItem from './ConversationItem/ConversationItem';
import {get_conversation_list_action} from '../../../stores/actions/conversation.action';
import {GET_CONVERSATION_LIST_SUCCESS} from '../../../constants/actions'
import LazyLoad from 'react-lazyload';


class ConversationList extends Component {
    state={
        conversation_list:[],
    }
    componentDidMount = async () =>{
        const account_id = this.props.account_id;
        const get_conversation_list_action = await this.props.get_conversation_list_action(account_id);
        const conversationReducer = await this.props.conversationReducer;
        if(get_conversation_list_action.type === GET_CONVERSATION_LIST_SUCCESS)
            this.setState({
                conversation_list: conversationReducer.conversation_list
            })
    }
    render() {
        const {conversation_list} = this.state;
        return (
            <div className={ConversationListCss.conversation_container}>
                <div className={ConversationListCss.layer}>
                    {
                        conversation_list.map(conversation =>{
                            return (
                                // <LazyLoad key={conversation._id} placeholder={'Đang tải'}>
                                    <ConversationItem 
                                        account_id={this.props.account_id}
                                        conversation={conversation}
                                        key={conversation._id} 
                                        handleShowMessageWhenClickConversation={this.props.handleShowMessageWhenClickConversation}
                                        handleShowConversationList={this.props.handleShowConversationList}
                                    />
                                // </LazyLoad>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        conversationReducer: state.conversationReducer
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        get_conversation_list_action: async(account_id) =>{
            const action = await get_conversation_list_action(account_id);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationList));
