import React, { Component } from "react";
// import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import "../GoodsDetail.css";
import { connect } from "react-redux";
import { API_IMAGE_URL } from "../../../constants/api";
import getEssentialsDetail from '../../../stores/actions/essentialsDetail.action';
import { toast } from 'react-toastify';
import { register_sender_status_of_car } from '../../../stores/actions/car_regis_status'
import {
    REGISTER_SENDER_STATUS_OF_CAR_SUCCESS,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    CREATE_CONVERSATION_SUCCESS,
    COMPLETE_SENDER_STATUS_SUCCESS
} from '../../../constants/actions';
import {
    create_conversation_action,
    get_conversation_by_account_id_receiver_id_action
} from '../../../stores/actions/conversation.action';
import {
    complete_sender_action
} from '../../../stores/actions/sender_status.action'
import SenderStatusDetailCss from './SenderStatusDetail.module.css';
import ModalCompleteStatus from '../../ModalCompleteStatus/ModalCompleteStatus'
class SenderStatusDetail extends Component {
    state = {
        showUpdateSenderForm: false,
        essentials: this.props.essentials,
        showModalComplete: false
    };
    handleShowHideUpdateSender = () => {
        this.setState({
            showUpdateSenderForm: !this.state.showUpdateSenderForm,
        });
    };
    componentDidMount = async () => {
        if (this.state.essentials.length > 0) {
            const essentials_map = await Promise.all(
                this.state.essentials.map(async (essential) => {
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
            this.setState({
                essentials: essentials_map,
            });
        }
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.status_current._id !== this.props.status_current._id) {
            if (this.props.essentials.length > 0) {
                const essentials_map = await Promise.all(this.props.essentials.map(async essential => {
                    const essential_detail = await this.getEssentialsDetail(essential.essential_id);
                    return {
                        ...essential,
                        name: essential_detail.name,
                        code_name: essential_detail.code_name,
                        unit: essential_detail.unit,
                    }
<<<<<<< HEAD
                  </React.Fragment>
                );
              })}
            <tr>
              <td>Tổng khối lượng</td>
              <td>{weight_essential}</td>
              <td>Kg</td>
            </tr>
          </table>
          <h3 className="data-container__title">Thông tin liên hệ</h3>
          <table className="List-Good-Detail">
            <tr>
              <td>Số điện thoại</td>
              <td>{user.phone_number}</td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td>Ghi chú</td>
              <td>{note}</td>
            </tr>
          </table>
          <div className="GoodDetail-Info-Img">
            <h3 className="data-container__title" style={{ marginLeft: "-17px" }}>Hình ảnh</h3>
            <img
              src={`${API_IMAGE_URL}/${picture}`}
              alt={`Hình ảnh`}
              className="GoodDetail-Info-Img__src"
            //   style={{marginLeft: "-24px"}}
            />
          </div>
        </div>
=======
                }))
                this.setState({
                    essentials: essentials_map
                })
            }
        }
    }
    handleShowHideUpdateSender = () => {
        this.setState({
            showUpdateSenderForm: !this.state.showUpdateSenderForm,
        });
    };
    getEssentialsDetail = async (essential_id) => {
        await this.props.getEssentialsDetail(essential_id);
        const essentialsDetail = await this.props.essentialsDetailReducer;
        // console.log(essentialsDetail)
        return essentialsDetail;
    };
