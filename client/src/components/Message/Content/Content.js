import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ContentCss from './Content.module.css';
import MessageLine from './MessageLine/MessageLine';
// import {get_message_list_action} from '../../../stores/actions/message.action';
// import {GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS} from '../../../constants/actions';

class Content extends Component {
    state = {
        message_list:this.props.messages
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount = async () =>{
        // const conversation = this.props.conversation;
        // const get_message_list_action = await this.props.get_message_list_action(conversation._id);
        // if(get_message_list_action.type === GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS){
        //     const messageReducer = await this.props.messageReducer;
        //     this.setState({
        //         message_list: messageReducer.message_list
        //     })
        // }
        this.scrollToBottom();
    }
    componentDidUpdate = async (prevProps) =>{
        // if(this.props.conversation !== prevProps.conversation){
        //     const conversation = this.props.conversation;
        //     const get_message_list_action = await this.props.get_message_list_action(conversation._id);
        //     if(get_message_list_action.type === GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS){
        //         const messageReducer = await this.props.messageReducer;
        //         this.setState({
        //             message_list: messageReducer.message_list
        //         })
        //     }
        //     this.scrollToBottom();
        // }
        if(this.props.messages !== prevProps.messages){
            this.scrollToBottom();
        }
    }
    render() {
        // const {message_list} = this.state;
        const message_list = this.props.messages
        const {account_id} = this.props
        return (
            <div className={ContentCss.content_container}>
                {message_list.map(message =>(
                    <MessageLine key={message._id}
                        own={(account_id === message.account_id) ? true: false}
                        message = {message}
                    />
                ))}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        // messageReducer: state.messageReducer
    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        // get_message_list_action: async (conversation_id) =>{
        //     const action = await get_message_list_action(conversation_id);
        //     return dispatch(action)
        // }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
