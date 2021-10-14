import React from "react";
import RecentList from "../GanDay/RecentList";
import GoodsDetail from "../GoodsDetail/GoodsDetail";

class SLHoTro extends React.Component {
  state = {
    showGoodsDetail: false,
    showUpdateReceiverForm : false,
    showUpdateSenderForm  : false,
  };
  handleShowHide = () => {
    this.setState({ showGoodsDetail: !this.state.showGoodsDetail });
  };
  handleShowHideUpdateReceiver = () => { 
    this.setState({showUpdateReceiverForm: !this.state.showUpdateReceiverForm})
  }
  handleShowHideUpdateSender = () => { 
    this.setState({showUpdateSenderForm: !this.state.showUpdateSenderForm})
  }
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
        >
          <h3 className="data-container__title">Hỗ trợ nhu yếu phẩm</h3>
        </div>
        {showGoodsDetail === false ? (
          <>
            <ul className="data-container__ListItems">
              <li className="data-container__Items">
                Trứng: <h4 className="data-container__ItemQuantity">4 quả</h4>
              </li>
              <li className="data-container__Items">
                Gạo: <h4 className="data-container__ItemQuantity"> 3 bao</h4>{" "}
              </li>
              <li className="data-container__Items">
                Rau củ:<h4 className="data-container__ItemQuantity">2 thùng</h4>{" "}
              </li>
              <button
                className="data-container__SeeDetail"
                onClick={() => {
                  this.handleShowHide();
                }}
              >
                xem chi tiết <i className="fas fa-arrow-right" style={{fontSize: '12px'}} />
              </button>
              <li className="data-container__Items">
                Tổng khối lượng:
                <h4 className="data-container__ItemQuantity">270 kg</h4>{" "}
              </li>
            </ul>
            <h3 className="data-container__title">Gần đây</h3>

            <RecentList />
          </>
        ) : (
          <GoodsDetail showGoodsDetail={this.handleShowHide} />
        )}
        
      </React.Fragment>
    );
  }
}
export default SLHoTro;