>>>>>>> f90b30f0d444700f7f71003c1ad1171954460471

    handleUpdateEssentials = (essentials) => {
        this.setState({
            essentials: essentials,
        });
        this.props.handleUpdateEssentials(essentials);
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
    }
    handleRegisSenderStatus = async () => {
        const register_action = await this.props.register_sender_status_of_car(
            this.props.status_current_current.detail._id,
            this.props.status_current.detail._id)
        if (register_action.type !== REGISTER_SENDER_STATUS_OF_CAR_SUCCESS) {
            toast.error("Đăng ký không thành công. ");
        }
        else {
            toast.success("Đăng ký nhận hàng thành công. Đã được thêm vào quản lý giao dịch.")
            this.props.handleHiddenShowFormDetail()
            this.props.handleUpdateRecentListWhenRegisStatus()
        }

    }
    
    handleShowHideModalComplete = () => {
        this.setState({
            showModalComplete: !this.state.showModalComplete,
        });
    };
    handleCompleteSenderStatus=async (sender_status_id)=>{
        const complete_sender_action= await this.props.complete_sender_action(sender_status_id);
        return complete_sender_action;
    }
    render() {
        const status_current = this.props.status_current;
        //status_current_current: status của người đang dùng đễ so sánh với status trên
        //nếu mã 2 cái status giống nhau thì hiện 3 nút quay lại, cập nhật và xóa
        //nếu mã 2 cái status khác nhau thì hiện 2 nút quay lại và nhắn tin
        const status_current_current = this.props.status_current_current;
        //role_name của người dùng hiện tại dùng để set nút đăng ký cho tài xế <- nếu là role car_trip
        const role_name_current = this.props.role_name_current;
        // const essentials = status_current.detail.essentials;
        const note = status_current.detail.note;
        const weight_essential = status_current.detail.weight_essential;
        const essentials_state = this.state.essentials;
        const picture = status_current.detail.picture;

        let { showUpdateSenderForm } = this.state;
        const checkUpdateSenderForm =
            showUpdateSenderForm === true ? (
                <UpdateSenderForm
                    sender_status_id={this.props.status_current.detail._id}
                    handleShowHideUpdateSender={this.handleShowHideUpdateSender}
                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                    handleUpdateEssentials={this.handleUpdateEssentials}
                    status_current={this.props.status_current}
                />
            ) : (
                ""
            );

        const user = this.props.user;
        return (
            <div>
                <div className={SenderStatusDetailCss.GoodDetail_container}>
                    {/* <h3 class="GoodDetail-container__title">Tôi muốn hỗ trợ :</h3> */}
                    <table className={SenderStatusDetailCss.List_Good_Detail}>
                        <tbody>
                            <tr>
                                <th colSpan={3}><h3 className={SenderStatusDetailCss.data_container__title}>Hỗ trợ nhu yếu phẩm</h3></th>
                            </tr>
                            {essentials_state &&
                                essentials_state.map((essential) => {
                                    return (
                                        <React.Fragment>
                                            {
                                                essential.quantity > 0 &&
                                                <tr key={essential.essential_id}>
                                                    <td>{essential.name}</td>
                                                    <td>{essential.quantity}</td>
                                                    <td>{essential.unit}</td>
                                                </tr>
                                            }
                                        </React.Fragment>
                                    );
                                })}
                            <tr>
                                <td>Tổng khối lượng</td>
                                <td>{weight_essential}</td>
                                <td>Kg</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={SenderStatusDetailCss.infor_Detail}>
                        <tbody>
                            <tr>
                                <th colSpan={2}><h3 className={SenderStatusDetailCss.data_container__title}>Thông tin liên hệ</h3></th>
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
                    <div className={SenderStatusDetailCss.GoodDetail_Info_Img}>
                        <h3 className={SenderStatusDetailCss.data_container__title}>Hình ảnh</h3>
                        {picture &&
                            <img
                                src={`${API_IMAGE_URL}/${picture}`}
                                alt={`Hình ảnh`}
                                className={SenderStatusDetailCss.GoodDetail_Info_Img__src}
                                //   style={{marginLeft: "-21px"}}
                            />
                        }
                    </div>
                </div>

                <div className={SenderStatusDetailCss.container_btn__ListBottom}>

                    {status_current._id === status_current_current._id ?
                        <React.Fragment>
                            <div className={SenderStatusDetailCss.button_left}>
                                <button
                                    className={SenderStatusDetailCss.GoodDetail_btn_back}
                                    onClick={() => {
                                        if (typeof this.props.handleHideSenderStatusDetail === 'function') {
                                            this.props.handleHideSenderStatusDetail();
                                            this.props.handleUpdateRecentListWhenRegisStatus();
                                        }
                                        else {
                                            this.props.handleHiddenShowFormDetail();
                                            this.props.handleUpdateRecentListWhenRegisStatus();
                                        }
                                    }}
                                >
                                    <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay
                                    lại
                                </button>
                            </div>
                            {this.props.update_form &&
                                <div className={SenderStatusDetailCss.button_right}>
                                    <React.Fragment>
                                        <button
                                            className={`${SenderStatusDetailCss.GoodDetailContainer_btn_item} ${SenderStatusDetailCss.GoodDetail_btn__Update}`}
                                            onClick={() => { this.handleShowHideUpdateSender() }}
                                        >
                                            Cập nhật
                                        </button>
                                        <button 
                                            className={`${SenderStatusDetailCss.GoodDetailContainer_btn_item} ${SenderStatusDetailCss.GoodDetail_btn__Completed}`}
                                            onClick={()=>{this.handleShowHideModalComplete()}}
                                        >
                                            Hoàn thành
                                        </button>
                                    </React.Fragment>
                                </div>
                            }
                        </React.Fragment>   
                        :
                        <React.Fragment> {/*Phần cho người dùng khi vào xem status của người khác */}
                            <div className={SenderStatusDetailCss.button_left}>
                                <button
                                    className={SenderStatusDetailCss.GoodDetail_btn_back}
                                    onClick={() => { this.props.handleHiddenShowFormDetail(); this.props.handleUpdateRecentListWhenRegisStatus() }}
                                >
                                    <i className="fas fa-chevron-left GoodDetail-icon-back"></i> Quay lại
                                </button>
                            </div>
                            <div className={SenderStatusDetailCss.button_right}>
                                <button className={`${SenderStatusDetailCss.GoodDetailContainer_btn_item} ${SenderStatusDetailCss.GoodDetail_btn__Message}`} onClick={() => { this.handleShowMessage() }}>
                                    Nhắn tin
                                </button>
                                {role_name_current.role_name === 'car_trip' && (
                                    status_current.detail.regis_status === false ?
                                        <button
                                            //CHƯA XONG
                                            //nếu chuyến xe khác đã đăng ký status này thì phải thông báo cho họ biết
                                            //nếu chưa thì viết hàm xử lý (CHƯA XONG)
                                            className={`${SenderStatusDetailCss.GoodDetailContainer_btn_item} ${SenderStatusDetailCss.GoodDetail_btn__Register}`}
                                            onClick={() => { this.handleRegisSenderStatus() }}

                                        >
                                            Đăng ký
                                        </button>
                                        :
                                        <button
                                            //CHƯA XONG
                                            //nếu chuyến xe khác đã đăng ký status này thì phải thông báo cho họ biết
                                            //nếu chưa thì viết hàm xử lý (CHƯA XONG)
                                            className={`${SenderStatusDetailCss.GoodDetailContainer_btn_item} ${SenderStatusDetailCss.GoodDetail_btn__Registered}`}
                                            //   disabled={true}
                                            onClick={() => { status_current.detail.regis_status === true ? toast.info("Đã có chuyến xe đăng ký!") : alert("CHƯA XONG. Nơi viết hàm xử lý") }}
                                        >
                                            Đã đăng ký
                                        </button>)
                                }
                            </div>
                        </React.Fragment>
                    }
                </div>
                {checkUpdateSenderForm}
                {this.state.showModalComplete && (
                    <ModalCompleteStatus
                        showModalComplete={this.state.showModalComplete}
                        handleShowHideModalComplete={this.handleShowHideModalComplete}
                        status_id={this.props.status_current._id}
                        status_current={this.props.status_current}
                        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                        handleComplete={this.handleCompleteSenderStatus}
                        COMPLETE_STATUS_SUCCESS={COMPLETE_SENDER_STATUS_SUCCESS}
                        toast_success_content={'Người hỗ trợ hoàn thành thành công!'}
                        toast_warn_content={'Giao dịch chưa hoàn thành. Vui lòng kiểm tra lại!'}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        essentialsDetailReducer: state.essentialsDetailReducer,
        conversationReducer: state.conversationReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentialsDetail: async (essential_id) => {
            const action = await getEssentialsDetail(essential_id);
            return dispatch(action);
        },
        register_sender_status_of_car: async (car_status_id, sender_status_id) => {
            const action = await register_sender_status_of_car(car_status_id, sender_status_id);
            return dispatch(action);
        },
        create_conversation_action: async (object) => {
            const action = await create_conversation_action(object);
            return dispatch(action);
        },
        get_conversation_by_account_id_receiver_id_action: async (account_id, receiver_id) => {
            const action = await get_conversation_by_account_id_receiver_id_action(account_id, receiver_id);
            return dispatch(action);
        },
        complete_sender_action: async(sender_status_id)=>{
            const action = await complete_sender_action(sender_status_id);
            return dispatch(action);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SenderStatusDetail);
