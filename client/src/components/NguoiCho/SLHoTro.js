import React from "react";
// import RecentList from "../GanDay/RecentList";
// import GoodsDetail from "../GoodsDetail/GoodsDetail";
import getEssentialsDetail from "../../stores/actions/essentialsDetail.action";
import { connect } from "react-redux";
import SenderStatusDetail from "../GoodsDetail/ReceiverStatusDetail/SenderStatusDetail";

class SLHoTro extends React.Component {
  state = {
    showGoodsDetail: false,
    showUpdateReceiverForm: false,
    showUpdateSenderForm: false,
    essentials: this.props.status_current.detail.essentials,
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
  handleShowHide = () => {
    this.setState({ showGoodsDetail: !this.state.showGoodsDetail });
  };
  handleShowHideUpdateReceiver = () => {
    this.setState({
      showUpdateReceiverForm: !this.state.showUpdateReceiverForm,
    });
  };
  handleShowHideUpdateSender = () => {
    this.setState({ showUpdateSenderForm: !this.state.showUpdateSenderForm });
  };
  getEssentialsDetail = async (essential_id) => {
    await this.props.getEssentialsDetail(essential_id);
    const essentialsDetail = await this.props.essentialsDetailReducer;
    // console.log(essentialsDetail)
    return essentialsDetail;
  };
  handleUpdateEssentials = (essentials) => {
    this.setState({
      essentials : essentials
    })
  }
  render() {
    let { showGoodsDetail } = this.state;
    const essentials_state = this.state.essentials;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        {this.state.showGoodsDetail === false ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm </h3>{" "}
              <a
                className="data-container__SeeDetail-sender"
                onClick={() => {
                  this.handleShowHide();
                }}
              >
                Xem chi tiết{" "}
                
              </a>
            </div>

            <table className="List-Good">
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
              {/* 
              <tr>
                <td>Tổng khối lượng</td>
                <td>600kg</td>
              </tr> */}
            </table>

            <h3 className="data-container__title">Gần đây</h3>
            {/* <RecentList /> */}
          </>
        ) : (
          <SenderStatusDetail
            user={this.props.user}
            status_current={this.props.status_current}
            essentials = {this.state.essentials}
            handleHideSenderStatusDetail={this.handleShowHide}
            handleUpdateEssentials={this.handleUpdateEssentials}
            handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
            handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
          />
        )}
      </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(SLHoTro);
