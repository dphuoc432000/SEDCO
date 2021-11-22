import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./notification_content_receiver.css";
import CircleIcon from "@mui/icons-material/Circle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class Notification_content_receiver extends Component {
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
                <h2>CX002</h2>
              </span>
              <span className="status" style={{ color: "#009432" }}>
                <CircleIcon />
                <p>Đang vận chuyển</p>
              </span>
              <span className="time">
                <p style={{ color: "red" }}>Báo cáo sai phạm</p>
              </span>
            </div>
            <div className="essentials_infor">
              <h4>Đã nhận</h4>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "12px" }} align="left">
                        Nhu yếu
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        Đơn vị
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        Số lượng
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        Hỗ trợ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                    // key={row.name}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        style={{ fontSize: "12px" }}
                        component="th"
                        scope="row"
                      >
                        Trứng
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        c
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        1
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }} align="center">
                        1
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
            <div>
              <button className="btn-notifi_detail btn_detail-confirm">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Notification_content_receiver;
