import React, { Component } from "react";
import "./RecentItem.css";

class RecentItem extends Component {
  render() {
    return (
      
      <div  className="data-container-ListRecent--ITEMS">
        <div className="data-ListRecent__item">
          <div className="ListRecent__item-Left">
            <h3 className="ListRecent__item ListRecent__item-Left-Name">
              Phạm Minh Hiếu
            </h3>
            <h4 className="ListRecent__item ListRecent__item-Left-Address">
              Điện Bàn , Quang Nam
            </h4>
          </div>
          <div className="ListRecent__item-Right">
            <h3 className="ListRecent__item ListRecent__item-Right-Time">
              12/09 12:30
            </h3>
            <h3 className="ListRecent__item ListRecent__item-Right-STT">
              Đang chờ hỗ trợ
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
export default RecentItem;
