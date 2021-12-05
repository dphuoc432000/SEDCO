import React from "react";
import SLCanNhan from "./SLCanNhan"
import StatusForStatusReceiver from '../StatusForStatus/StatusForStatusReceiver';
import './NguoiNhan.css'

class NguoiNhan extends React.Component {
  render() {
    return (
      <div className="NguoiNhan">
        <StatusForStatusReceiver 
          account_id={this.props.account_id} 
          isAuthenticated={this.props.isAuthenticated} 
          user={this.props.user} 
          roleName={this.props.role_name} 
          status_current={this.props.status_current}
          status_current_current={this.props.status_current}
          handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
          handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
          handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus} 
        />
        <SLCanNhan 
          handleShowHideRecentList={this.props.handleShowHideRecentList} 
          handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus} 
          handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus} 
          user={this.props.user} 
          account_id={this.props.account_id} 
          status_current={this.props.status_current} 
          handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
        />
      </div>
    );
  }
}
export default NguoiNhan;
