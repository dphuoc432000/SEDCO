import React from "react";
import './StatusForStatus.css'
class StatusForStatus extends React.Component {
  render() {
    return (
      <div className="Status-header">
        <div className="Status-header__left">
          <div className="Status-headerID">
            <h3 className="Status-headerID--item Status-headerID--name">
              Tran Cong Tu
            </h3>
            <h4 className="Status-headerID--item Status-headerID--status">
              Đang chờ nhận
            </h4>
          </div>
        </div>
        <div className="Status-header__DateUpPost">
          <i className="Status-header__Date--title">Người hỗ trợ</i>
          <h3 className="Status-header__date">12/9/2021 12:30</h3>
        </div>
      </div>
    );
  }
}
export default StatusForStatus;