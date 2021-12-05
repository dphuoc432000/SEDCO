import React, { Component } from "react";
import CarTripDetailCss from "./CarTripDetail.module.css";
import "../GoodsDetail/GoodsDetail.css";
import ModalCompleteStatus from '../ModalCompleteStatus/ModalCompleteStatus'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UpdateCarTripForm from "../CreateStatusForm/UpdateStatusForm/UpdateCarTripForm";
import { API_IMAGE_URL } from '../../constants/api'
import { get_status_current_action } from '../../stores/actions/status_current.action';
import {
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    CREATE_CONVERSATION_SUCCESS,
    COMPLETE_CAR_STATUS_SUCCESS
} from '../../constants/actions';
import {
    create_conversation_action,
    get_conversation_by_account_id_receiver_id_action
} from '../../stores/actions/conversation.action';
import {
    complete_car_status_action
} from '../../stores/actions/car_trip.action'
import {toast} from 'react-toastify';

class CarTripDetail extends Component {


    state = {
        showUpdateCarTripForm: false,
        showModalComplete: false
        // start_receive_time: this.props.status_current.detail.start_receive_time,
        // departure_time: this.props.status_current.detail.departure_time,
        // location_start: this.props.status_current.detail.location_start,
        // location_finish: this.props.status_current.detail.location_finish,
        // license_plate: this.props.status_current.detail.car.license_plate,
        // many_people: this.props.status_current.detail.car.many_people,
        // tonnage: this.props.status_current.detail.car.tonnage,
        // type_car: this.props.status_current.detail.car.type_car,
        // note: this.props.status_current.detail.note,
        // status_current: this.props.status_current,
        // picture : this.props.status_current.detail.picture,
    };


    // componentDidUpdate = (prevProps) => {
    //   if (this.props.status_current !== prevProps.status_current) {
    //     this.setState({
    //       start_receive_time: this.props.status_current.detail.start_receive_time,
    //       departure_time: this.props.status_current.detail.departure_time,
    //       location_start: this.props.status_current.detail.location_start,
    //       location_finish: this.props.status_current.detail.location_finish,
    //       license_plate: this.props.status_current.detail.car.license_plate,
    //       many_people: this.props.status_current.detail.car.many_people,
    //       tonnage: this.props.status_current.detail.car.tonnage,
    //       type_car: this.props.status_current.detail.car.type_car,
    //       note: this.props.status_current.detail.note,
    //       picture : this.props.status_current.detail.picture,
    //       status_current: this.props.status_current,
    //     });
    //   }
    // };

