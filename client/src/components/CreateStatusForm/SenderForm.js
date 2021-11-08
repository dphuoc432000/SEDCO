import React, { Component } from "react";
// import './SenderForm.css'
import "./ReceiverForm.css";
import { connect } from "react-redux";
import senderFormCreate from "../../stores/actions/senderForm.action";

import getEssentials from "./../../stores/actions/essentials.action";
// import essentialsReducer from './../../stores/reducer/essentialsReducer';
class SenderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      essentials: {},
      note: "",
      weight_essential: 0,
    };
  }
  componentDidMount = async () => {
    await this.props.getEssentials();
    const essentials = await this.props.essentialsReducer.essentials;
    const object = {};
    essentials.map((essential) => {
      object[`${essential.code_name}`] = {
        essential_id: essential._id,
        quantity: 0,
      };
      return object[`${essential.name}`];
    });
    this.setState({
      essentials: {
        ...object,
      },
    });
  };
  handleOnchange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      essentials: {
        ...this.state.essentials,
        [name]: {
          ...this.state.essentials[name],
          quantity: parseInt(value),
          weight_essential: parseFloat(value),
        },
      },
    });
  };
  handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  submitFormSender = async () => {
    // await this.props.

    console.log(
      await this.props.senderFormCreate(this.props.account_id, this.state)
    );
  };
  render() {
    let essentials = this.props.essentialsReducer.essentials;
    console.log("check", this.state);

    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.exitModalSenderForm()}
            >
              X
            </button>
            <div className="content">
              <p className="heading">Bạn cần hỗ trợ</p>
            </div>
            <div className="input-1">
              <form action="#">
                <p className="heading-3 total">Nhu yếu phẩm</p>

                {essentials.map((essential) => {
                  return (
                    <div key={essential._id}>
                      <h3 className="input-title">{essential.name}</h3>
                      <div className="input-item">
                        <input
                          data-id={essential._id}
                          type="number"
                          placeholder="0"
                          className="input-item1"
                          name={essential.code_name}
                          // value={this.state.essentials[`${essential.code_name}`].quantity}
                          onChange={(event) => this.handleOnchange(event)}
                        />
                        {console.log(
                          this.state.essentials[`${essential.name}`]
                        )}
                        <p className="unit">{essential.unit}</p>
                      </div>
                    </div>
                  );
                })}

                <p className="heading-3 total">Thông tin khác</p>

                <h3 className="input-title">Tổng khối lượng</h3>

                <div className="input-item">
                  <input
                    type="number"
                    placeholder="0"
                    className="input-item1"
                    name="weight_essential"
                    value={this.state.weight_essential}
                    onChange={(event) => this.handlechange(event)}
                  />
                  <p className="unit">Kg</p>
                </div>

                <h3 className="input-title">Mô tả hoàn cảnh/ ghi chú</h3>

                <input
                  type="text"
                  className="GhiChu"
                  name="note"
                  value={this.state.note}
                  onChange={(event) => this.handlechange(event)}
                />

                <h3 className="input-title">Hình ảnh</h3>

                <button className="button-addIMG">Thêm hình ảnh</button>
              </form>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p className="heading-2">Chúng tôi cảm ơn bạn rất nhiều</p>
              <p className="heading-2">
                Cùng chung tay hỗ trợ những người khó khăn
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "35px",
                marginBottom: "30px",
              }}
            >
              <button
                className="button-2"
                onClick={() => this.submitFormSender()}
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    essentialsReducer: state.essentialsReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentials: async () => {
      const action = await getEssentials();
      return dispatch(action);
    },
    //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
    senderFormCreate: async (account_id, sender_status_data) => {
      const action = await senderFormCreate(account_id, sender_status_data);
      return dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SenderForm);
