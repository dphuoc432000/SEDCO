import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './StatusItem.css';
class StatusItem extends Component {
    render() {
        const status_item = this.props.status_item;
        return (
            <div className='status_item_tag' onClick = {() => this.props.handleInfomationStatusItem(status_item)}>
                
                    <div className="name">
                        <h3>{status_item.user.full_name}</h3>
                    </div>
                    <div className="address">
                        <p style={{fontSize: '12px', color: '#7F7F7F'}}>{status_item.user.address}</p>
                    </div>
                    <div className="phone_number">
                        <p style={{fontSize: '12px', color: '#7F7F7F'}}>{status_item.user.phone_number}</p>
                    </div>
                
            </div>
        )
    }
}
export default withRouter(StatusItem)
