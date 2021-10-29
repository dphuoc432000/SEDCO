import React from "react";
import RecentList from "../GanDay/RecentList";
import GoodsDetail from "../GoodsDetail/GoodsDetail";

class SLHoTro extends React.Component {
  state = {
    showGoodsDetail: false,
    showUpdateReceiverForm: false,
    showUpdateSenderForm: false,
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
  render() {
    let { showGoodsDetail } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        {showGoodsDetail === false ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm </h3>{" "}
              <button
                className="data-container__SeeDetail"
                onClick={() => {
                  this.handleShowHide();
                }}
              >
                xem chi tiết{" "}
                <i
                  className="fas fa-arrow-right"
                  style={{ fontSize: "12px" }}
                />
              </button>
            </div>

            <table className="List-Good">
              <tr>
                <td>Trứng</td>
                <td>4 quả</td>
              </tr>
              <tr>
                <td>Gạo</td>
                <td>4 bao</td>
              </tr>
              <tr>
                <td>Rau củ</td>
                <td>6 thùng</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>Tổng khối lượng</td>
                <td>600kg</td>
              </tr>
            </table>

            <h3 className="data-container__title">Gần đây</h3>
            {/* <RecentList /> */}
          </>
        ) : (
          <GoodsDetail showGoodsDetail={this.handleShowHide} />
        )}
      </React.Fragment>
    );
  }
}
export default SLHoTro;
