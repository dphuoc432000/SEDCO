import React, { Component } from "react";
import "./RecentItem.css";

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class RecentItem extends Component {
    render() {
        const recent_status_item = this.props.recent_status_item;
        // console.log(recent_status_item)
        return (
            <div className="data-container-ListRecent--ITEMS" onClick = {() =>{this.props.handleChangeStatusMarker(recent_status_item)}} >
                <div className="data-ListRecent__item">
                    <div className="ListRecent__item-Left">
                        <h3 className="ListRecent__item ListRecent__item-Left-Name">
                            {recent_status_item.user.full_name}
                        </h3>
                        <h4 className="ListRecent__item ListRecent__item-Left-Address">
                            {recent_status_item.user.address}
                        </h4>
                    </div>
                    <div className="ListRecent__item-Right">
                        <h3 className="ListRecent__item ListRecent__item-Right-Time">
                            {converJsonDateToDate(recent_status_item.createdAt)}
                        </h3>
                        <h3 className="ListRecent__item ListRecent__item-Right-STT">
                            {   
                                recent_status_item.status_type === 'CAR_TRIP' ?
                                    (recent_status_item.detail.receiving_status &&
                                    !recent_status_item.status_completed ?
                                    'Đang di chuyển':'Chưa di chuyển')
                                    :
                                    recent_status_item.status_type === 'SENDER' ?
                                        (recent_status_item.detail.regis_status &&
                                        !recent_status_item.status_completed ?
                                        'Đã được đăng ký':'Đang chờ nhận')
                                        :
                                        recent_status_item.status_type === 'RECEIVER' &&
                                            (recent_status_item.detail.regis_status &&
                                            !recent_status_item.status_completed ?
                                            'Đã được đăng ký'
                                            :
                                            'Đang chờ hỗ trợ')
                            }
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecentItem;
