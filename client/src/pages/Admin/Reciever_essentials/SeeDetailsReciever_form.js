import React from "react";
import "./SeeDetailsReciever_form.css"

export default class SeeDetailsReciever_form extends React.Component {
  render() {
    return (
      <div className="Modal-Reveiver__CreatStatus">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="SeeDetailsReciever_form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.exitModalSeeDetailsReciever_form()}
            >
              X
            </button>
            <table id="table_details">
              <tr>
                <th>Nhu yếu phẩm</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
                <th>nhận</th>
              </tr>
              <tr>
                <td>Y tế</td>
                <td>Cái</td>
                <td>3</td>
                <td></td>
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
              <tr>
                <td>Tổng khối lượng:</td>
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
