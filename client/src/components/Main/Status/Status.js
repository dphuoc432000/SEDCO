import React, { Component } from "react";
import NguoiCho from "../../NguoiCho/NguoiCho";
// import NguoiNhan from "../../NguoiNhan/NguoiNhan";
import SenderForm from "../../CreateStatusForm/SenderForm";
import ReceiverForm from "../../CreateStatusForm/ReceiverForm";
import RecentList from "../../GanDay/RecentList";
import "./Status.css";
// import {btnShowFormReceiver , btnExitFormReceiver , modalReceiverContainer , modalReceiver ,showModalReceiverForm , exitModalReceiverForm} from './HandleFormStatus'
class Status extends Component {
  state = {
    showReceiverForm: false,
    showSenderForm: false,
    showCarTripForm: false,
    showUserStatus: false,
    showSenderStatus: false,
    showReceiverStatus: false,
    showCarTripStatus: false,
  };
  handleShowHideFormReceiver = () => {
    this.setState({
      showReceiverForm: !this.state.showReceiverForm,
    });
  };
  handleShowHideFormSender = () => {
    this.setState({
      showSenderForm: !this.state.showSenderForm,
    });
  };
  
  getRoleName = () => {
    if(this.props.role_name.name){
      switch (this.props.role_name.name) {
        case "Người dùng":
          return "user";
        case "Người hỗ trợ":
          return "sender";
        case "Người cần hỗ trợ":
          return "receiver";
        case "Người vận chuyển":
          return "car_trip";
        default:
          return;
      }
    }
    else
      return "";
  };
  render() {
    const { showReceiverForm, showSenderForm } = this.state;
    const checkReceiverForm =
      showReceiverForm === true ? (
        <ReceiverForm exitModalReceiverForm={this.handleShowHideFormReceiver} account_id={this.props.account_id} />
      ) : (
        ""
      );
    const checkSenderForm =
      showSenderForm === true ? (
        <SenderForm exitModalSenderForm={this.handleShowHideFormSender} account_id={this.props.account_id} />
      ) : (
        ""
      );
      const getRoleName = this.getRoleName()
    return (
      <div className="Status">
        {getRoleName === 'user' || getRoleName ===""  ?
          <div className="Status-Not-Role">
            <h2 className="Status-title">Tạo trạng thái</h2>
            <h3 className="Status-Who">Bạn là người</h3>
            <div className="Status-ListBTN">
              <button className="Status-BTN__item Status-BTN__Taixe">
                Vận chuyển
              </button>
              <button
                className="Status-BTN__item Status-BTN__Nguoicho"
                onClick={this.handleShowHideFormSender}
              >
                Hỗ trợ
              </button>
              <button
                className="Status-BTN__item Status-BTN__Nguoinhan"
                onClick={this.handleShowHideFormReceiver}
              >
                Cần hỗ trợ
              </button>
            </div>
            <RecentList/>
          </div> : '' }
        {getRoleName === 'sender' ? <NguoiCho/> : ''}
        
        
        
        {checkReceiverForm}
        {checkSenderForm}
      </div>
    );
  }
}

export default Status;
