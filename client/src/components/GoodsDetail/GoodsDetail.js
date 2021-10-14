import React, { Component } from "react";
import "./GoodsDetail.css";
import UpdateReceiverForm from '../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm'
import UpdateSenderForm from '../CreateStatusForm/UpdateStatusForm/UpdateSenderForm'
class GoodsDetail extends Component {
  state = {
    
    showUpdateReceiverForm : false,
    showUpdateSenderForm  : false,
  };
  
  handleShowHideUpdateReceiver = () => { 
    this.setState({showUpdateReceiverForm: !this.state.showUpdateReceiverForm})
  }
  handleShowHideUpdateSender = () => { 
    this.setState({showUpdateSenderForm: !this.state.showUpdateSenderForm})
  }
  render() {
    let {  showUpdateReceiverForm , showUpdateSenderForm} = this.state;
    const checkUpdateReceiverForm = showUpdateReceiverForm === true ? <UpdateReceiverForm exitModalUpdateReceiver={this.handleShowHideUpdateReceiver}/>  : '';
    const checkUpdateSenderForm = showUpdateSenderForm === true ? <UpdateSenderForm exitModalUpdateSender={this.handleShowHideUpdateSender}/>  : '';
    return (
      <div>
        <div class="GoodDetail-container">
          {/* <h3 class="GoodDetail-container__title">Tôi muốn hỗ trợ :</h3> */}

          <table id="Goods-Detail-Table">
            <tr>
              <th>Nhu yếu phẩm</th>
              <th>Số lượng</th>
              <th>đơn vị</th>
            </tr>
            <tr>
              <td>Trứng</td>
              <td>5</td>
              <td>Cái</td>
            </tr>
            <tr>
              <td>Gạo</td>
              <td>20</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>Mỳ tôm</td>
              <td>2</td>
              <td>Thùng</td>
            </tr>
            <tr>
              <td>Khẩu trang</td>
              <td>20</td>
              <td>Cái</td>
            </tr>
            <tr>
              <td>Tổng khối lượng</td>
              <td>200</td>
              <td>Kg</td>
            </tr>
          </table>
          <ul class="GoodDetail-container__ListInfo">
            <li class="GoodDetail-Info__item GoodDetail-Info__title">
              Thông tin liên hệ:
            </li>
            <li class="GoodDetail-Info__item GoodDetail-Info__Name">
              Số Điện Thoại:
            </li>
            9999
            <li class="GoodDetail-Info__item GoodDetail-Info__Address">
              Địa chỉ:
            </li>
            92 Thi Sach , Quan Hai Chau , Da Nang
            <li class="GoodDetail-Info__item GoodDetail-Info__Note">
              Mô tả hoàn cảnh / Ghi chú:{" "}
            </li>
            Chưa có người nhận hàng , hàng cần đi gấp

            <li class="GoodDetail-Info__item GoodDetail-Info__Img">Hình Ảnh </li>
            <img src="../../assets/images/logo.png" alt="Hi " />
          </ul>
        </div>
        <div class="container-btn__ListBottom">
          <button
            class="GoodDetail-btn-back"
            onClick={() => this.props.showGoodsDetail()}
          >
            <i class="fas fa-chevron-left GoodDetail-icon-back"></i> Quay lại
          </button>

          <button class="GoodDetailContainer-btn-item GoodDetail-btn__Del">Xóa</button>

          <button class="GoodDetailContainer-btn-item GoodDetail-btn__Update" onClick={this.handleShowHideUpdateReceiver}>
            Cập nhật
          </button>
        </div>
        {checkUpdateReceiverForm}
        {checkUpdateSenderForm}
      </div>
    );
  }
}
export default GoodsDetail;
