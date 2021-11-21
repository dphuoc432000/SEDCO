import React, { Component } from "react";
import { withRouter } from "react-router";
import "../notification.css";
class Notification_Receiver extends Component {
  render() {
    return (
      <div className="header__notify">
        <div className="notify-Comfirm">
          <h3 className="notify-Comfirm-title">Thông báo xác nhận</h3>
          <div>
            <h4 className="notify-Comfirm-item">
              CX01 xác nhận đã hỗ trợ nhu yếu phẩm đến bạn. Vui lòng xác nhận.
              Vui lòng xác nhận.{"{"}" "{"}"}
              <h3 href className="notify-Comfirm-item-link">
                Bấm vào đây để xác nhận
              </h3>
            </h4>
          </div>
        </div>
        <h3 className="notify-Comfirm-title">Thông báo vừa nhận</h3>
        <ul className="notify-ListRecent">
          <li className="notify-Recent-item">
            <a href className="notify-Recent-item">
              CX01 đã đăng ký nhận nhu yếu phẩm từ bạn.
            </a>
          </li>
          <li className="notify-Recent-item">
            <h3 href className="notify-Recent-item">
              CX01 đã đăng ký nhận nhu yếu phẩm từ bạn.
            </h3>
          </li>
          <li className="notify-Recent-item">
            <h3 href className="notify-Recent-item">
              CX01 đã đăng ký nhận nhu yếu phẩm từ bạn.
            </h3>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Notification_Receiver);
