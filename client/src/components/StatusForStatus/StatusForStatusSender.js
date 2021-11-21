import React from "react";
import './StatusForStatus.css'
class StatusForStatusSender extends React.Component {
  state = {
    statusNotConfirm : false,
    status_completed : false,

  }
  render() {
    const status_receiver = this.props.status_current;
    let {statusNotConfirm} = this.state;
    console.log(this.props.role_name)
    const user = this.props.user

    const todate = new Date(status_receiver.createdAt).getDate();
    const tomonth = new Date(status_receiver.createdAt).getMonth()+1;
    const toyear=new Date(status_receiver.createdAt).getFullYear();
    const original_date=tomonth+'/'+todate+'/'+toyear;
    const hours = new Date(status_receiver.createdAt).getHours();
    const minutes = new Date(status_receiver.createdAt).getMinutes();
    
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
              {status_receiver.status_completed === false ? 'Đang chờ nhận' : 'Đã nhận'}
            </h4>
            </>
            }
            
          </div>
        </div>
        <div className="Status-header__DateUpPost">
          <i className="Status-header__Date--title" style={{ color: '#FED330'}}>{status_receiver.status_type === 'SENDER' && 'Người hỗ trợ'}</i>
          <h3 className="Status-header__date">{`${original_date}`}</h3>
        </div>
      </div>
    );
  }
}
export default StatusForStatusSender;