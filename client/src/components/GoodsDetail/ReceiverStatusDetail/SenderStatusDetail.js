import React, { Component } from "react";
// import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import ImgInfo from "../../../assets/images/logo.png";
import "../GoodsDetail.css";
import "./ReceiverStatusDetail.css";
import { connect } from "react-redux";
import ModalDeleteStatus from "../../../components/ModalDeleteStatus/ModalDeleteStatus";
import { API_IMAGE_URL } from "../../../constants/api";
import getEssentialsDetail from '../../../stores/actions/essentialsDetail.action';
import {toast } from 'react-toastify';

class SenderStatusDetail extends Component {
  state = {
    showUpdateSenderForm: false,
    essentials: this.props.essentials,
    showModalDelete: false,
  };
  handleShowHideUpdateSender = () => {
    this.setState({
      showUpdateSenderForm: !this.state.showUpdateSenderForm,
    });
  };
  handleShowHideModalDelete = () => {
    this.setState({
      showModalDelete: !this.state.showModalDelete,
    });
  };
  componentDidMount = async () => {
    if (this.state.essentials.length > 0) {
      const essentials_map = await Promise.all(
        this.state.essentials.map(async (essential) => {
          const essential_detail = await this.getEssentialsDetail(
            essential.essential_id
          );
          return {
            ...essential,
            name: essential_detail.name,
            code_name: essential_detail.code_name,
            unit: essential_detail.unit,
          };
        })
      );
      this.setState({
        essentials: essentials_map,
      });
    }
  }
  componentDidUpdate = async (prevProps, prevState) =>{
    if(prevProps.status_current._id !== this.props.status_current._id){
      if(this.props.essentials.length > 0){
        const essentials_map =await Promise.all(this.props.essentials.map(async essential =>{
          const essential_detail = await this.getEssentialsDetail(essential.essential_id);
          return {
            ...essential,
            name: essential_detail.name,
            code_name: essential_detail.code_name,
            unit: essential_detail.unit,
          }
        }))
        this.setState({
          essentials: essentials_map
        })
      }
    }
  }
  handleShowHideUpdateSender = () => {
    this.setState({
      showUpdateSenderForm: !this.state.showUpdateSenderForm,
    });
  };
  getEssentialsDetail = async (essential_id) => {
    await this.props.getEssentialsDetail(essential_id);
    const essentialsDetail = await this.props.essentialsDetailReducer;
    // console.log(essentialsDetail)
    return essentialsDetail;
  };

