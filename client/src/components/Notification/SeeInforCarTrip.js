import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Sender/notification_content.css";
import CircleIcon from "@mui/icons-material/Circle";


class SeeInforCarTrip extends Component {
  render() {
    return (
      <div className="content_container">
        <div className="title">
          <h2>Chi tiết</h2>
        </div>
        <div className="content">
          <div className="status_infor_container">
            <div className="per_infor">
              <span className="username">
                <h2>Nguen Phuong Hang</h2>
              </span>
              <span className="status" style={{ color: "#009432" }}>
                <CircleIcon />
                <p>Đang vận chuyển</p>
              </span>
              <span className="time">
                <p style={{ color: "red" }}>Báo cáo sai phạm</p>
              </span>
            </div>
            
            <div className="contact_infor">
              <h4>Thông tin liên hệ</h4>
              <table className="contact_content">
                <tr>
                  <td>Biển số: </td>
                  <td>93d1 22032</td>
                </tr>
                <tr>
                  <td>Loại xe: </td>
                  <td> Thi Sách Đà Nẵng</td>
                </tr>
                <tr>
                  <td>Trọng tải: </td>
                  <td>92 tấn</td>
                </tr>
                <tr>
                  <td>Số người: </td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>Số điện thoại: </td>
                  <td>09616224649</td>
                </tr>
                <tr>
                  <td>Địa chỉ: </td>
                  <td>Thi Sách Đà Nẵng</td>
                </tr>
                <tr>
                  <td>Bắt đầu nhận hàng : </td>
                  <td>00/00/2021</td>
                </tr>
                <tr>
                  <td>Bắt đầu khởi hành : </td>
                  <td>00/00/2021</td>
                </tr>
                <tr>
                  <td>Địa điểm khởi hành : </td>
                  <td>aaaaaaaaaaaaaaaaaaa</td>
                </tr>
                <tr>
                  <td>Địa điểm đến : </td>
                  <td>aaaaaaaaaaaaaaaaaaa</td>
                </tr>
              </table>
            </div>
            <div className="note_infor">
              <h4>Ghi chú</h4>
              <p className="note_content">ádasifyauiyfiasas</p>
            </div>
            <div className="picture_infor">
              <h4>Hình ảnh</h4>
              <div className="img_content">
                <img src="https://via.placeholder.com/150" alt="" />
              </div>
            </div>
          </div>
          <div className="btn_container" style={{ display: "flex" }}>
            <div>
              <button className="btn-notifi_detail btn_detail-chat">
                Nhắn tin
              </button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
export default SeeInforCarTrip;