import React from "react";
// import RecentList from "../GanDay/RecentList";
// import GoodsDetail from "../GoodsDetail/GoodsDetail";
import getEssentialsDetail from "../../stores/actions/essentialsDetail.action";
import { connect } from "react-redux";
import SenderStatusDetail from "../GoodsDetail/ReceiverStatusDetail/SenderStatusDetail";
import SLHoTroCss from './SLHoTro.module.css';

class SLHoTro extends React.Component {
  state = {
    showGoodsDetail: false,
    showUpdateReceiverForm: false,
    showUpdateSenderForm: false,
    essentials: this.props.status_current.detail.essentials,
    update_form: true
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
    this.props.handleShowHideRecentList();
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
          {this.state.showGoodsDetail === false ? (
            <React.Fragment>
              <div className={SLHoTroCss.my_status_container}>
                <table className={SLHoTroCss.List_Good}>
                  <tbody>
                    <tr>
                      <th colSpan={2}><h3 className={SLHoTroCss.data_container__title}>Hỗ trợ nhu yếu phẩm </h3></th>
                      <td>
                        <p
                            className={SLHoTroCss.data_container__SeeDetail}
                            onClick={() => {
                              this.handleShowHide();
                            }}
                        >
                          Chi tiết
                        </p>
                      </td>
                    </tr>
                    {essentials_state &&
                      essentials_state.map((essential) => {
                        return (
                          <React.Fragment>
                            {essential.quantity > 0 && (
                              <tr key={essential.essential_id}>
                                <td>{essential.name}</td>
                                <td style={{textAlign : 'right'}}>{essential.quantity}</td>
                                <td>{essential.unit}</td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : (
            <SenderStatusDetail
              user={this.props.user}
              status_current={this.props.status_current}
              status_current_current = {this.props.status_current}
              essentials = {this.state.essentials}
              handleHideSenderStatusDetail={this.handleShowHide}
              handleUpdateEssentials={this.handleUpdateEssentials}
              handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
              handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
              update_form={this.state.update_form}
              handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
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
