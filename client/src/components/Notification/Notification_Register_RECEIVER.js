import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Sender/notification_content.css";
import CircleIcon from "@mui/icons-material/Circle";
import {API_IMAGE_URL} from '../../constants/api'

class Notification_Register_RECEIVER extends Component {
   
  render() {
    console.log(this.props.history_data , this.props.car_infor_data_regis);
    const name = this.props.car_infor_data_regis.user.full_name;
    const bienso = this.props.car_infor_data_regis.status.detail.car.license_plate;
    const trongtai = this.props.car_infor_data_regis.status.detail.car.tonnage;
    const ngaynhan = this.props.car_infor_data_regis.status.detail.start_receive_time;
    const ngaykh = this.props.car_infor_data_regis.status.detail.departure_time;
    const diemkh = this.props.car_infor_data_regis.status.detail.location_start;
    const diemden = this.props.car_infor_data_regis.status.detail.location_finish;
    const note =  this.props.car_infor_data_regis.status.detail.note;
    const loaixe = this.props.car_infor_data_regis.status.detail.car.type_car;
    const songuoi = this.props.car_infor_data_regis.status.detail.car.many_people;
    const sdt = this.props.car_infor_data_regis.user.phone_number;
    const diachi = this.props.car_infor_data_regis.user.address;
    const picture = this.props.car_infor_data_regis.status.detail.picture;

    const todate_start_receive = new Date(ngaynhan).getDate();
    const tomonth_start_receive =
      new Date(ngaynhan).getMonth() + 1;
    const toyear_start_receive = new Date(
        ngaynhan
    ).getFullYear();
    const original_start_receive_time =
      tomonth_start_receive +
      "/" +
      todate_start_receive +
      "/" +
      toyear_start_receive;

    const todate_departure_time = new Date(ngaykh).getDate();
    const tomonth_departure_time =
      new Date(ngaykh).getMonth() + 1;
    const toyear_departure_time = new Date(ngaykh).getFullYear();
    const original_departure_time =
      tomonth_departure_time +
      "/" +
      todate_departure_time +
      "/" +
      toyear_departure_time;
    return (
      <div className="content_container">
        <div className="title">
          <h2>Chi tiết</h2>
        </div>
        <div className="content">
          <div className="status_infor_container">
            <div className="per_infor">
              <span className="username">
                <h2>{name}</h2>
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
                  <td>{bienso}</td>
                </tr>
                <tr>
                  <td>Loại xe: </td>
                  <td>{loaixe}</td>
                </tr>
                <tr>
                  <td>Trọng tải: </td>
                  <td>{trongtai}</td>
                </tr>
                <tr>
                  <td>Số người: </td>
                  <td>{songuoi}</td>
                </tr>
                <tr>
                  <td>Số điện thoại: </td>
                  <td>{sdt}</td>
                </tr>
                <tr>
                  <td>Địa chỉ: </td>
                  <td>{diachi}</td>
                </tr>
                <tr>
                  <td>Bắt đầu nhận hàng : </td>
                  <td>{original_start_receive_time}</td>
                </tr>
                <tr>
                  <td>Bắt đầu khởi hành : </td>
                  <td>{original_departure_time}</td>
                </tr>
                <tr>
                  <td>Địa điểm khởi hành : </td>
                  <td>{diemkh}</td>
                </tr>
                <tr>
                  <td>Địa điểm đến : </td>
                  <td>{diemden}</td>
                </tr>
              </table>
            </div>
            <div className="note_infor">
              <h4>Ghi chú</h4>
              <p className="note_content">{note}</p>
            </div>
            <div className="picture_infor">
              <h4>Hình ảnh</h4>
              <div className="img_content">
                <img src={`${API_IMAGE_URL}/${picture}`} alt="" />
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
export default Notification_Register_RECEIVER;