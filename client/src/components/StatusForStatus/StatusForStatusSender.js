import React from "react";
import './StatusForStatus.css'
class StatusForStatusSender extends React.Component {
  state = {
    statusNotConfirm : false,
    status_completed : false,

  }
  render() {
    const status_sender = this.props.status_current;
    let {statusNotConfirm} = this.state;
    // console.log(this.props.role_name)
    const user = this.props.user

    const todate = new Date(status_sender.createdAt).getDate();
    const tomonth = new Date(status_sender.createdAt).getMonth()+1;
    const toyear=new Date(status_sender.createdAt).getFullYear();
    const original_date=tomonth+'/'+todate+'/'+toyear;
    const hours = new Date(status_sender.createdAt).getHours();
    const minutes = new Date(status_sender.createdAt).getMinutes();
    
    const orginal_time = hours + ':'+ minutes ;
    return (
      <div className="Status-header">
        <div className="Status-header__left">
          <div className="Status-headerID">
            <h3 className="Status-headerID--item Status-headerID--name">
              {user.full_name}
            </h3>
            { statusNotConfirm === false && 
            <>
            <h4 className="Status-headerID--item Status-headerID--status"  style={{ color: '#FED330'}}>
              {status_sender.detail.regis_status === false ? 'Đang chờ nhận' : 'Đã được đăng ký'}
            </h4>
            </>
            }
            
          </div>
        </div>
        <div className="Status-header__DateUpPost">
          <i className="Status-header__Date--title" style={{ color: '#FED330'}}>{status_sender.status_type === 'SENDER' && 'Người hỗ trợ'}</i>
          <h3 className="Status-header__date">{`${original_date} ${orginal_time}`}</h3>
        </div>
      </div>
    );
  }
}
export default StatusForStatusSender;