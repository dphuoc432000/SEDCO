import React, { Component } from "react";
// import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import ImgInfo from "../../../assets/images/logo.png";
import "../GoodsDetail.css";
import "./ReceiverStatusDetail.css";
import { connect } from "react-redux";
import getEssentialsDetail from '../../../stores/actions/essentialsDetail.action'

class ReceiverStatusDetail extends Component {
  state = {
    showUpdateSenderForm: false,
    essentials: this.props.essentials
  };
  handleShowHideUpdateSender = () => {
    this.setState({
      showUpdateSenderForm: !this.state.showUpdateSenderForm,
    });
  };
  componentDidMount = async () => {
    if(this.state.essentials.length > 0){
        const essentials_map =await Promise.all(this.state.essentials.map(async essential =>{
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
  getEssentialsDetail = async (essential_id) => {
    await this.props.getEssentialsDetail(essential_id);
    const essentialsDetail = await this.props.essentialsDetailReducer;
    // console.log(essentialsDetail)
    return essentialsDetail;
  };

  handleUpdateEssentials = (essentials) => {
     this.setState({
      essentials : essentials ,

     })
     this.props.handleUpdateEssentials(essentials)
  }
  render() {
    const status_current = this.props.status_current;
    // const essentials = status_current.detail.essentials;
    const note = status_current.detail.note;
    const weight_essential = status_current.detail.weight_essential;
    const essentials_state = this.state.essentials;
    let { showUpdateSenderForm } = this.state;
    const checkUpdateSenderForm =
      showUpdateSenderForm === true ? (
        <UpdateSenderForm
        sender_status_id = {this.props.status_current.detail._id}
        handleShowHideUpdateSender={this.handleShowHideUpdateSender}
        handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
        handleUpdateEssentials={this.handleUpdateEssentials}
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
                  <>
                    <tr key={essential.essential_id}>
                      <td>{essential.name}</td>
                      <td>{essential.quantity}</td>
                      <td>{essential.unit}</td>
                    </tr>
                  </>
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
            <h3 className="GoodDetail-Info-Img__label>">Hình ảnh</h3>
            <img
              src={ImgInfo}
              alt="hình ảnh người dùng"
              className="GoodDetail-Info-Img__src"
            />
          </div>
        </div>

        <div className="container-btn__ListBottom">
          <button
            className="GoodDetail-btn-back"
            onClick={() => this.props.handleHideSenderStatusDetail()}
          >
            <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
            lại
          </button>

          <button className="GoodDetailContainer-btn-item GoodDetail-btn__Del">
            Xóa
          </button>

          <button
            className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
            onClick={this.handleShowHideUpdateSender}
          >
            Cập nhật
          </button>
        </div>
        {checkUpdateSenderForm}
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
