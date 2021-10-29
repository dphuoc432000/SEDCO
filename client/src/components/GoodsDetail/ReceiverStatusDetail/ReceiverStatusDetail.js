import React, { Component } from "react";
import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import ImgInfo from "../../../assets/images/logo.png";
import "../GoodsDetail.css";
import "./ReceiverStatusDetail.css";

class ReceiverStatusDetail extends Component {
  state = {
    showUpdateReceiverForm: false,
   
  };
  handleShowHideUpdateReceiver = () => {
    this.setState({
      showUpdateReceiverForm: !this.state.showUpdateReceiverForm,
    });
  };
  render() {
    let { showUpdateReceiverForm} = this.state;
    const checkUpdateReceiverForm =
      showUpdateReceiverForm === true ? (
        <UpdateReceiverForm
          exitModalUpdateReceiver={this.handleShowHideUpdateReceiver}
        />
      ) : (
        ""
      );
   
    return (
      <div>
        <div class="GoodDetail-container">
          {/* <h3 class="GoodDetail-container__title">Tôi muốn hỗ trợ :</h3> */}
          <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm </h3>
          <table className="List-Good-Detail">
            <tr>
              <td>Trứng</td>
              <td>4</td>
              <td> quả</td>
            </tr>
            <tr>
              <td>Gạo</td>
              <td>4 </td>
              <td>bao</td>
            </tr>
            <tr>
              <td>Rau củ</td>
              <td>6 </td>
              <td>thùng</td>
            </tr>
            <tr>
              <td>Gạo</td>
              <td>4</td>
              <td> bao</td>
            </tr>
            <tr>
              <td>Rau củ</td>
              <td>6 </td>
              <td>thùng</td>
            </tr>
            <tr>
              <td>Rau củ</td>
              <td>6 </td>
              <td>thùng</td>
            </tr>
            <tr>
              <td>Gạo</td>
              <td>4 </td>
              <td>bao</td>
            </tr>
            <tr>
              <td>Rau củ</td>
              <td>6 </td>
              <td>thùng </td>
            </tr>

            <tr>
              <td>Số người trong hộ trong hộ gia đình</td>
              <td>600</td>
              <td>Người</td>
            </tr>
          </table>
          <h3 className="data-container__title">Thông tin liên hệ</h3>
          <table className="List-Good-Detail">
            <tr>
              <td>Số điện thoại</td>
              <td>0776872642</td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>Vĩnh Điện, Điện Bàn, Quảng Nam</td>
            </tr>
            <tr>
              <td>Ghi chú</td>
              <td>Cần đi gấp nha then lol</td>
            </tr>
          </table>
          <div className="GoodDetail-Info-Img">
            <h3 className="GoodDetail-Info-Img__label>">Hình ảnh</h3>
            <img
              src={ImgInfo}
              alt="hình ảnh người dùng"
              className="GoodDetail-Info-Img__src"
            />
          </div>
        </div>

        <div className="container-btn__ListBottom">
          <button
            className="GoodDetail-btn-back"
            onClick={() => this.props.handleHideReceiverStatusDetail()}
          >
            <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
            lại
          </button>

          <button className="GoodDetailContainer-btn-item GoodDetail-btn__Del">
            Xóa
          </button>

          <button
            className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
            onClick={this.handleShowHideUpdateReceiver}
          >
            Cập nhật
          </button>
        </div>
        {checkUpdateReceiverForm}
        
      </div>
    );
  }
}

export default ReceiverStatusDetail;
