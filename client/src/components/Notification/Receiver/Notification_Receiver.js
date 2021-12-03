import React, { Component } from "react";
import { withRouter } from "react-router";
// import Notification_item from "./Notification_item";

import "./notification_receiver.css";
import "../../../styles/main.css";

import {get_notification_register_of_receiver} from '../../../stores/actions/receiver_status.action';
import {get_notification_not_confirm_of_receiver} from '../../../stores/actions/receiver_status.action';
import {get_notications_both_confirm_transaction_of_receiver} from '../../../stores/actions/receiver_status.action';

import {connect} from 'react-redux'
import Notification_receiver_no_comfirm from './Notification_receiver_no_confirm'
import Notification_Register_RECEIVER from '../Notification_Register_RECEIVER'
class Notification_Receiver extends Component {
    state = {
        seeNotificationDetail: false,
        seeInforCartrip : false,
        notification_cartrip_regis_list_receiver: [],
        notification_cartrip_not_confirm_list_receiver: [],
        history_data : {},
        car_infor_data : {},
        notification_both_confirm_of_receiver : [],
      };
     
    componentDidMount = async () => {
        console.log(this)
        if(Object.keys(this.props.status_current).length > 0){
            const status_current = this.props.status_current;
            await this.props.get_notification_register_of_receiver(status_current.detail._id);
            await this.props.get_notification_not_confirm_of_receiver(status_current.detail._id);
            await this.props.get_notications_both_confirm_transaction_of_receiver(status_current.detail._id);

            
            console.log('tb car trip đã đk',this.props.receiver_statusReducer.notification_cartrip_regis_list_receiver);
            console.log('car trip đã xác nhận',this.props.receiver_statusReducer.notification_cartrip_not_confirm_list_receiver);
            console.log('check tb cả 2 đã xác nhận', this.props.receiver_statusReducer.notification_both_confirm_of_receiver);
    
            this.setState({
                notification_cartrip_regis_list_receiver: this.props.receiver_statusReducer.notification_cartrip_regis_list_receiver,
                notification_cartrip_not_confirm_list_receiver : this.props.receiver_statusReducer.notification_cartrip_not_confirm_list_receiver,
                notification_both_confirm_of_receiver : this.props.receiver_statusReducer.notification_both_confirm_of_receiver,
            })
        }
    }
    componentDidUpdate = async (prevProps) => {
        if(this.props.status_current !== prevProps.status_current){
            console.log('vao')
            const status_current = this.props.status_current;
            console.log(status_current)
            await this.props.get_notification_register_of_receiver(status_current.detail._id);
            await this.props.get_notification_not_confirm_of_receiver(status_current.detail._id); 
            this.setState({
                notification_cartrip_regis_list_receiver: this.props.receiver_statusReducer.notification_cartrip_regis_list_receiver,
                notification_cartrip_not_confirm_list_receiver : this.props.receiver_statusReducer.notification_cartrip_not_confirm_list_receiver,
                notification_both_confirm_of_receiver : this.props.receiver_statusReducer.notification_both_confirm_of_receiver,
            })
        }
    }
    
    handleShowDetailNotification = (history_data , car_infor_data) => {
        this.setState({
          seeNotificationDetail: !this.state.seeNotificationDetail,
          seeInforCartrip : false,
          history_data : history_data,
          car_infor_data : car_infor_data,
        });
      };

