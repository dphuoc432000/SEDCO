import React, { Component } from "react";
import NguoiCho from "../../NguoiCho/NguoiCho";
import NguoiNhan from "../../NguoiNhan/NguoiNhan";

import RecentList from "../../GanDay/RecentList";
import "./Status.css";
class Status extends Component {
  render() {
    return (
      <div className="Status">
        <div className="Status-Not-Role" style={{display: "none"}}>
          <h2 className="Status-title">Tạo trạng thái</h2>
          <h3 className="Status-Who">Bạn là người</h3>
          <div className="Status-ListBTN">
            <button className="Status-BTN__item Status-BTN__Taixe">
              Vận chuyển
            </button>
            <button className="Status-BTN__item Status-BTN__Nguoicho">
              Hỗ trợ
            </button>
            <button className="Status-BTN__item Status-BTN__Nguoinhan">
              Cần hỗ trợ
            </button>
          </div>
        </div>
        {/* <RecentList/> */}
        <NguoiCho/>
      </div>
    );
  }
}

export default Status;