import React, { Component } from "react";
import NguoiCho from "../../NguoiCho/NguoiCho";
import NguoiNhan from "../../NguoiNhan/NguoiNhan";
import SenderForm from "../../CreateStatusForm/SenderForm";
import ReceiverForm from "../../CreateStatusForm/ReceiverForm";
import RecentList from "../../GanDay/RecentList";
import CarTripForm from '../../CreateStatusForm/CarTripForm'
import "./Status.css";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import TaiXe from '../../Tai Xe/TaiXe'
import { getUserInforIsLogined } from "../../../stores/actions/userIsLogin.action";
import getEssentialsDetail from "../../../stores/actions/essentialsDetail.action";
import ReceiverStatusDetail from "../../GoodsDetail/ReceiverStatusDetail/ReceiverStatusDetail";
import StatusForStatusReceiver from "../../StatusForStatus/StatusForStatusReceiver";
import SenderStatusDetail from "../../GoodsDetail/ReceiverStatusDetail/SenderStatusDetail";
import StatusForStatusSender from "../../StatusForStatus/StatusForStatusSender";
import StatusForStatusCarTrip from "../../StatusForStatus/StatusForStatusCarTrip";
import CarTripDetail from "../../CarTripDetail/CarTripDetail";

// import {btnShowFormReceiver , btnExitFormReceiver , modalReceiverContainer , modalReceiver ,showModalReceiverForm , exitModalReceiverForm} from './HandleFormStatus'

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReceiverForm: false,
            showSenderForm: false,
            showCarTripForm: false,
            showUserStatus: false,
            showSenderStatus: false,
            showReceiverStatus: false,
            showCarTripStatus: false,
            account_id: this.props.account_id,
        };
    }
    mapEssentialMarker = async (essentials_marker) => {
        if (essentials_marker.length > 0) {
            const essentials_map = await Promise.all(
                essentials_marker.map(async (essential) => {
                    const essential_detail = await this.getEssentialsDetail(
                        essential.essential_id
                    );
                    return {
                        ...essential,
                        name: essential_detail.name,
                        code_name: essential_detail.code_name,
                        unit: essential_detail.unit,
                    };
                })
            );
            this.props.status_marker.detail.essentials = essentials_map;
            // this.setState({
            //   essentials: essentials_map,
            // });
        }
    };
    handleShowHideFormReceiver = () => {
        if (this.props.isAuthenticated)
            this.setState({
                showReceiverForm: !this.state.showReceiverForm,
            });
        else
            this.props.handleChangeShowFormLogin()
    };
    handleShowHideFormSender = () => {
        if (this.props.isAuthenticated)
            this.setState({
                showSenderForm: !this.state.showSenderForm,
            });
        else
            this.props.handleChangeShowFormLogin()
    };

    handleShowHideFormCarTrip = () => {
        if (this.props.isAuthenticated)
            this.setState({
                showCarTripForm: !this.state.showCarTripForm,
            })
        else
            this.props.handleChangeShowFormLogin()
    }
    getRoleName = () => {
        if (this.props.role_name.name) {
            switch (this.props.role_name.name) {
                case "Người dùng":
                    return "user";
                case "Người hỗ trợ":
                    return "sender";
                case "Người cần hỗ trợ":
                    return "receiver";
                case "Người vận chuyển":
                    return "car_trip";
                default:
                    return;
            }
        } else return "";
    };

    render() {
        // console.log(this.props);
        const { showReceiverForm, showSenderForm, showCarTripForm } = this.state;
        const checkReceiverForm =
            (
                showReceiverForm === true ? (
                    <ReceiverForm
                        exitModalReceiverForm={this.handleShowHideFormReceiver}
                        account_id={this.props.account_id}
                        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                    />
                ) : (
                    ""
                )
            )
        const checkSenderForm =
            (
                showSenderForm === true ? (
                    <SenderForm
                        exitModalSenderForm={this.handleShowHideFormSender}
                        account_id={this.props.account_id}
                        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                    />
                ) : (
                    ""
                )
            )
        const checkCarTripForm = showCarTripForm === true ? (
            <CarTripForm
                exitModalCarTripForm={this.handleShowHideFormCarTrip}
                user={this.props.user}
                account_id={this.props.account_id}
                handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
            />

        ) : ("");
        const getRoleName = this.getRoleName();
        return (
            <div className="Status">
                {!this.props.showFormDetail ?
                    <React.Fragment>
                        {getRoleName === "user" || getRoleName === "" ?
                            <div className="Status-Not-Role">
                                <h2 className="Status-title">Tạo trạng thái</h2>
                                <h3 className="Status-Who">Bạn là người</h3>
                                <div className="Status-ListBTN">
                                    <button className="Status-BTN__item Status-BTN__Taixe"
                                        onClick={this.handleShowHideFormCarTrip}
                                    >
                                        Vận chuyển
                                    </button>
                                    <button
                                        className="Status-BTN__item Status-BTN__Nguoicho"
                                        onClick={this.handleShowHideFormSender}
                                    >
                                        Hỗ trợ
                                    </button>
                                    <button
                                        className="Status-BTN__item Status-BTN__Nguoinhan"
                                        onClick={this.handleShowHideFormReceiver}
                                    >
                                        Cần hỗ trợ
                                    </button>
                                </div>
                            </div>
                            :
                            ""
                        }
                        {getRoleName === "receiver" ? (
                            <NguoiNhan
                                isAuthenticated={this.props.isAuthenticated}
                                user={this.props.user}
                                account_id={this.props.account_id}
                                status_current={this.props.status_current}
                                roleName={this.props.role_name}
                                appProps={this.props.role_name.color}
                                handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                            />
                        ) : (
                            ""
                        )}
                        {getRoleName === "sender" ? (
                            <NguoiCho
                                isAuthenticated={this.props.isAuthenticated}
                                user={this.props.user}
                                account_id={this.props.account_id}
                                status_current={this.props.status_current}
                                roleName={this.props.role_name}
                                appProps={this.props.role_name.color}
                                handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                            />
                        ) : (
                            ""
                        )}
                        {getRoleName === "car_trip" ?
                            <TaiXe
                                isAuthenticated={this.props.isAuthenticated}
                                user={this.props.user}
                                account_id={this.props.account_id}
                                status_current={this.props.status_current}
                                roleName={this.props.role_name}
                                appProps={this.props.role_name.color}
                                handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                            />
                            :
                            ''
                        }
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {
                            this.props.status_marker.status_type === "RECEIVER" &&
                            <React.Fragment>
                                <StatusForStatusReceiver
                                    isAuthenticated={this.props.isAuthenticated}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    account_id={this.props.account_id}
                                    handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail} 
                                />
                                <ReceiverStatusDetail
                                    isAuthenticated={this.props.isAuthenticated}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    role_name_current={this.props.role_name}
                                    essentials={this.props.status_marker.detail.essentials}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                    account_id={this.props.account_id}
                                    handleShowMessageWhenClickConversation={this.props.handleShowMessageWhenClickConversation}
                                />
                            </React.Fragment>
                        }
                        {
                            this.props.status_marker.status_type === 'SENDER' &&
                            <React.Fragment>
                                <StatusForStatusSender
                                    isAuthenticated={this.props.isAuthenticated}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    account_id={this.props.account_id}
                                    handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail} 
                                />
                                <SenderStatusDetail
                                    isAuthenticated={this.props.isAuthenticated}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    role_name_current={this.props.role_name}
                                    essentials={this.props.status_marker.detail.essentials}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                    account_id={this.props.account_id}
                                    handleShowMessageWhenClickConversation={this.props.handleShowMessageWhenClickConversation}
                                />
                            </React.Fragment>
                        }
                        {
                            this.props.status_marker.status_type === 'CAR_TRIP' &&
                            <React.Fragment>
                                <StatusForStatusCarTrip
                                    isAuthenticated={this.props.isAuthenticated}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    account_id={this.props.account_id}
                                    handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail} 
                                />
                                <CarTripDetail
                                    isAuthenticated={this.props.isAuthenticated}
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    user={this.props.status_marker.user}
                                    status_current={this.props.status_marker}
                                    status_current_current={this.props.status_current}
                                    role_name_current={this.props.role_name}
                                    essentials={this.props.status_marker.detail.essentials}
                                    handleHiddenShowFormDetail={this.props.handleHiddenShowFormDetail}
                                    handleUpdateRecentListWhenRegisStatus={this.props.handleUpdateRecentListWhenRegisStatus}
                                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                                    account_id={this.props.account_id}
                                    handleShowMessageWhenClickConversation={this.props.handleShowMessageWhenClickConversation}
                                />
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
                <RecentList handleChangeStatusMarker={this.props.handleChangeStatusMarker} recent_status_list={this.props.recent_status_list} />

                {checkReceiverForm}
                {checkSenderForm}
                {checkCarTripForm}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userIsLoginReducer: state.userIsLoginReducer,
        essentialsDetailReducer: state.essentialsDetailReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInforIsLogined: async (account_id) => {
            const action = await getUserInforIsLogined(account_id);
            return dispatch(action);
        },
        getEssentialsDetail: async (essential_id) => {
            const action = await getEssentialsDetail(essential_id);
            return dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);