      handleShowSeeInforCartrip = (history_data , car_infor_data) => {
        this.setState({
            seeInforCartrip : !this.state.seeInforCartrip,
            seeNotificationDetail : false,
            history_data :history_data,
            car_infor_data : car_infor_data,
        })
    }
    handleUpdateNotifiWhenConfirm = async(notification_both_confirm_of_receiver , notification_cartrip_not_confirm_list_receiver) => {

        await this.props.get_notications_both_confirm_transaction_of_receiver(this.props.status_current.detail._id);
        await this.props.get_notification_not_confirm_of_receiver(this.props.status_current.detail._id);

        const notification_both_confirm_of_receiver_data = await this.props.receiver_statusReducer.notification_both_confirm_of_receiver;
        const notification_not_confirm_of_receiver_data = await this.props.receiver_statusReducer.notification_cartrip_not_confirm_list_receiver;
        this.setState({ 
            notification_both_confirm_of_receiver : notification_both_confirm_of_receiver_data,
            notification_cartrip_not_confirm_list_receiver : notification_not_confirm_of_receiver_data,
            seeNotificationDetail : false,
        })

    }
  render()  {
    let { seeNotificationDetail , seeInforCartrip ,notification_cartrip_regis_list_receiver , notification_cartrip_not_confirm_list_receiver, notification_both_confirm_of_receiver} = this.state;
    const checkSeeDetailNotification =
            (
                seeNotificationDetail === true ? (
                    <Notification_receiver_no_comfirm
                        history_data={this.state.history_data}
                        car_infor_data={this.state.car_infor_data}
                        status_current={this.props.status_current}
                        // handleLoadAgainWhenConfirmNotify={this.props.handleLoadAgainWhenConfirmNotify}
                        handleUpdateNotifiWhenConfirm={this.handleUpdateNotifiWhenConfirm}
                    
                    />
                ) : (
                ""
                )
            )
    const checkSeeInforCartrip = 
            (
                seeInforCartrip === true ? (
                    <Notification_Register_RECEIVER
                        history_data={this.state.history_data}
                        car_infor_data={this.state.car_infor_data}
                        status_current={this.props.status_current}
                    />
                ) : 
                ("")
            )
    return (
        <main className="Main">
            <div className="status_content_container_sender">
                <div className="status_content">
                    <div className="status_item">
                        <h3
                            style={{
                            fontSize: "19.32px",
                            fontWeight: "700",
                            lineHeight: "20.608px",
                            }}
                        >
                            Thông báo
                        </h3>
                    </div>
                    <div className="wrapped-noti" >
                            <h3 className="wrapped-noti__lable" >Chung</h3>
                            {notification_cartrip_regis_list_receiver ? 
                             notification_cartrip_regis_list_receiver.map(history =>{
                                const history_data = history.history;
                                const car_infor_data = history.car_infor;
                                return (
                                    <div className="status_item-per1">
                                        <div className="information_container">
                                            <div className="address">
                                                <p
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "#333",
                                                        fontWeight: "600",
                                                        marginLeft: "20px",
                                                        marginTop: "12px",
                                                    }}
                                                >
                                                    {`${car_infor_data.user.full_name} đã đăng ký hỗ trợ nhu yếu phẩm đến bạn`}
                                                </p>
                                            </div>
                                        </div>  
                                        <div
                                            style={{
                                                display: "flex",
                                                marginTop: "25px",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            
                                            <div>
                                                <button
                                                    className="btn-notifi btn-notifi__seeInf"
                                                    onClick={() =>{this.handleShowSeeInforCartrip(history_data , car_infor_data)}}
                                                >
                                                    Thông tin chuyến xe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )})
                                 : 
                                (<p
                                    style={{
                                        fontSize: "14px",
                                        color: "#333",
                                        fontWeight: "600",
                                        marginLeft: "20px",
                                        marginTop: "12px",
                                    }}
                                >
                                    Không có thông báo
                                </p>)

                              
                            }
                            
                    </div>
                    <div className="wrapped-noti">
                            <h3 className="wrapped-noti__lable" style={{ color: "red" }}>Chưa xác nhận</h3>
                            {notification_cartrip_not_confirm_list_receiver && notification_cartrip_not_confirm_list_receiver.map(history => {
                                const history_data = history.history;
                                const car_infor_data = history.car_infor;
                                return (
                                     <div className="status_item-per1">
                                            <div className="information_container">
                                                <div className="address">
                                                    <p
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#333",
                                                            fontWeight: "600",
                                                            marginLeft: "20px",
                                                            marginTop: "12px",
                                                        }}
                                                    >
                                                        {`${car_infor_data.user.full_name} đã xác nhận , hỗ trợ nhu yếu phẩm đến bạn`}
                                                    </p>
                                                </div>
                                            </div>  
                                            <div
                                                style={{
                                                    display: "flex",
                                                    marginTop: "25px",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                            
                                                <div>
                                                    <button
                                                        className="btn-notifi btn-notifi__seeInf"
                                                        onClick={() =>{this.handleShowDetailNotification(history_data , car_infor_data)}}
                                                    >
                                                        Xem thông tin
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                )
                            })}
                           
                    </div>
                    <div className="wrapped-noti">
                            <h3 className="wrapped-noti__lable" style={{ color: "#009432" }}>Đã xác nhận</h3>
                            {notification_both_confirm_of_receiver ? notification_both_confirm_of_receiver.map(history => {
                                const history_data = history.history;
                                const car_infor_data = history.car_infor;
                                return(
                                    <div className="status_item-per1__success">
                                        <div className="information_container">
                                            <div className="address">
                                                <p
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "#333",
                                                        fontWeight: "600",
                                                        marginLeft: "20px",
                                                        marginTop: "25px",
                                                    }}
                                                >
                                                    {`Bạn đã xác nhận , nhận nhu yếu phẩm từ ${car_infor_data.user.full_name}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                                style={{
                                                    display: "flex",
                                                    marginTop: "25px",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                            
                                                <div>
                                                    <button
                                                        className="btn-notifi btn-notifi__seeInf"
                                                        onClick={() =>{this.handleShowDetailNotification(history_data , car_infor_data)}}
                                                    >
                                                        Xem thông tin
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                )
                            }) : 
                            (<p
                                style={{
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "600",
                                    marginLeft: "20px",
                                    marginTop: "12px",
                                }}
                            >
                                Không có thông báo
                            </p>)
                        
                        }
                           
                    </div>
                </div>
            </div>
            {checkSeeInforCartrip}
            {checkSeeDetailNotification}
        </main>
    )
  
  }
}
const mapStateToProps = (state) => {
    return {
        receiver_statusReducer : state.receiver_statusReducer,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        get_notification_register_of_receiver : async (receiver_status_id) => {
            const action = await get_notification_register_of_receiver(receiver_status_id);
            return dispatch(action);
        },
        get_notification_not_confirm_of_receiver : async ( receiver_status_id) => {
            const action = await get_notification_not_confirm_of_receiver(receiver_status_id);
            return dispatch(action);
        }
        ,
        get_notications_both_confirm_transaction_of_receiver : async ( receiver_status_id) => {
            const action = await get_notications_both_confirm_transaction_of_receiver(receiver_status_id);
            return dispatch(action);
        }
    };
  };
  
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Notification_Receiver));
