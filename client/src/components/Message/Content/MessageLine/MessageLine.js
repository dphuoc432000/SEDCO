import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MessageLineCss from './MessageLine.module.css';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi.json';

TimeAgo.addDefaultLocale(vi);
const timeAgo = new TimeAgo('vi-VI');

class MessageLine extends Component {
    render() {
        const {message, own} = this.props;
        return (
            <div className={own ? `${MessageLineCss.block_container} ${MessageLineCss.own}` : MessageLineCss.block_container}>
                <div>
                    <p className={`${MessageLineCss.message_content}`}>{message.text}</p>
                </div> 
                <div>
                    <p className={MessageLineCss.timeline}>{timeAgo.format(message.createdAt?(new Date(message.createdAt)):(Date.now()))}</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageLine));
