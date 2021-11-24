import React, { Component } from "react";
import { withRouter } from "react-router";
import Notification_item from "./Notification_item";
import Notification_content from "./Notification_content";
import "./notification_sender.css";
import "../../../styles/main.css";
import SeeInforCarTrip from '../SeeInforCarTrip'
class Notification_Sender extends Component {
    state = {
        seeNotificationDetail: false,
        seeInforCartrip : false ,
    };
    handleShowDetailNotification = () => {
        this.setState({
            seeNotificationDetail: !this.state.seeNotificationDetail,
            seeInforCartrip : false,
        });
    };
    handleShowSeeInforCartrip = () => {
        this.setState({
            seeInforCartrip : !this.state.seeInforCartrip,
            seeNotificationDetail : false,
        })
    }
    render() {
        let { seeNotificationDetail , seeInforCartrip } = this.state;
        const checkSeeDetailNotification =
            (
                seeNotificationDetail === true ? (
                    <Notification_content

                    />
                ) : (
                    ""
                )
            )
        const checkSeeInforCartrip = 
            (
                seeInforCartrip === true ? (
                    <SeeInforCarTrip/>
                ) : ("")
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
                            <div className="status_item-per1">
                                <div className="information_container">
                                    <div className="address">
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#333",
                                                fontWeight: "700",
                                                marginLeft: "20px",
                                                marginTop: "12px",
                                            }}
                                        >
                                            Sơn Tùng đã đăng ký nhận nhu yếu phẩm của bạn
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
                                    {/* <div>
                                        <button className="btn-notifi btn-notifi__confirm">
                                            Xác nhận
                                        </button>
                                    </div> */}
                                    <div>
                                        <button
                                            className="btn-notifi btn-notifi__seeInf"
                                            onClick={() =>{this.handleShowSeeInforCartrip()}}
                                        >
                                            Thông tin chuyến xe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="wrapped-noti">
                            <h3 className="wrapped-noti__lable" style={{ color: "red" }}>Chưa xác nhận</h3>
                            <div className="status_item-per1">
                                <div className="information_container">
                                    <div className="address">
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#333",
                                                fontWeight: "700",
                                                marginLeft: "20px",
                                                marginTop: "12px",
                                            }}
                                        >
                                            Sơn Tùng đã xác nhận , nhận nhu yếu phẩm của bạn
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
                                    {/* <div>
                                        <button className="btn-notifi btn-notifi__confirm">
                                            Xác nhận
                                        </button>
                                    </div> */}
                                    <div>
                                        <button
                                            className="btn-notifi btn-notifi__seeInf"
                                            onClick={() =>{this.handleShowDetailNotification()}}
                                        >
                                            Xem thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wrapped-noti">
                            <h3 className="wrapped-noti__lable" style={{ color: "#009432" }}>Đã xác nhận</h3>
                            <div className="status_item-per1__success">
                                <div className="information_container">
                                    <div className="address">
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#333",
                                                fontWeight: "700",
                                                marginLeft: "20px",
                                                marginTop: "25px",
                                            }}
                                        >
                                            Bạn đã xác nhận , gửi nhu yếu phẩm đến Sơn Tùng
                                        </p>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>

                {checkSeeDetailNotification}
                {checkSeeInforCartrip}
            </main>
        )

    }
}
export default withRouter(Notification_Sender);
