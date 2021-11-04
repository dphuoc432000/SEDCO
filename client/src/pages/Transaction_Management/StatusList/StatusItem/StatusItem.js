import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './StatusItem.css';
class StatusItem extends Component {
    render() {
        return (
            <div className='status_item'>
                <div className="information_container">
                    <div className="name">
                        <h3>Hà Đức Phước</h3>
                    </div>
                    <div className="address">
                        <p style={{fontSize: '13px', color: '#7F7F7F'}}>Điện Thắng Trung - Điện Bàn - Quảng Nam</p>
                    </div>
                    <div className="phone_number">
                        <p style={{fontSize: '13px', color: '#7F7F7F'}}>0961622464</p>
                    </div>
                </div>
                <div className="btn_infor">
                    <button>Xem thông tin</button>
                </div>
            </div>
        )
    }
}
export default withRouter(StatusItem)
