import React from "react";
import "./SeeDetailsSender_form.css"

export default class SeeDetailsSender_form extends React.Component {
  render() {
    return (
      <div className="Modal-Reveiver__CreatStatus">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="SeeDetailsReciever_form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.exitModalSeeDetailsSender_form()}
            >
              X
            </button>
            <table id="table_details">
              <tr>
                <th>Nhu yếu phẩm</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
                <th>Cho</th>
              </tr>
              <tr>
                <td>Thực Phẩm</td>
                <td>Kg</td>
                <td>10Kg</td>
                <td>Tứ</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
