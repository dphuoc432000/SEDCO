import React from "react";
import StatusForStatusCarTripCss from './StatusForStatusCarTrip.module.css';
import LongMenu from './Menu/Menu';
import ReportForm from "../ReportForm/ReportForm";
import ModalDeleteStatus from "../ModalDeleteStatus/ModalDeleteStatus";

class StatusForStatusCarTrip extends React.Component {
    state = {
        statusNotConfirm: false,
        status_completed: false,
        showReportForm: false,
        showModalDelete: false,
    }
    handleShowReportForm = () =>{
        if (this.props.isAuthenticated) 
            this.setState({
                showReportForm: !this.state.showReportForm,
            })
        else this.props.handleChangeShowFormLogin();
    }
    handleShowHideModalDelete = () => {
        this.setState({
            showModalDelete: !this.state.showModalDelete,
            showReportForm: false,
        });
    };
    render() {
        const status_cartrip = this.props.status_current;
        let { statusNotConfirm, showReportForm, showModalDelete} = this.state;
        // console.log(status_cartrip)
        const user = this.props.user

        const todate = new Date(status_cartrip.createdAt).getDate();
        const tomonth = new Date(status_cartrip.createdAt).getMonth() + 1;
        const toyear = new Date(status_cartrip.createdAt).getFullYear();
        const original_date = (todate < 10 ?'0'+todate:todate) + '/' + (tomonth<10?'0'+tomonth:tomonth)  + '/' + (toyear<10?'0'+toyear:toyear);
        const {status_current, status_current_current} = this.props;
        return (
            <React.Fragment>
                <div className={StatusForStatusCarTripCss.Status_header}>
                    <div className={StatusForStatusCarTripCss.Status_header__left}>
                        <div className={StatusForStatusCarTripCss.Status_headerID}>
                            <h3 className={`${StatusForStatusCarTripCss.Status_headerID__item} ${StatusForStatusCarTripCss.Status_headerID__name}`}>
                                {user.full_name}
                            </h3>
                            <p className={StatusForStatusCarTripCss.Status_header__Date__title} style={{ color: '#A3CB38' }}>{status_cartrip.status_type === 'CAR_TRIP' && 'Người vận chuyển'}</p>

                        </div>
                    </div>
                    <div className={StatusForStatusCarTripCss.Status_header__DateUpPost}>
                        <div className={StatusForStatusCarTripCss.Status_header__date_container}> 
                            <h3 className={StatusForStatusCarTripCss.Status_header__date}>{`${original_date}`}</h3>
                            {statusNotConfirm === false &&
                                <>
                                    <h4 className={`${StatusForStatusCarTripCss.Status_headerID__item} ${StatusForStatusCarTripCss.Status_headerID__status}`} style={{ color: '#A3CB38' }}>
                                        {!status_cartrip.detail.censorship ? 'Đang kiểm duyệt' : status_cartrip.status_completed === false ? 'Chưa vận chuyển' : 'Đang vận chuyển'}
                                    </h4>
                                </>
                            }
                        </div>
                            <LongMenu handleShowHideModalDelete={this.handleShowHideModalDelete} handleShowReportForm={this.handleShowReportForm} handleShowReportForm={this.handleShowReportForm} status_current={status_current}  status_current_current={status_current_current}/>
                    </div>
                </div>
                {
                    showReportForm &&
                    <ReportForm 
                        handleShowReportForm={this.handleShowReportForm} 
                        status_current={status_current}
                        account_id={this.props.account_id}
                    />
                }
                {showModalDelete && (
                    <ModalDeleteStatus
                        showModalDelete={showModalDelete}
                        handleShowHideModalDelete={this.handleShowHideModalDelete}
                        status_id={this.props.status_current._id}
                        handleLoadAgainWhenCreateStatus={
                            this.props.handleLoadAgainWhenCreateStatus
                        }
                        handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                        handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus} 
                    />
                )}
            </React.Fragment>
            );
    }
}
export default StatusForStatusCarTrip;