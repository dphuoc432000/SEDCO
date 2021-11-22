import React, { Component } from "react";
import "./Management_Quantity.css";
class Management_Quantity extends Component {
  render() {
    return (
      <div id="management_Quantity_wrapped">
        <h2>Quản lý số lượng</h2>

        <table id="manage_quantity">
          <tr>
            <th>Nhu yếu</th>
            <th>Đơn vị</th>
            <th>Số lượng còn lại</th>
          </tr>
          <tr>
            <td>Mỳ gói</td>
            <td>12</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Khẩu trang</td>
            <td>12</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Quần áo</td>
            <td>12</td>
            <td>12</td>
          </tr>

          <tr>
            <td>Sữa</td>
            <td>12</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Trứng</td>
            <td>12</td>
            <td>12</td>
          </tr>

          <tr>
            <td>Rau củ</td>
            <td>12</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Tổng khối lượng</td>
            <td>12</td>
            <td>12</td>
          </tr>
        </table>
      </div>
    );
  }
}
export default Management_Quantity;
