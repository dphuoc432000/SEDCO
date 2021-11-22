import React, { Component } from "react";
// import "./notification_item.css";
import Notification_content from "./Notification_content_receiver";
class Notification_item extends Component {
  state = {
    seeNotificationDetail: false,
  };
  handleShowDetailNotification = () => {
    this.setState({
      seeNotificationDetail: !this.state.seeNotificationDetail,
    });
  };
  render() {
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
        {/* {checkSeeDetailNotification} */}
      </div>
      
    );
  }
}

export default Notification_item;
