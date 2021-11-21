import React from "react";
import './StatusForStatusCarTrip.css'

class StatusForStatusCarTrip extends React.Component {
  state = {
    statusNotConfirm : false,
    status_completed : false,

  }
  render() {
    const status_cartrip = this.props.status_current;
    let {statusNotConfirm} = this.state;
    // console.log(status_cartrip)
    const user = this.props.user

    const todate = new Date(status_cartrip.createdAt).getDate();
    const tomonth = new Date(status_cartrip.createdAt).getMonth()+1;
    const toyear=new Date(status_cartrip.createdAt).getFullYear();
    const original_date=tomonth+'/'+todate+'/'+toyear;
    
    
    
    return (
      <div className="Status-header">
        <div className="Status-header__left">
          <div className="Status-headerID">
            <h3 className="Status-headerID--item Status-headerID--name">
              {user.full_name}
            </h3>
            { statusNotConfirm === false && 
            <>
            <h4 className="Status-headerID--item Status-headerID--status" style={{color: '#A3CB38'}}>
              {status_cartrip.status_completed === false ? 'Chưa vận chuyển' : 'Đang vận chuyển'}
            </h4>
            </>
            }
            
          </div>
        </div>
        <div className="Status-header__DateUpPost">
          <i className="Status-header__Date--title" style={{color: '#A3CB38'}}>{status_cartrip.status_type === 'CAR_TRIP' && 'Người vận chuyển'}</i>
          <h3 className="Status-header__date">{`${original_date}`}</h3>
        </div>
      </div>
    );
  }
}
export default StatusForStatusCarTrip;