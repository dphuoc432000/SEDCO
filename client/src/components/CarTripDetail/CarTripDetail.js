import React, { Component } from "react";
import "./CarTripDetail.css";
import "../GoodsDetail/GoodsDetail.css";
import ImgInfo from "../../assets/images/logo.png";
import ModalDeleteStatus from "../ModalDeleteStatus/ModalDeleteStatus";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UpdateCarTripForm from "../CreateStatusForm/UpdateStatusForm/UpdateCarTripForm";
import {API_IMAGE_URL} from '../../constants/api'
import {get_status_current_action} from '../../stores/actions/status_current.action'
class CarTripDetail extends Component {
    
        
    state = {
    showUpdateCarTripForm: false,
    showModalDelete: false,
    start_receive_time: this.props.status_current.detail.start_receive_time,
    departure_time: this.props.status_current.detail.departure_time,
    location_start: this.props.status_current.detail.location_start,
    location_finish: this.props.status_current.detail.location_finish,
    license_plate: this.props.status_current.detail.car.license_plate,
    many_people: this.props.status_current.detail.car.many_people,
    tonnage: this.props.status_current.detail.car.tonnage,
    type_car: this.props.status_current.detail.car.type_car,
    note: this.props.status_current.detail.note,
    status_current: this.props.status_current,
    picture : this.props.status_current.detail.picture,
  };
    
  
  componentDidUpdate = (prevProps) => {
    if (this.props.status_current !== prevProps.status_current) {
      this.setState({
        start_receive_time: this.props.status_current.detail.start_receive_time,
        departure_time: this.props.status_current.detail.departure_time,
        location_start: this.props.status_current.detail.location_start,
        location_finish: this.props.status_current.detail.location_finish,
        license_plate: this.props.status_current.detail.car.license_plate,
        many_people: this.props.status_current.detail.car.many_people,
        tonnage: this.props.status_current.detail.car.tonnage,
        type_car: this.props.status_current.detail.car.type_car,
        note: this.props.status_current.detail.note,
        picture : this.props.status_current.detail.picture,
        status_current: this.props.status_current,
      });
    }
  };

  handleShowHideUpdateCarTrip = () => {
    this.setState({
      showUpdateCarTripForm: !this.state.showUpdateCarTripForm,
    });
  };
  handleShowHideModalDelete = () => {
    this.setState({
      showModalDelete: !this.state.showModalDelete,
    });
  };
  handleUpdate = (  ) => {
    this.setState({
        // status_current : status_current , 
        // license_plate : license_plate ,
        // many_people : many_people ,
        // tonnage : tonnage , 
        // type_car : type_car , 
        // note : note ,
        status_current :  this.props.status_current,
   
    });
   
  };
 
  render() {
    let { showUpdateCarTripForm } = this.state;
    const user = this.props.user;

    const start_receive_time_state = this.state.start_receive_time;
    const departure_time_state = this.state.departure_time;
    const location_start_state = this.state.location_start;
    const location_finish_state = this.state.location_finish;
    const license_plate_state = this.state.license_plate;
    const many_people_state = this.state.many_people;
    const tonnage_state = this.state.tonnage;
    const type_car_state = this.state.type_car;
    const note_state = this.state.note;
    const picture_state = this.state.picture;
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

    const checkUpdateCarTripForm =
      showUpdateCarTripForm === true ? (
        <UpdateCarTripForm
          handleShowHideUpdateCarTrip={this.handleShowHideUpdateCarTrip}
          cartrip_status_id={this.props.status_current.detail._id}
          user={this.props.user}
          status_current={this.props.status_current}
          handleUpdate={this.handleUpdate}
          handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
        />
      ) : (
        ""
      );
    return (
      <div>
        <div class="GoodDetail-container">
          <h3 className="data-container__title">Thông tin chuyến xe</h3>
          <table className="List-Good-Detail">
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

          <h3 className="data-container__title">Thông tin chuyến xe</h3>
          <table className="List-Good-Detail">
            <tr>
              <td>Biển số:</td>
              <td>{license_plate_state}</td>
            </tr>
            <tr>
              <td>Loại xe:</td>
              <td>{type_car_state}</td>
            </tr>
            <tr>
              <td>Trọng tải:</td>
              <td>{tonnage_state}</td>
            </tr>
            <tr>
              <td>Số người:</td>
              <td>{many_people_state}</td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>{user.phone_number}</td>
            </tr>
            <tr>
              <td>Địa chỉ:</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td>Ghi chú</td>
              <td>{note_state}</td>
            </tr>
          </table>
          <div className="GoodDetail-Info-Img">
            <h3 className="data-container__title">Hình ảnh</h3>
            <img
              src={`${API_IMAGE_URL}/${picture_state}`}
              alt="hình ảnh tài xế"
              className="GoodDetail-Info-Img__src"

            />
          </div>
        </div>
        <div className="container-btn__ListBottom">
          <button
            className="GoodDetail-btn-back"
            onClick={() => this.props.handleShowHideCarTripDetail()}
          >
            <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
            lại
          </button>
          <div>
            <button
              className="GoodDetailContainer-btn-item GoodDetail-btn__Del"
              onClick={() => this.handleShowHideModalDelete()}
            >
              Xóa
            </button>

            <button
              className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
              onClick={this.handleShowHideUpdateCarTrip}
            >
              Cập nhật
            </button>
          </div>
        </div>
        {checkUpdateCarTripForm}
        {this.state.showModalDelete && (
          <ModalDeleteStatus
            showModalDelete={this.state.showModalDelete}
            handleShowHideModalDelete={this.handleShowHideModalDelete}
            status_id={this.props.status_current._id}
            handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
    //      get_status_current_action :  async (account_id) => {
    //         const action = await get_status_current_action(account_id);
    //         return dispatch(action);
    // }   
    }
   

};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CarTripDetail)
);
