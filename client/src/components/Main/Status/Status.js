import React, { Component } from "react";
import NguoiCho from "../../NguoiCho/NguoiCho";
import NguoiNhan from "../../NguoiNhan/NguoiNhan";
import SenderForm from "../../CreateStatusForm/SenderForm";
import ReceiverForm from "../../CreateStatusForm/ReceiverForm";
import RecentList from "../../GanDay/RecentList";
import CarTripForm from '../../CreateStatusForm/CarTripForm'
import "./Status.css";
import _ from "lodash"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {getUserInforIsLogined} from "../../../stores/actions/userIsLogin.action"
import TaiXe from '../../Tai Xe/TaiXe'
// import {btnShowFormReceiver , btnExitFormReceiver , modalReceiverContainer , modalReceiver ,showModalReceiverForm , exitModalReceiverForm} from './HandleFormStatus'
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReceiverForm: false,
      showSenderForm: false,
      showCarTripForm: false,
      showUserStatus: false,
      showSenderStatus: false,
      showReceiverStatus: false,
      showCarTripStatus: false,
      account_id: this.props.account_id,
    };
  }
  


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
  handleShowHideFormCarTrip = () => {
    this.setState({
      showCarTripForm : !this.state.showCarTripForm,
    })
  }
  getRoleName = () => {
    if (this.props.role_name.name) {
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
    } else return "";
  };
  render() {
    const { showReceiverForm, showSenderForm , showCarTripForm} = this.state;
    const checkReceiverForm =
      showReceiverForm === true ? (
        <ReceiverForm
          exitModalReceiverForm={this.handleShowHideFormReceiver}
          account_id={this.props.account_id}
          handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
        />
      ) : (
        ""
      );
    const checkSenderForm =
      showSenderForm === true ? (
        <SenderForm
          exitModalSenderForm={this.handleShowHideFormSender}
          account_id={this.props.account_id}
          handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
        />
      ) : (
        ""
      );
    const checkCarTripForm = showCarTripForm === true ? (
      <CarTripForm
        exitModalCarTripForm={this.handleShowHideFormCarTrip}
        user={this.props.user}
        account_id={this.props.account_id}
        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
      />

    ) : ( "");
    const getRoleName = this.getRoleName();
    return (
      <div className="Status">
        {getRoleName === "user" || getRoleName === "" ? (
          <div className="Status-Not-Role">
            <h2 className="Status-title">Tạo trạng thái</h2>
            <h3 className="Status-Who">Bạn là người</h3>
            <div className="Status-ListBTN">
              <button className="Status-BTN__item Status-BTN__Taixe"
              onClick={this.handleShowHideFormCarTrip}
              >
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
          </div>
        ) : (
          ""
        )}
        {getRoleName === "receiver" ? <NguoiNhan  handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus} user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} roleName={this.props.role_name} appProps={this.props.role_name.color} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/> : ""}
        {getRoleName === "sender" ? <NguoiCho  handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus} user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} roleName={this.props.role_name} appProps={this.props.role_name.color} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/> : ""}
        {getRoleName === "car_trip" ? <TaiXe    handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus} user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} roleName={this.props.role_name} appProps={this.props.role_name.color} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/> : '' }
        <RecentList />

        {checkReceiverForm}
        {checkSenderForm}
        {checkCarTripForm}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userIsLoginReducer: state.userIsLoginReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInforIsLogined: async (account_id) => {
      const action = await getUserInforIsLogined(account_id);
      return dispatch(action);
    }
  };
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Status));
