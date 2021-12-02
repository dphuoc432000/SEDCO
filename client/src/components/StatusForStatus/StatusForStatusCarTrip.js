import React from "react";
import StatusForStatusCarTripCss from './StatusForStatusCarTrip.module.css';
class StatusForStatusCarTrip extends React.Component {
    state = {
        statusNotConfirm: false,
        status_completed: false,

    }
    render() {
        const status_cartrip = this.props.status_current;
        let { statusNotConfirm } = this.state;
        // console.log(status_cartrip)
        const user = this.props.user

        const todate = new Date(status_cartrip.createdAt).getDate();
        const tomonth = new Date(status_cartrip.createdAt).getMonth() + 1;
        const toyear = new Date(status_cartrip.createdAt).getFullYear();
        const original_date = todate + '/' + tomonth  + '/' + toyear;

        return (
            <div className={StatusForStatusCarTripCss.Status_header}>
                <div className={StatusForStatusCarTripCss.Status_header__left}>
                    <div className={StatusForStatusCarTripCss.Status_headerID}>
                        <h3 className={`${StatusForStatusCarTripCss.Status_headerID__item} ${StatusForStatusCarTripCss.Status_headerID__name}`}>
                            {user.full_name}
                        </h3>
                        {statusNotConfirm === false &&
                            <>
                                <h4 className={`${StatusForStatusCarTripCss.Status_headerID__item} ${StatusForStatusCarTripCss.Status_headerID__status}`} style={{ color: '#A3CB38' }}>
                                    {!status_cartrip.detail.censorship ? 'Đang kiểm duyệt' : status_cartrip.status_completed === false ? 'Chưa vận chuyển' : 'Đang vận chuyển'}
                                </h4>
                            </>
                        }

                    </div>
                </div>
                <div className={StatusForStatusCarTripCss.Status_header__DateUpPost}>
                    <h3 className={StatusForStatusCarTripCss.Status_header__date}>{`${original_date}`}</h3>
                    <p className={StatusForStatusCarTripCss.Status_header__Date__title} style={{ color: '#A3CB38' }}>{status_cartrip.status_type === 'CAR_TRIP' && 'Người vận chuyển'}</p>
                </div>
            </div>
        );
    }
}
export default StatusForStatusCarTrip;