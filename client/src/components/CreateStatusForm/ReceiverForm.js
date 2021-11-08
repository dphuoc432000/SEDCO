import React, { Component } from "react";
import "./ReceiverForm.css";
import { connect } from "react-redux";

import receiverFormCreate from "../../stores/actions/receiverForm.action";

import getEssentials from "./../../stores/actions/essentials.action";

class ReceiverForm extends Component {
  // const essentials = await this.props.essentialsReducer.essentials;
  constructor(props) {
    super(props);
    
    this.state = {
      essentials : {},
      number_per_of_family : 0,
      note : ""
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
      return object[`${essential.name}`]
    })
    this.setState({
      essentials: {
        ...object,
      },
    });
  };
  handleOnchange = (event) => {
      const name = event.target.name
      const value = event.target.value;
      console.log(name, value);
      this.setState({
        essentials: {
          ...this.state.essentials,
          [name] : {
            ...this.state.essentials[name],
            quantity : parseInt(value)
          }
        },
        
      })
      
  };
  handlechange = (event) => {
    const name = event.target.name
      const value = event.target.value;
      console.log(name, value);
      this.setState({
        [name] : value

      })
} 
  submitFormReceiver = async () => {
    // await this.props.
    
    console.log(await this.props.receiverFormCreate(this.props.account_id,this.state))
  };
  render() {
    // console.log("check >>>", this.props.essentialsRedux);
    // // let {  } = this.state;
    // let essentitalsReact = this.props.essentialsRedux;
   
    let essentials = this.props.essentialsReducer.essentials;
    console.log("check", this.state);

    return (
      <div className="Modal-Reveiver__CreatStatus ">
        <div className="Modal-overlay"></div>
        <div className="Modal-body">
          <div className="receiver-form js-receiver-form">
            <button
              className="back js-btn-ReceiverBack"
              onClick={() => this.props.exitModalReceiverForm()}
            >
              X
            </button>
            <div className="content">
              <p className="heading">Bạn cần hỗ trợ</p>
              <p className="heading-2">
                (Chỉ nhận giúp đở khi thật sự cần vì còn nhiều người khó khăn
                hơn)
              </p>
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
                        {console.log(this.state.essentials[`${essential.name}`])}
                        <p className="unit">{essential.unit}</p>
                      </div>
                    </div>
                  );
                })}

                <p className="heading-3 total">Thông tin khác</p>

                <h3 className="input-title">Số người trong gia đình</h3>
               
                  <div className="input-item">
                    <input
                      type="number"
                      placeholder="0"
                      className="input-item1"
                      name='number_per_of_family'
                      value={this.state.number_per_of_family}
                      onChange={(event) => this.handlechange(event)}
                    />
                    <p className="unit">Người</p>
                  </div>
                

                <h3 className="input-title">Mô tả hoàn cảnh/ ghi chú</h3>
               
                  <input
                    type="text"
                    className="GhiChu"
                    name='note'
                    value={this.state.note}
                    onChange={(event) => this.handlechange(event)}
                  />
                

                <h3 className="input-title">Hình ảnh</h3>

                <button className="button-addIMG">Thêm hình ảnh</button>
              </form>
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
                onClick={() => this.submitFormReceiver()}
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
    // receiverFormReducer : state.receiverFormReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentials: async () => {
      const action = await getEssentials();
      return dispatch(action);
    },
    //* payload là (đầu vào) của hàm CreateReceiverRedux : (đầu vào)
    receiverFormCreate: async (account_id , receiver_status_data) => {
      const action = await receiverFormCreate(account_id , receiver_status_data);
      return dispatch(action);
    }
      
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReceiverForm);
