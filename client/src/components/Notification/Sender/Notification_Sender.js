import React, { Component } from "react";
import { withRouter } from "react-router";
import Notification_item from "./Notification_item";
import Notification_sender_no_confirm from "./Notification_sender_no_confirm";
import "./notification_sender.css";
import "../../../styles/main.css";
import Notification_Register_SENDER from '../Notification_Register_SENDER';
import { get_notification_register_of_sender } from '../../../stores/actions/sender_status.action';
import { get_notification_not_confirm_of_sender } from '../../../stores/actions/sender_status.action';
import { get_notications_both_confirm_transaction_of_sender } from '../../../stores/actions/sender_status.action';
import Notification_sender_after_comfirm from './Notification_sender_after_confirm'
import { connect } from 'react-redux'
class Notification_Sender extends Component {
  state = {
    seeNotificationDetail: false,
    seeInforCartrip: false,
    notification_cartrip_regis_list: [],
    notification_cartrip_not_confirm_list: [],
    history_data: {},
    car_infor_data: {},
    notification_both_confirm_of_sender: [],
    seeDetailNotiAfterConfirm: false,

  };
  componentDidMount = async () => {
    console.log(this)
    if (Object.keys(this.props.status_current).length > 0) {
      const status_current = this.props.status_current;
      await this.props.get_notification_register_of_sender(status_current.detail._id);
      await this.props.get_notification_not_confirm_of_sender(status_current.detail._id);
      await this.props.get_notications_both_confirm_transaction_of_sender(status_current.detail._id)

      console.log(this.props.sender_statusReducer.notification_cartrip_not_confirm_list);
      console.log('tb ca 2 xac nhan', this.props.sender_statusReducer.notification_both_confirm_of_sender);
      this.setState({
        notification_cartrip_regis_list: this.props.sender_statusReducer.notification_cartrip_regis_list,
        notification_cartrip_not_confirm_list: this.props.sender_statusReducer.notification_cartrip_not_confirm_list,
        notification_both_confirm_of_sender: this.props.sender_statusReducer.notification_both_confirm_of_sender,
      })
    }
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.status_current !== prevProps.status_current) {
      console.log('vao')
      const status_current = this.props.status_current;
      console.log(status_current)
      await this.props.get_notification_register_of_sender(status_current.detail._id);
      await this.props.get_notification_not_confirm_of_sender(status_current.detail._id);
      this.setState({
        notification_cartrip_regis_list: this.props.sender_statusReducer.notification_cartrip_regis_list,
        notification_not_confirm_of_sender: this.props.sender_statusReducer.notification_cartrip_not_confirm_list,
        notification_both_confirm_of_sender: this.props.sender_statusReducer.notification_both_confirm_of_sender,

      })
    }
  }
  handleShowDetailNotification = (history_data, car_infor_data) => {
    this.setState({
      seeNotificationDetail: true,
      seeInforCartrip: false,
      seeDetailNotiAfterConfirm: false,
      history_data: history_data,
      car_infor_data: car_infor_data,
    });
  };
  handleShowSeeInforCartrip = (history_data, car_infor_data) => {
    this.setState({
      seeInforCartrip: true,
      seeNotificationDetail: false,
      seeDetailNotiAfterConfirm: false,
      history_data: history_data,
      car_infor_data: car_infor_data,
    })
  }
  handleUpdateNotifiWhenConfirm = async (notification_both_confirm_of_sender, notification_cartrip_not_confirm_list_sender) => {

    await this.props.get_notications_both_confirm_transaction_of_sender(this.props.status_current.detail._id);
    await this.props.get_notification_not_confirm_of_sender(this.props.status_current.detail._id);

    const notification_both_confirm_of_sender_data = await this.props.sender_statusReducer.notification_both_confirm_of_sender;
    const notification_not_confirm_of_sender_data = await this.props.sender_statusReducer.notification_cartrip_not_confirm_list;
    this.setState({
      notification_both_confirm_of_sender: notification_both_confirm_of_sender_data,
      notification_cartrip_not_confirm_list: notification_not_confirm_of_sender_data,
      seeNotificationDetail: false,
    })

  }
  handleShowNotiAfterConfirm = (history_data, car_infor_data) => {
    this.setState({
      seeDetailNotiAfterConfirm: true,
      seeInforCartrip: false,
      seeNotificationDetail: false,
      history_data: history_data,
      car_infor_data: car_infor_data,
    })
  }
  render() {
    let { seeDetailNotiAfterConfirm, notification_cartrip_regis_list, seeNotificationDetail, seeInforCartrip, notification_cartrip_not_confirm_list, notification_both_confirm_of_sender } = this.state;


    const checkSeeDetailNotification =
      (
        seeNotificationDetail === true ? (
          <Notification_sender_no_confirm
            history_data={this.state.history_data}
            car_infor_data={this.state.car_infor_data}
            status_current={this.props.status_current}
            handleUpdateNotifiWhenConfirm={this.handleUpdateNotifiWhenConfirm}
          />
        ) : (
          ""
        )
      )
    const checkDetailNotiAfterConfirm = seeDetailNotiAfterConfirm === true ?
      <Notification_sender_after_comfirm
        history_data={this.state.history_data}
        car_infor_data={this.state.car_infor_data}
        status_current={this.props.status_current} /> : ""
    const checkSeeInforCartrip =
      (
        seeInforCartrip === true ? (
          <Notification_Register_SENDER
            history_data={this.state.history_data}
            car_infor_data={this.state.car_infor_data}
            status_current={this.props.status_current}
          />
        ) : ("")
      )
    return (
      <main className="Main">
        <div className="status_content_container_sender">
          <div className="status_content">
            <div className="status_item">
              <h3
                style={{
                  fontSize: "19.32px",
                  fontWeight: "600",
                  lineHeight: "20.608px",
                }}
              >
                Thông báo
              </h3>
            </div>
            <div className="wrapped-noti" >
              <h3 className="wrapped-noti__lable" >Chung</h3>
              {notification_cartrip_regis_list ?
                notification_cartrip_regis_list.map(history => {
                  const history_data = history.history;
                  const car_infor_data = history.car_infor;
                  // console.log(history_data )
                  // console.log(car_infor_data)
                  return (
                    <div className="status_item-per1">
                      <div className="information_container">
                        <div className="address">
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#333",
                              fontWeight: "600",
                              marginLeft: "20px",
                              marginTop: "12px",
                            }}
                          >
                            {`${car_infor_data.user.full_name} đã đăng ký nhận nhu yếu phẩm của bạn`}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "25px",
                          justifyContent: "flex-end",
                        }}
                      >

                        <div>
                          <button
                            className="btn-notifi btn-notifi__seeInf"
                            onClick={() => { this.handleShowSeeInforCartrip(history_data, car_infor_data) }}
                          >
                            Thông tin chuyến xe
                          </button>
                        </div>
                      </div>
                    </div>)
                })

                : (<p
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginTop: "12px",
                  }}
                >
                  Không có thông báo
                </p>)
              }

            </div >
            <div className="wrapped-noti">
              <h3 className="wrapped-noti__lable" style={{ color: "red" }}>Chưa xác nhận</h3>
              {notification_cartrip_not_confirm_list && notification_cartrip_not_confirm_list.map(history => {
                const history_data = history.history;
                const car_infor_data = history.car_infor;
                return (
                  <div className="status_item-per1">
                    <div className="information_container">
                      <div className="address">
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#333",
                            fontWeight: "600",
                            marginLeft: "20px",
                            marginTop: "12px",
                          }}
                        >
                          {`${car_infor_data.user.full_name} đã xác nhận , nhận nhu yếu phẩm của bạn`}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "25px",
                        justifyContent: "flex-end",
                      }}
                    >

                      <div>
                        <button
                          className="btn-notifi btn-notifi__seeInf"
                          onClick={() => { this.handleShowDetailNotification(history_data, car_infor_data) }}
                        >
                          Xem thông tin
                        </button>
                      </div>
                    </div>
                  </div>
                )

              })}

            </div>

            <div className="wrapped-noti">
              <h3 className="wrapped-noti__lable" style={{ color: "#009432" }}>Đã xác nhận</h3>
              {notification_both_confirm_of_sender ? notification_both_confirm_of_sender.map(history => {
                const history_data = history.history;
                const car_infor_data = history.car_infor;
                return (
                  <div className="status_item-per1__success">
                    <div className="information_container">
                      <div className="address">
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#333",
                            fontWeight: "600",
                            marginLeft: "20px",
                            marginTop: "25px",
                          }}
                        >
                          {`Bạn đã xác nhận , gửi nhu yếu phẩm đến ${car_infor_data.user.full_name}`}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "25px",
                        justifyContent: "flex-end",
                      }}
                    >

                      <div>
                        <button
                          className="btn-notifi btn-notifi__seeInf"
                          onClick={() => { this.handleShowNotiAfterConfirm(history_data, car_infor_data) }}
                        >
                          Xem thông tin
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }) :
                (<p
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginTop: "12px",
                  }}
                >
                  Không có thông báo
                </p>)
              }

            </div>

          </div>
        </div>

        {checkSeeDetailNotification}
        {checkSeeInforCartrip}
        {checkDetailNotiAfterConfirm}
      </main>
    )

  }
}
const mapStateToProps = (state) => {
  return {
    sender_statusReducer: state.sender_statusReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_notification_register_of_sender: async (sender_status_id) => {
      const action = await get_notification_register_of_sender(sender_status_id);
      return dispatch(action);
    },
    get_notification_not_confirm_of_sender: async (sender_status_id) => {
      const action = await get_notification_not_confirm_of_sender(sender_status_id);
      return dispatch(action);
    },
    get_notications_both_confirm_transaction_of_sender: async (sender_status_id) => {
      const action = await get_notications_both_confirm_transaction_of_sender(sender_status_id);
      return dispatch(action);
    },

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification_Sender));
