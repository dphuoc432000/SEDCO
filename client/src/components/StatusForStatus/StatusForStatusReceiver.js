import React from "react";
import './StatusForStatus.css';
import LongMenu from './Menu/Menu';
import ReportForm from "../ReportForm/ReportForm";
import ModalDeleteStatus from "../ModalDeleteStatus/ModalDeleteStatus";

class StatusForStatusReceiver extends React.Component {
    state = {
        statusNotConfirm : false,
        status_completed : false,
        showReportForm: false,
        showModalDelete: false,
    }
    handleShowReportForm = () =>{
        if (this.props.isAuthenticated) 
            this.setState({
                showReportForm: !this.state.showReportForm,
                showModalDelete: false,
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
        const status_receiver = this.props.status_current;
        let {statusNotConfirm, showReportForm, showModalDelete} = this.state;
        const user = this.props.user

        const todate = new Date(status_receiver.createdAt).getDate();
        const tomonth = new Date(status_receiver.createdAt).getMonth()+1;
        const toyear=new Date(status_receiver.createdAt).getFullYear();
        const original_date=(todate<10?'0'+todate:todate)+'/'+(tomonth<10?'0'+tomonth:tomonth)+'/'+toyear;
        const {status_current, status_current_current} = this.props;
        return (
            <React.Fragment>
                <div className="Status-header">
                    <div className="Status-header__left">
                        <div className="Status-headerID">
                            <h3 className="Status-headerID--item Status-headerID--name">{user.full_name}</h3>
                            <p className="Status-header__Date--title" style={{color: '#EE5A24'}}>{status_receiver.status_type === 'RECEIVER' && 'Người cần hỗ trợ'}</p>
                            
                            
                        </div>
                    </div>
                    <div className="Status-header__DateUpPost">
                        <div className="Status_header__date_container"> 
                            <h3 className="Status-header__date">{`${original_date} `}</h3>
                            { statusNotConfirm === false && 
                                <>
                                    <h4 className="Status-headerID--item Status-headerID--status" style={{color: 'rgb(234, 32, 39)'}}>
                                        {status_receiver.detail.regis_status === false ? 'Đang chờ hỗ trợ' : 'Đã được đăng ký'}
                                    </h4>
                                </>
                            }
                        </div>
                            <LongMenu handleShowHideModalDelete={this.handleShowHideModalDelete} handleShowReportForm={this.handleShowReportForm} status_current={status_current}  status_current_current={status_current_current}/>
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
export default StatusForStatusReceiver;