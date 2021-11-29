import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SendMessageCss from './SendMessage.module.css';
import SendIcon from '@mui/icons-material/Send';
import {add_message_action} from '../../../stores/actions/message.action';
import {ADD_MESSAGE_SUCCESS} from '../../../constants/actions';
import {toast} from 'react-toastify'
class SendMessage extends Component {
    state={
        input_message:''
    }

    handleChangeInputMessage = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
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
            // let checkSocketReceiver = false ;
            socket.current.emit('checkReceiver', {sender_id: account_id, receiver_id});
            socket.current.on('checkSocket', data =>{
                console.log(data)
                // checkSocketReceiver = data
                if(data){
                    socket.current.emit('sendMessage',{
                        sender_id: account_id,
                        receiver_id,
                        text: this.state.input_message
                    })
                }
            })
            // console.log(checkSocketReceiver)
            // if(checkSocketReceiver){
            //     socket.current.emit('sendMessage',{
            //         sender_id: account_id,
            //         receiver_id,
            //         text: this.state.input_message
            //     })
            // }
            
            this.props.handleUpdateArrivalMessage(object);
            const add_message_action = await this.props.add_message_action(object);
            if(add_message_action.type === ADD_MESSAGE_SUCCESS){
                this.setState({
                    input_message: ''
                })
            }
            else
                toast.error('Đã xãy ra lỗi trong quá trình gửi tin nhắn!')
        }
    }

    render() {
        const {input_message} = this.state
        return (
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
        )
    }
}

const mapStateToProps = (state) =>{
    return{

    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        add_message_action: async (object) =>{
            const action = await add_message_action(object);
            return dispatch(action);
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendMessage));
