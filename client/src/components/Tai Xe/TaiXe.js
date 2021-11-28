import React, { Component } from 'react';
import StatusForStatusCarTrip from '../StatusForStatus/StatusForStatusCarTrip';
import TTChuyenXe from './TTChuyenXe';
import { withRouter } from 'react-router';
import './TaiXe.css'

class TaiXe extends Component {
  render() {
    return (
      <div className="TaiXe">
        
        <StatusForStatusCarTrip  user={this.props.user} roleName={this.props.role_name} status_current={this.props.status_current}/>
        <TTChuyenXe handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus} handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}  user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/>

      </div>
    );
  }
}



export default withRouter(TaiXe);