    handleShowHideUpdateCarTrip = () => {
        this.setState({
            showUpdateCarTripForm: !this.state.showUpdateCarTripForm,
        });
    };
    handleShowHideModalComplete = () => {
        this.setState({
            showModalComplete: !this.state.showModalComplete,
        });
    };
    handleUpdate = () => {
        this.setState({
            // status_current : status_current , 
            // license_plate : license_plate ,
            // many_people : many_people ,
            // tonnage : tonnage , 
            // type_car : type_car , 
            // note : note ,
            status_current: this.props.status_current,

        });

    };
    handleShowMessage = async () => {
        //Nếu chưa đăng nhập thì show form đăng nhập
        //ngược lại nếu đã đăng nhập thì hiện lên message
        if (this.props.isAuthenticated) {
            const { account_id, status_current } = this.props;
            const get_conversation_by_account_id_receiver_id_action = await this.props.get_conversation_by_account_id_receiver_id_action(account_id, status_current.account_id);
            if (get_conversation_by_account_id_receiver_id_action.type === GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS) {
                const conversation = await this.props.conversationReducer.conversation_account_receiver;
                this.props.handleShowMessageWhenClickConversation(conversation);
            }
            else {
                const create_conversation_action = await this.props.create_conversation_action({ sender_id: account_id, receiver_id: status_current.account_id })
                if (create_conversation_action.type === CREATE_CONVERSATION_SUCCESS) {
                    const conversation = await this.props.conversationReducer.conversation_account_receiver;
                    this.props.handleShowMessageWhenClickConversation(conversation);
                }
            }
            // console.log(this.props.status_current)
            // await this.props.create_conversation_action(this.props.account_id, )
        }
        else this.props.handleChangeShowFormLogin();
    };
    handleCompletedCarStatus=async ()=>{
        const complete_car_status_action= await this.props.complete_car_status_action(this.props.status_current.detail._id);
        if(complete_car_status_action.type === COMPLETE_CAR_STATUS_SUCCESS){
            this.props.handleLoadAgainWhenCreateStatus();
            toast.success('Chuyến xe hoàn thành thành công!');
        }
        toast.warn('Số lượng còn dư hoặc giao dịch chưa hoàn thành. Vui lòng kiểm tra lại!')
    }
    render() {
        let { showUpdateCarTripForm } = this.state;
        const user = this.props.user;

        const status_current = this.props.status_current;
        //status_current_current: status của người đang dùng đễ so sánh với status trên
        //nếu mã 2 cái status giống nhau thì hiện 3 nút quay lại, cập nhật và xóa
        //nếu mã 2 cái status khác nhau thì hiện 2 nút quay lại và nhắn tin
        const status_current_current = this.props.status_current_current;
        //role_name của người dùng hiện tại dùng để set nút đăng ký cho tài xế <- nếu là role car_trip
        const role_name_current = this.props.role_name_current;
        const start_receive_time = status_current.detail.start_receive_time;
        const departure_time = status_current.detail.departure_time;
        const location_start = status_current.detail.location_start;
        const location_finish = status_current.detail.location_finish;
        const license_plate = status_current.detail.car.license_plate;
        const many_people = status_current.detail.car.many_people;
        const tonnage = status_current.detail.car.tonnage;
        const type_car = status_current.detail.car.type_car;
        const note = status_current.detail.note;
        const picture = status_current.detail.picture;
        const todate_start_receive = new Date(start_receive_time).getDate();
        const tomonth_start_receive =
            new Date(start_receive_time).getMonth() + 1;
        const toyear_start_receive = new Date(
            start_receive_time
        ).getFullYear();
        const original_start_receive_time =
        (todate_start_receive < 10 ? '0' + todate_start_receive:todate_start_receive )
        + "/" + (tomonth_start_receive < 10 ?'0' + tomonth_start_receive:tomonth_start_receive)
        +"/" + toyear_start_receive;

        const todate_departure_time = new Date(departure_time).getDate();
        const tomonth_departure_time =
            new Date(departure_time).getMonth() + 1;
        const toyear_departure_time = new Date(departure_time).getFullYear();
        const original_departure_time = 
        (todate_departure_time < 10 ? '0' + todate_departure_time:todate_departure_time)  
        + "/" + (tomonth_departure_time < 10 ? '0' + tomonth_departure_time:tomonth_departure_time)
        + "/" + toyear_departure_time;

        const checkUpdateCarTripForm =
            showUpdateCarTripForm === true ? (
                <UpdateCarTripForm
                    handleShowHideUpdateCarTrip={this.handleShowHideUpdateCarTrip}
                    cartrip_status_id={this.props.status_current.detail._id}
                    user={this.props.user}
                    status_current={this.props.status_current}
                    handleUpdate={this.handleUpdate}
                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                />
            ) : (
                ""
            );
        return (
            <div>
                <div className={CarTripDetailCss.GoodDetail_container}>
                    <table className={CarTripDetailCss.Car_trip_Detail}>
                        <tbody>
                            <tr>
                                <th colSpan={2}><h3 className={CarTripDetailCss.data_container__title}>Thông tin chuyến xe</h3></th>
                            </tr>
                            <tr>
                                <td>Bắt đầu nhận hàng:</td>
                                <td>{original_start_receive_time}</td>
                            </tr>
                            <tr>
                                <td>Bắt đầu vận chuyển:</td>
                                <td>{original_departure_time}</td>
                            </tr>
                            <tr>
                                <td>Từ:</td>
                                <td>{location_start}</td>
                            </tr>
                            <tr>
                                <td>Đến:</td>
                                <td>{location_finish}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <table className={CarTripDetailCss.Car_Detail}>
                        <tbody>
                            <tr>
                                <th colSpan={2}><h3 className={CarTripDetailCss.data_container__title}>Thông tin xe</h3></th>
                            </tr>
                            <tr>
                                <td>Biển số:</td>
                                <td>{license_plate}</td>
                            </tr>
                            <tr>
                                <td>Loại xe:</td>
                                <td>{type_car}</td>
                            </tr>
                            <tr>
                                <td>Trọng tải:</td>
                                <td>{tonnage}</td>
                            </tr>
                            <tr>
                                <td>Số người:</td>
                                <td>{many_people}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại:</td>
                                <td>{user.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ:</td>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <td>Ghi chú:</td>
                                <td>{note}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={CarTripDetailCss.GoodDetail_Info_Img}>
                        <h3 className={CarTripDetailCss.data_container__title} >Hình ảnh</h3>
                        <img
                            src={`${API_IMAGE_URL}/${picture}`}
                            alt="Hình ảnh"
                            className={CarTripDetailCss.GoodDetail_Info_Img__src}

                        />
                    </div>
                </div>
                <div className={CarTripDetailCss.container_btn__ListBottom}>
                    {status_current._id === status_current_current._id ?
                        <React.Fragment>
                            <div className="button_left">
                                <button
                                    className={CarTripDetailCss.GoodDetail_btn_back}
                                    onClick={() => {
                                        if (typeof this.props.handleShowHideCarTripDetail === 'function') {
                                            this.props.handleShowHideCarTripDetail();
                                            this.props.handleUpdateRecentListWhenRegisStatus()
                                        }
                                        else {
                                            this.props.handleHiddenShowFormDetail();
                                            this.props.handleUpdateRecentListWhenRegisStatus()
                                        }
                                    }}
                                >
                                    <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
                                    lại
                                </button>
                            </div>
                            {this.props.update_form &&
                                <div className="button_right">
                                    <button
                                        className={`${CarTripDetailCss.GoodDetailContainer_btn_item} ${CarTripDetailCss.GoodDetail_btn__Update}`}
                                        onClick={() => { this.handleShowHideUpdateCarTrip() }}
                                    >
                                        Cập nhật
                                    </button>
                                    <button 
                                        className={`${CarTripDetailCss.GoodDetailContainer_btn_item} ${CarTripDetailCss.GoodDetail_btn__Completed}`}
                                        onClick={()=>{this.handleShowHideModalComplete()}}
                                    >
                                        Hoàn thành
                                    </button>
                                </div>
                            }
                        </React.Fragment>
                        :
                        <React.Fragment> {/*Phần cho người dùng khi vào xem status của người khác */}
                            <div className="button_left">
                                <button
                                    className={CarTripDetailCss.GoodDetail_btn_back}
                                    onClick={() => { this.props.handleHiddenShowFormDetail(); this.props.handleUpdateRecentListWhenRegisStatus() }}
                                >
                                    <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay lại
                                </button>
                            </div>
                            <div className="button_right">
                                <button className={`${CarTripDetailCss.GoodDetailContainer_btn_item} ${CarTripDetailCss.GoodDetail_btn__Message}`} onClick={() => { this.handleShowMessage() }}>
                                    Nhắn tin
                                </button>
                            </div>
                        </React.Fragment>
                    }
                </div>
                {checkUpdateCarTripForm}
                {this.state.showModalComplete && (
                    <ModalCompleteStatus
                        showModalComplete={this.state.showModalComplete}
                        handleShowHideModalComplete={this.handleShowHideModalComplete}
                        status_id={this.props.status_current._id}
                        status_current={this.props.status_current}
                        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        conversationReducer: state.conversationReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        //      get_status_current_action :  async (account_id) => {
        //         const action = await get_status_current_action(account_id);
        //         return dispatch(action);
        // }   

        create_conversation_action: async (object) => {
            const action = await create_conversation_action(object);
            return dispatch(action);
        },
        get_conversation_by_account_id_receiver_id_action: async (account_id, receiver_id) => {
            const action = await get_conversation_by_account_id_receiver_id_action(account_id, receiver_id);
            return dispatch(action);
        },
        complete_car_status_action: async(car_status_id)=>{
            const action = await complete_car_status_action(car_status_id);
            return dispatch(action);
        }
    }


};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CarTripDetail)
);
