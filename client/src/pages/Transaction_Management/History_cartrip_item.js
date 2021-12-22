import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './History.css'
class History_cartrip_item extends Component {
    state={

    }
    render() {
        const history_obj=this.props.history;
        const style_li_sender = {
            backgroundColor: '#FAFFC1' ,
            border: '1px solid #FBDA30' 
        }
        const style_li_receiver = {
            backgroundColor: '#FFD6D6', 
            border: '1px solid #EA5923'
        }
        const {user , history } = history_obj;
        console.log(history_obj)
        return (
            <li style={history_obj.status_type === 'SENDER' ? style_li_sender  : style_li_receiver}  className="QLGD-History__Item" onClick={() => {this.props.handleShowDetailHistory(history.essentials , user)}}>
                <div style={{ display: 'flex' }}>

                    <p style={{ fontSize: '13px' }}>
                        {history_obj.status_type === 'SENDER' ? 
                            `Bạn đã xác nhận nhận nhu yếu phẩm từ  ${user.full_name}`: 
                            `Bạn đã xác nhận gửi nhu yếu phẩm tới ${user.full_name}`
                        }
                    </p>
                </div>
                <div style={{ marginLeft: '40px' }}>
                    <h3 style={{ fontSize: '13px'}}>
                        {history_obj.status_type === 'SENDER' ? 
                            history.sender_confirm=== true ?
                            'Đã xác nhận': 
                            `Chưa xác nhận`
                            :
                            history.receiver_confirm=== true ?
                            'Đã xác nhận': 
                            `Chưa xác nhận`
                        }
                    </h3>
                </div>

            </li>
        );
    }
}



export default History_cartrip_item;