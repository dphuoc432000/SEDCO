import React, { Component } from "react";
import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
// import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import ImgInfo from "../../../assets/images/logo.png";
import "../GoodsDetail.css";
import "./ReceiverStatusDetail.css";
import { connect } from "react-redux";
import getEssentialsDetail from "../../../stores/actions/essentialsDetail.action";
import ModalDeleteStatus from "../../ModalDeleteStatus/ModalDeleteStatus";
import { API_IMAGE_URL } from "../../../constants/api";
class ReceiverStatusDetail extends Component {
  state = {
    showUpdateReceiverForm: false,
    essentials: this.props.essentials,
    showModalDelete: false,
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
  };
  handleShowHideModalDelete = () => {
    this.setState({
      showModalDelete: !this.state.showModalDelete,
    });
  };
  handleShowHideUpdateReceiver = () => {
    this.setState({
      showUpdateReceiverForm: !this.state.showUpdateReceiverForm,
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

  render() {
    const status_current = this.props.status_current;
    const note = status_current.detail.note;
    const number_per_of_family = status_current.detail.number_per_of_family;
    const picture = status_current.detail.picture;
    const essentials_state = this.state.essentials;
    let { showUpdateReceiverForm } = this.state;
    console.log(this.props);
    const checkUpdateReceiverForm =
      showUpdateReceiverForm === true ? (
        <UpdateReceiverForm
          receiver_status_id={this.props.status_current.detail._id}
          handleShowHideUpdateReceiver={this.handleShowHideUpdateReceiver}
          handleUpdateEssentials={this.handleUpdateEssentials}
          handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
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
          <h3 className="data-container__title">Cần hỗ trợ </h3>
          <table className="List-Good-Detail">
            {essentials_state &&
              essentials_state.map((essential) => {
                return (
                  <>
                    {essential.quantity > 0 && (
                      <tr key={essential.essential_id}>
                        <td>{essential.name}</td>
                        <td>{essential.quantity}</td>
                        <td>{essential.unit}</td>
                      </tr>
                    )}
                  </>
                );
              })}

            <tr>
              <td>Số người trong hộ trong hộ gia đình</td>
              <td>{number_per_of_family}</td>
              <td>Người</td>
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
              alt="hình ảnh người nhận"
              className="GoodDetail-Info-Img__src"
            />
          </div>
        </div>

        <div className="container-btn__ListBottom">
          <button
            className="GoodDetail-btn-back"
            onClick={() => this.props.handleHideReceiverStatusDetail()}
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
              onClick={this.handleShowHideUpdateReceiver}
            >
              Cập nhật
            </button>
          </div>
        </div>
        {checkUpdateReceiverForm}
        {this.state.showModalDelete && (
          <ModalDeleteStatus
            showModalDelete={this.state.showModalDelete}
            handleShowHideModalDelete={this.handleShowHideModalDelete}
            status_id={this.props.status_current._id}
            handleLoadAgainWhenCreateStatus={
              this.props.handleLoadAgainWhenCreateStatus
            }
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
)(ReceiverStatusDetail);
