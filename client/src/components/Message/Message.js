import React, { Component, useState, useRef, useEffect } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MessageCss from './Message.module.css';
import Title from './Title/Title';
import Content from './Content/Content';
import SendMessage from './SendMessage/SendMessage';
import {get_message_list_action} from '../../stores/actions/message.action';
import {GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS,ADD_MESSAGE_SUCCESS} from '../../constants/actions'
import SendMessageCss from './SendMessage/SendMessage.module.css';
import SendIcon from '@mui/icons-material/Send';
import {add_message_action} from '../../stores/actions/message.action';
import {toast} from 'react-toastify'

import {io} from 'socket.io-client';

// const socket = io('localhost:5000');

// export const Message = (props) => {
    // const [conversation, setConversation] = useState({...props.conversation});
    // const{account_id} = props
    // const socket = useRef(io('ws://localhost:5000'));

    // useEffect(() =>{
    //     socket.current.emit('addAccount', account_id)
    //     socket.current.on('getAccounts', accounts =>{
    //         console.log(accounts)
    //     })
    // },[account_id])
// let socket = React.createRef();
// socket.current = io('localhost:5000');
class Message extends React.PureComponent {
    state = {
        conversation: this.props.conversation,
        arrivalMessage: null,
        messages: [],
        input_message:""
    }
    // componentWillMount=()=>{
        
    // }
    componentDidMount = async  () =>{
        const conversation = this.props.conversation;
        const get_message_list_action = await this.props.get_message_list_action(conversation._id);
        if(get_message_list_action.type === GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS){
            console.log('didmount')
            const messageReducer = await this.props.messageReducer;
            this.setState({
                messages: messageReducer.message_list
            })
        }
        const{socket} = this.props;
        socket.current.on('getMessage', data =>{
            this.setState({
                arrivalMessage:{
                    account_id:data.sender_id,
                    text: data.text,
                    createdAt: Date.now()
                }
            })
        })
    }
    componentDidUpdate = async (prevProps, prevState) =>{
        if(this.props.conversation !== prevProps.conversation){
            console.log('chạy1')
            const conversation = this.props.conversation;
            const get_message_list_action = await this.props.get_message_list_action(conversation._id);
            if(get_message_list_action.type === GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS){
                const messageReducer = await this.props.messageReducer;
                console.log(messageReducer)
                this.setState({
                    messages: messageReducer.message_list
                })
            }
        }
        if(prevState.arrivalMessage !== this.state.arrivalMessage){
            const{socket, conversation} = this.props;
            const {arrivalMessage, messages} = this.state;
            if(arrivalMessage && conversation.members.includes(arrivalMessage.account_id)){
                console.log('chạy')
                this.setState({
                    messages: [...messages, arrivalMessage]
                })
            }
        }
    }
    handleChangeInputMessage = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    handleUpdateArrivalMessage = (object) =>{
        console.log('update')
        this.setState({
            messages: [...this.state.messages, object],
        })
    }
    handleSumitMessage = async () =>{
        if(this.state.input_message.length > 0){
            const {conversation, account_id, socket} = this.props;
            const object = {
                conversation_id: conversation._id,
                account_id: account_id,
                text: this.state.input_message
            };
            const receiver_id = conversation.members.find(member => member !== account_id)
            // socket.current.emit('checkReceiver', {sender_id: account_id, receiver_id});
            // socket.current.on('checkSocket', data =>{
            //     console.log(data)
            //     if(data){
                    socket.current.emit('sendMessage',{
                        sender_id: account_id,
                        receiver_id,
                        text: this.state.input_message
                    })
            //     }
            // })
            const add_message_action = await this.props.add_message_action(object);
            if(add_message_action.type === ADD_MESSAGE_SUCCESS){
                this.setState({
                    messages: [...this.state.messages, object],
                    input_message: ''
                })
            }
            else
                toast.error('Đã xãy ra lỗi trong quá trình gửi tin nhắn!')
        }
    }
    render() {
        const{input_message,messages} = this.state;
        return (
            <div className={MessageCss.message_container}>
                <Title
                    handleShowMessage={this.props.handleShowMessage}
                    conversation={this.props.conversation}
                    account_id={this.props.account_id}
                />
                <Content
                    messages={messages}
                    conversation={this.props.conversation}
                    account_id={this.props.account_id}
                />
                <div className={SendMessageCss.send_message_container}>
                    <textarea 
                        className={SendMessageCss.input_message} 
                        name="input_message" 
                        value={input_message} 
                        placeholder="Nhập tin nhắn..." 
                        onChange={(event) => {this.handleChangeInputMessage(event)}}
                    ></textarea>
                    <button onClick={() =>{this.handleSumitMessage()}}><SendIcon/></button>
                </div>
                {/*<SendMessage
                //     handleUpdateArrivalMessage={this.handleUpdateArrivalMessage}
                //     socket={this.props.socket}
                //     conversation={this.props.conversation}
                //     account_id={this.props.account_id}
                // />*/}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        messageReducer: state.messageReducer
    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        get_message_list_action: async (conversation_id,_limit,_page) =>{
            const action = await get_message_list_action(conversation_id,_limit,_page);
            return dispatch(action)
        },
        add_message_action: async (object) =>{
            const action = await add_message_action(object);
            return dispatch(action);
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
