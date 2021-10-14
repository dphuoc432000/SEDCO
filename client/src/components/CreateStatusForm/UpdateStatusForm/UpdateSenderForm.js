import React, { Component } from "react";

class UpdateSenderForm extends Component {
  render() {
    return (
      <div className="Modal-Sender__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.exitModalUpdateSender()}
            >
              X
            </button>
            <div className="content">
              <p className="heading">Cập nhật hỗ trợ</p>
            </div>
            <div className="input-1">
              <form action="#">
                <p className="heading-3 total">Nhu yếu phẩm</p>
                <h3 className="input-title">Khẩu trang</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Cái</p>
                </div>
                <h3 className="input-title">Quần áo</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Cái</p>
                </div>
                <h3 className="input-title">Gạo</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Kg</p>
                </div>
                <h3 className="input-title">Mỳ gói</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Thùng</p>
                </div>
                <h3 className="input-title">Sữa</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Lốc</p>
                </div>
                <h3 className="input-title">Trứng</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Quả</p>
                </div>
                <h3 className="input-title">Rau củ</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Kg</p>
                </div>

                <p className="heading-3 total">Thông tin khác</p>

                <h3 className="input-title">Số người trong gia đình</h3>
                <div className="input-item">
                  <input type="number" placeholder="0" />
                  <p className="unit">Người</p>
                </div>

                <h3 className="input-title">Mô tả hoàn cảnh/ ghi chú</h3>
                <input type="text" className="GhiChu" />

                <h3 className="input-title">Hình ảnh</h3>

                <button className="button-addIMG">Thêm hình ảnh</button>
              </form>
            </div>
            <div style={{textAlign:'center',marginTop:'40px',marginBottom:'30px'}}>
              <p className="heading-2">Chúng tôi cảm ơn bạn rất nhiều</p>
              <p className="heading-2">
                Cùng chung tay hỗ trợ những hoàn cảnh khó khăn
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "35px" ,marginBottom:'30px'}}>
              <button className="button-2">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateSenderForm;
