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
    showReceiverForm : false,
    showSenderForm : false,
  }
  handleShowHideFormReceiver = () => {
    this.setState({
      showReceiverForm : !this.state.showReceiverForm
    })
  }
  handleShowHideFormSender = () => {
    this.setState({
      showSenderForm : !this.state.showSenderForm
    })
  }
  
  render() {
   const { showReceiverForm , showSenderForm} = this.state;
   const checkReceiverForm = showReceiverForm === true ? <ReceiverForm exitModalReceiverForm={this.handleShowHideFormReceiver}/> : '';
   const checkSenderForm =  showSenderForm === true ? <SenderForm exitModalSenderForm={this.handleShowHideFormSender}/> : '';
   return (
      <div className="Status">
        <div className="Status-Not-Role" style={{ display: "none" }}>
          <h2 className="Status-title">Tạo trạng thái</h2>
          <h3 className="Status-Who">Bạn là người</h3>
          <div className="Status-ListBTN">
            <button className="Status-BTN__item Status-BTN__Taixe">
              Vận chuyển
            </button>
            <button className="Status-BTN__item Status-BTN__Nguoicho" onClick={this.handleShowHideFormSender}>
              Hỗ trợ
            </button>
            <button className="Status-BTN__item Status-BTN__Nguoinhan" onClick={this.handleShowHideFormReceiver}>
              Cần hỗ trợ
            </button>
          </div>
        </div>
        {/* <RecentList /> */}
        <NguoiCho/>
        {checkReceiverForm}
        {checkSenderForm}
      </div>
    );
  }
}

export default Status;
