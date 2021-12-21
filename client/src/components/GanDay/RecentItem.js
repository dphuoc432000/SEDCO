import React, { Component } from "react";
import "./RecentItem.css";
import CircleIcon from '@mui/icons-material/Circle';

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}
const renderColor = (status) =>{
    let content ='';
    let color = '';
    if(status.status_type === 'CAR_TRIP'){
        if(Date.parse(status.detail.start_receive_time) - Date.now() < 0 && !status.status_completed ){
            content = 'Đang di chuyển';
            color = "#009432";
        }
        else{
            content = 'Chưa di chuyển';
            color = "#A3CB38";
        }
    }
    else if(status.status_type === 'SENDER'){
        if(status.detail.regis_status && !status.status_completed){
            content = 'Đã được đăng ký';
            color = "#FFA801";
        }
        else{
            content = 'Đang chờ nhận';
            color = "#FED330";
        }
    }
    else if(status.status_type === 'RECEIVER'){
        if(status.detail.regis_status && !status.status_completed){
            content = 'Đã được đăng ký';
            color = "#EA2027";
        }
        else{
            content = 'Đang chờ hỗ trợ';
            color = "#EE5A24";
        }
    }
    return(
        <div className="ListRecent__item-Right-STT_container">
            <CircleIcon style={{color: color, width: '20px', height:'20px'}}/>
            <p style={{color: color}} className="ListRecent__item ListRecent__item-Right-STT">{content}</p>
        </div>
    ) 
}
class RecentItem extends Component {
    render() {
        const recent_status_item = this.props.recent_status_item;
        // console.log(recent_status_item)
        return (
            <div className="data-container-ListRecent--ITEMS" onClick = {() =>{this.props.handleChangeStatusMarker(recent_status_item)}} >
                <div className="data-ListRecent__item">
                    <div className="ListRecent__item-Left">
                        <p className="ListRecent__item ListRecent__item-Left-Name">
                            {recent_status_item.user.full_name}
                        </p>
                        <p className="ListRecent__item ListRecent__item-Left-Address">
                            {recent_status_item.user.address}
                        </p>
                    </div>
                    <div className="ListRecent__item-Right">
                        <p className="ListRecent__item ListRecent__item-Right-Time">
                            {converJsonDateToDate(recent_status_item.createdAt)}
                        </p>
                        {/*<p className="ListRecent__item ListRecent__item-Right-STT">
                               
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
                                            'Đang chờ hỗ trợ')*/
                                renderColor(recent_status_item)
                        /*</p>*/}
                    </div>
                </div>
            </div>
        );
    }
}
export default RecentItem;
