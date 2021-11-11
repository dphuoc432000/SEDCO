import React from "react";
import SLCanNhan from "./SLCanNhan"
import StatusForStatusReceiver from '../StatusForStatus/StatusForStatusReceiver';
import './NguoiNhan.css'

class NguoiNhan extends React.Component {
  render() {
    return (
      <div className="NguoiNhan">
        <StatusForStatusReceiver user={this.props.user} roleName={this.props.role_name} status_current={this.props.status_current}/>
        <SLCanNhan user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/>
      </div>
    );
  }
}
export default NguoiNhan;
