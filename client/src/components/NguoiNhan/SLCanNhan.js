import React from "react";
import ReceiverStatusDetail from "../../components/GoodsDetail/ReceiverStatusDetail/ReceiverStatusDetail";
import { connect } from "react-redux";
import getEssentialsDetail from "../../stores/actions/essentialsDetail.action"
import SLCanNhanCss from './SLCanNhan.module.css'
class SLCanNhan extends React.Component {
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
    // const status_current = this.props.status_current;
    // const essentials = status_current.detail.essentials;
    // const note = status_current.detail.note;
    // const number_per_of_family = status_current.detail.number_per_of_family;
    const essentials_state = this.state.essentials;
    // console.log(this.state)
    let count_empty = 0;
    return (
      <React.Fragment>
          {this.state.showGoodsDetail === false ? (
            <React.Fragment>
              <div className={SLCanNhanCss.my_status_container}>
                <table className={SLCanNhanCss.List_Good}>
                  <tbody>
                      <tr>
                        <th colSpan={2}><h3 className={SLCanNhanCss.data_container__title}>Cần hỗ trợ nhu yếu phẩm </h3></th>
                      <td>
                        <p
                            className={SLCanNhanCss.data_container__SeeDetail}
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
                        essential.quantity <= 0 && count_empty++;
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
                    {
                      count_empty === essentials_state.length && 
                      <tr>
                        <td colSpan='3'>
                          <p style={{color:'red', textAlign:'center'}}>(Số lượng nhu yếu phẩm đã hết.)</p>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : (
            <ReceiverStatusDetail
              user={this.props.user}
              status_current={this.props.status_current}
              status_current_current = {this.props.status_current}
              essentials = {this.state.essentials}
              handleHideReceiverStatusDetail={this.handleShowHide}
              handleUpdateEssentials={this.handleUpdateEssentials}
              handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
              handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
              update_form={this.state.update_form}
              handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
              account_id={this.props.account_id}
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
export default connect(mapStateToProps , mapDispatchToProps)(SLCanNhan);
