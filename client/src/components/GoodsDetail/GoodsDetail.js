import React, { Component } from "react";
import "./GoodsDetail.css";

class GoodsDetail extends Component {
  render() {
    return (
      <div>
        <div class="data-container">
          {/* <h3 class="data-container__title">Tôi muốn hỗ trợ :</h3> */}

          <ul class="data-container__ListItems">
            <li class="data-container__Items">
              Trứng: <h4 class="data-container__ItemQuantity">4 quả</h4>
            </li>
            <li class="data-container__Items">
              Gạo: <h4 class="data-container__ItemQuantity"> 2 bao</h4>{" "}
            </li>
            <li class="data-container__Items">
              Áo quần:<h4 class="data-container__ItemQuantity">3 bộ</h4>{" "}
            </li>
            <li class="data-container__Items">
              Tổng khối lượng:<h4 class="data-container__ItemQuantity">1kg</h4>{" "}
            </li>
          </ul>
          <ul class="data-container__ListInfo">
            <li class="container-info__item container-Info__title">
              Thông tin liên hệ:
            </li>
            <li class="container-info__item container-Info__Name">
              Số Điện Thoại:
            </li>
            9999
            <li class="container-info__item container-Info__Address">
              Địa chỉ:
            </li>
            92 Thi Sach , Quan Hai Chau , Da Nang
            <li class="container-info__item container-Info__Note">
              Mô tả hoàn cảnh / Ghi chú:{" "}
            </li>
            Chưa có người nhận hàng , hàng cần đi gấp
            <li class="container-info__item container-Info__Img">Hình Ảnh </li>
          </ul>
        </div>
        <div class="container-btn__ListBottom">
          <button  class="data-btn-back" onClick={()=> this.props.showGoodsDetail()}>
            <i class="fas fa-chevron-left data-icon-back"></i> Quay lại
          </button>
         
          <button class="dataContainer-btn-item data-btn__Del">Xóa</button>
          
          <button class="dataContainer-btn-item data-btn__Update">
            Cập nhật
          </button>
        </div>
      </div>
    );
  }
}
export default GoodsDetail;
