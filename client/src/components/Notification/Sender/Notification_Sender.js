import React, { Component } from "react";
import { withRouter } from "react-router";
import Notification_item from "./Notification_item";
import Notification_content from "./Notification_content";
import "./notification_sender.css";
import "../../../styles/main.css";
class Notification_Sender extends Component {
    state = {
        seeNotificationDetail: false,
      };
      handleShowDetailNotification = () => {
        this.setState({
          seeNotificationDetail: !this.state.seeNotificationDetail,
        });
      };
     
  render()  {
    let { seeNotificationDetail } = this.state;
    const checkSeeDetailNotification =
            (
                seeNotificationDetail === true ? (
                    <Notification_content
                        
                    />
                ) : (
                ""
                )
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
                    <div className="wrapped-noti">
                        <h3 className="wrapped-noti__lable" style={{color : "red"}}>Chưa xác nhận</h3>
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
                                CX001 đã nhận nhu yếu phẩm từ bạn
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
                                    <button className="btn-notifi btn-notifi__confirm">
                                    Xác nhận
                                    </button>
                                </div>
                                <div>
                                    <button
                                    className="btn-notifi btn-notifi__seeInf"
                                    onClick={this.handleShowDetailNotification}
                                    >
                                    Xem thông tin
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="wrapped-noti">
                        <h3 className="wrapped-noti__lable" style={{color : "#009432"}}>Đã xác nhận</h3>
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
                                    Bạn đã xác nhận , nhận nhu yếu phẩm từ chuyến xe CX001
                                    </p>
                                </div>
                            </div>
                            
                                
                                
                        </div>
                    </div>
                   
                </div>
            </div>
            
            {checkSeeDetailNotification}
        </main>
    )
  
  }
}
export default withRouter(Notification_Sender);
