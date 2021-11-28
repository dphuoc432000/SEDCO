import React from 'react';
import SLHoTro from './SLHoTro';

import StatusForStatusSender from '../StatusForStatus/StatusForStatusSender';
import './NguoiCho.css'


class NguoiCho extends React.Component {
  
  render() {
     return (
      <div className="NguoiCho">
        <StatusForStatusSender user={this.props.user} roleName={this.props.role_name} status_current={this.props.status_current} />
        <SLHoTro handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}  handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus} user={this.props.user} account_id={this.props.account_id} status_current={this.props.status_current} handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}/>
        
      </div>
  );
  }
 
}

export default NguoiCho;