  handleUpdateEssentials = (essentials) => {
    this.setState({
      essentials: essentials,
    });
    this.props.handleUpdateEssentials(essentials);
  };
  handleShowMessage = () =>{
		//Nếu chưa đăng nhập thì show form đăng nhập
		//ngược lại nếu đã đăng nhập thì hiện lên message
		if(this.props.isAuthenticated)
			alert("xử lý hiện lên message");
		else
			this.props.handleChangeShowFormLogin();
	}
  render() {
    console.log(this.props.essentials)
    const status_current = this.props.status_current;
    //status_current_current: status của người đang dùng đễ so sánh với status trên
    //nếu mã 2 cái status giống nhau thì hiện 3 nút quay lại, cập nhật và xóa
    //nếu mã 2 cái status khác nhau thì hiện 2 nút quay lại và nhắn tin
    const status_current_current = this.props.status_current_current;
    //role_name của người dùng hiện tại dùng để set nút đăng ký cho tài xế <- nếu là role car_trip
    const role_name_current = this.props.role_name_current;
    // const essentials = status_current.detail.essentials;
    const note = status_current.detail.note;
    const weight_essential = status_current.detail.weight_essential;
    const essentials_state = this.state.essentials;
    const picture = status_current.detail.picture;

    let { showUpdateSenderForm } = this.state;
    const checkUpdateSenderForm =
      showUpdateSenderForm === true ? (
        <UpdateSenderForm
          sender_status_id={this.props.status_current.detail._id}
          handleShowHideUpdateSender={this.handleShowHideUpdateSender}
          handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
          handleUpdateEssentials={this.handleUpdateEssentials}
          status_current={this.props.status_current}
        />
      ) : (
        ""
      );
    const user = this.props.user;
    return (
      <div>
        <div class="GoodDetail-container">
          {/* <h3 class="GoodDetail-container__title">Tôi muốn hỗ trợ :</h3> */}
          <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm </h3>

          <table className="List-Good-Detail">
            {essentials_state &&
              essentials_state.map((essential) => {
                return (
                  <React.Fragment>
                  {
                    essential.quantity > 0 &&
                    <tr key={essential.essential_id}>
                      <td>{essential.name}</td>
                      <td>{essential.quantity}</td>
                      <td>{essential.unit}</td>
                    </tr>
                  }
                  </React.Fragment>
                );
              })} 
            <tr>
              <td>Tổng khối lượng</td>
              <td>{weight_essential}</td>
              <td>Kg</td>
            </tr>
          </table>
          <h3 className="data-container__title">Thông tin liên hệ</h3>
          <table className="List-Good-Detail">
            <tr>
              <td>Số điện thoại</td>
              <td>{user.phone_number}</td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td>Ghi chú</td>
              <td>{note}</td>
            </tr>
          </table>
          <div className="GoodDetail-Info-Img">
            <h3 className="data-container__title">Hình ảnh</h3>
            <img
              src={`${API_IMAGE_URL}/${picture}`}
              alt={`Hình ảnh`}
              className="GoodDetail-Info-Img__src"
            />
          </div>
        </div>

        <div className="container-btn__ListBottom">

          {status_current._id === status_current_current._id ?
            <React.Fragment> 
              <button
                className="GoodDetail-btn-back"
                onClick={() => {
                  if( typeof this.props.handleHideSenderStatusDetail === 'function')
                    this.props.handleHideSenderStatusDetail()
                  else
                    this.props.handleHiddenShowFormDetail()
                }}
              >
                <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
                lại
              </button>
              {typeof this.props.handleHideSenderStatusDetail === 'function' && 
                <React.Fragment>
                  <button className="GoodDetailContainer-btn-item GoodDetail-btn__Del"
                    onClick={() => this.handleShowHideModalDelete()}
                  >
                    Xóa
                  </button>

                  <button
                    className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
                    onClick={this.handleShowHideUpdateSender}
                  >
                    Cập nhật
                  </button>
                </React.Fragment>
              }
            </React.Fragment>
            :
            <React.Fragment> {/*Phần cho người dùng khi vào xem status của người khác */}
              <button
                className="GoodDetail-btn-back"
                onClick={() => this.props.handleHiddenShowFormDetail()}
              >
                <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay lại
              </button>
              <button className="GoodDetailContainer-btn-item GoodDetail-btn__Del" onClick={() =>{this.handleShowMessage()}}>
                Nhắn tin
              </button>
              {role_name_current.role_name ==='car_trip' && 
                <button
                  //CHƯA XONG
                  //nếu chuyến xe khác đã đăng ký status này thì phải thông báo cho họ biết
                  //nếu chưa thì viết hàm xử lý (CHƯA XONG)
                  className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
                  disabled={status_current.detail.regis_status?false:true}
                  onClick={() => {status_current.detail.regis_status ? toast.info("Đã có chuyến xe đăng ký!"): alert("CHƯA XONG. Nơi viết hàm xử lý")}}
                >
                  Đăng ký
                </button>
              }
            </React.Fragment>
          }
        </div>
        {checkUpdateSenderForm}
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
  return {
    essentialsDetailReducer: state.essentialsDetailReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getEssentialsDetail: async (essential_id) => {
      const action = await getEssentialsDetail(essential_id);
      return dispatch(action);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SenderStatusDetail);
