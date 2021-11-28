import React, { Component } from "react";
import CarTripDetail from "../CarTripDetail/CarTripDetail";
import { connect } from "react-redux";

class TTChuyenXe extends Component {
  state = {
    showCarTripDetail: false,
    showUpdateCarTripForm: false,
    start_receive_time: this.props.status_current.detail.start_receive_time,
    departure_time: this.props.status_current.detail.departure_time,
    location_start: this.props.status_current.detail.location_start,
    location_finish: this.props.status_current.detail.location_finish,
    update_form: true
  };
  componentDidUpdate = async (prevProps) =>{
    if(this.props.status_current !== prevProps.status_current){
      this.setState({
        start_receive_time: this.props.status_current.detail.start_receive_time,
        departure_time: this.props.status_current.detail.departure_time,
        location_start: this.props.status_current.detail.location_start,
        location_finish: this.props.status_current.detail.location_finish,
      })
    }
  }
  handleShowHideCarTripDetail = () => {
    this.setState({ showCarTripDetail: !this.state.showCarTripDetail });
  };
  handleShowHideUpdateCarTrip = () => {
    this.setState({
      showUpdateCarTripForm: !this.state.showUpdateCarTripForm,
    });
  };
  handleUpdateCarTrips = (
    start_receive_time,
    departure_time,
    location_start,
    location_finish
  ) => {
    this.setState({
      start_receive_time: start_receive_time,
      departure_time: departure_time,
      location_start: location_start,
      location_finish: location_finish,
    });
  };
  render() {
    const start_receive_time_state = this.state.start_receive_time;
    const departure_time_state = this.state.departure_time;
    const location_start_state = this.state.location_start;
    const location_finish_state = this.state.location_finish;

    const todate_start_receive = new Date(start_receive_time_state).getDate();
    const tomonth_start_receive =
      new Date(start_receive_time_state).getMonth() + 1;
    const toyear_start_receive = new Date(
      start_receive_time_state
    ).getFullYear();
    const original_start_receive_time =
      tomonth_start_receive +
      "/" +
      todate_start_receive +
      "/" +
      toyear_start_receive;

    const todate_departure_time = new Date(departure_time_state).getDate();
    const tomonth_departure_time =
      new Date(departure_time_state).getMonth() + 1;
    const toyear_departure_time = new Date(departure_time_state).getFullYear();
    const original_departure_time =
      tomonth_departure_time +
      "/" +
      todate_departure_time +
      "/" +
      toyear_departure_time;
    return (
      <React.Fragment>
        <div>
          {this.state.showCarTripDetail === false ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm </h3>{" "}
                <a
                  className="data-container__SeeDetail"
                  onClick={() => {
                    this.handleShowHideCarTripDetail();
                  }}
                >
                  xem chi tiết{" "}
                </a>
              </div>
              <table className="List-Good">
                <tr>
                  <td>Bắt đầu nhận hàng:</td>
                  <td>{original_start_receive_time}</td>
                </tr>
                <tr>
                  <td>Bắt đầu vận chuyển:</td>
                  <td>{original_departure_time}</td>
                </tr>
                <tr>
                  <td>Từ:</td>
                  <td>{location_start_state}</td>
                </tr>
                <tr>
                  <td>Đến:</td>
                  <td>{location_finish_state}</td>
                </tr>
              </table>
            </>
          ) : (
            <CarTripDetail
              user={this.props.user}
              handleShowHideCarTripDetail={this.handleShowHideCarTripDetail}
              status_current={this.props.status_current}
              status_current_current = {this.props.status_current}
              handleUpdateCarTrips={this.handleUpdateCarTrips}
              handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
              handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
              update_form={this.state.update_form}
              handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TTChuyenXe);
