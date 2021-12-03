import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TitleCss from './Title.module.css';
import axios from 'axios';
import {API_URL} from '../../../constants/api';

class Title extends Component {
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
    componentDidUpdate = async (prevProps) =>{
        if(prevProps.conversation !== this.props.conversation){
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
    }
    render() {
        const {friend} = this.state;
        const {conversation} = this.props;
        return (
            <div className={TitleCss.send_message_container}>
                <div className={TitleCss.name_container}>
                    <h4>{friend.full_name}</h4>
                    <p>Người vận chuyển</p>
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

    };
}
const mapDispatchToProps = (dispatch) =>{
    return{

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Title));
