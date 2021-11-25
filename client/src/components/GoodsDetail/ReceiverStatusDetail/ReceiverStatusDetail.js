import React, { Component } from "react";
import UpdateReceiverForm from "../../CreateStatusForm/UpdateStatusForm/UpdateReceiverForm";
// import UpdateSenderForm from "../../CreateStatusForm/UpdateStatusForm/UpdateSenderForm";
import ImgInfo from "../../../assets/images/logo.png";
import "../GoodsDetail.css";
import "./ReceiverStatusDetail.css";
import { connect } from "react-redux";
import getEssentialsDetail from "../../../stores/actions/essentialsDetail.action";
import ModalDeleteStatus from "../../ModalDeleteStatus/ModalDeleteStatus";
import { API_IMAGE_URL } from "../../../constants/api";
import { toast } from "react-toastify";
import {REGISTER_RECEIVER_STATUS_OF_CAR_SUCCESS} from '../../../constants/actions'
import {register_receiver_status_of_car} from '../../../stores/actions/car_regis_status'
class ReceiverStatusDetail extends Component {
    state = {
        showUpdateReceiverForm: false,
        essentials: this.props.essentials,
        showModalDelete: false,
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
    };
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.status_current._id !== this.props.status_current._id) {
            if (this.props.essentials.length > 0) {
                const essentials_map = await Promise.all(
                    this.props.essentials.map(async (essential) => {
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
    };

    handleShowHideModalDelete = () => {
        this.setState({
            showModalDelete: !this.state.showModalDelete,
        });
    };
    handleShowHideUpdateReceiver = () => {
        this.setState({
            showUpdateReceiverForm: !this.state.showUpdateReceiverForm,
        });
    };
    getEssentialsDetail = async (essential_id) => {
        await this.props.getEssentialsDetail(essential_id);
        const essentialsDetail = await this.props.essentialsDetailReducer;
        // console.log(essentialsDetail)
        return essentialsDetail;
    };
    handleUpdateEssentials = (essentials) => {
        this.setState({
            essentials: essentials,
        });
        this.props.handleUpdateEssentials(essentials);
    };
    handleShowMessage = () => {
        //Nếu chưa đăng nhập thì show form đăng nhập
        //ngược lại nếu đã đăng nhập thì hiện lên message
        if (this.props.isAuthenticated) alert("xử lý hiện lên message");
        else this.props.handleChangeShowFormLogin();
    };
    handleRegisReceiverStatus = async() => {
        const register_action = await this.props.register_receiver_status_of_car(
            this.props.status_current_current.detail._id, 
            this.props.status_current.detail._id)
        if(register_action.type !== REGISTER_RECEIVER_STATUS_OF_CAR_SUCCESS){
            toast.error("Đăng ký không thành công.");
        }
        else {
            toast.success("Đăng ký nhận hàng thành công. Đã được thêm vào quản lý giao dịch.")
            this.props.handleHiddenShowFormDetail()
            this.props.handleUpdateRecentListWhenRegisStatus()
        }
        
    }
    render() {
        const status_current = this.props.status_current; //2 loại: status truyền từ bản đồ qua hoặc status của người đang dùng
        //status_current_current: status của người đang dùng đễ so sánh với status trên
        //nếu mã 2 cái status giống nhau thì hiện 3 nút quay lại, cập nhật và xóa
        //nếu mã 2 cái status khác nhau thì hiện 2 nút quay lại và nhắn tin
        const status_current_current = this.props.status_current_current;
        // 		console.log(status_current, status_current_current)
        //role_name của người dùng hiện tại dùng để set nút đăng ký cho tài xế <- nếu là role car_trip
        const role_name_current = this.props.role_name_current;
        const note = status_current.detail.note;
        const number_per_of_family = status_current.detail.number_per_of_family;
        const picture = status_current.detail.picture;
        const essentials_state = this.state.essentials;
        let { showUpdateReceiverForm } = this.state;
        // 		console.log(this.state)
        const checkUpdateReceiverForm =
            showUpdateReceiverForm === true ? (
                <UpdateReceiverForm
                    receiver_status_id={this.props.status_current.detail._id}
                    handleShowHideUpdateReceiver={this.handleShowHideUpdateReceiver}
                    handleUpdateEssentials={this.handleUpdateEssentials}
                    handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                    status_current={this.props.status_current}
                />
            ) : (
                ""
            );
        const user = this.props.user;
        return (
            <div>
                <div className="GoodDetail-container">
                    {/* <h3 class="GoodDetail-container__title">Tôi muốn hỗ trợ :</h3> */}
                    <h3 className="data-container__title">Cần hỗ trợ</h3>
                    <table className="List-Good-Detail">
                        {essentials_state &&
                            essentials_state.map((essential) => {
                                return (
                                    <React.Fragment>
                                        {essential.quantity > 0 && (
                                            <tr key={essential.essential_id}>
                                                <td>{essential.name}</td>
                                                <td>{essential.quantity}</td>
                                                <td>{essential.unit}</td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        <tr>
                            <td>Số người trong hộ trong hộ gia đình</td>
                            <td>{number_per_of_family}</td>
                            <td>Người</td>
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
                        <h3 className="GoodDetail-Info-Img__label>" style={{    fontWeight: '500',
    color: '#4b50ff'}}>Hình ảnh</h3>
                        <img
                            src={`${API_IMAGE_URL}/${picture}`}
                            alt="hình ảnh người dùng"
                            className="GoodDetail-Info-Img__src"
                            // style={{marginLeft : '-24px'}}
                        />
                    </div>
                </div>
                <div className="container-btn__ListBottom">
                    {status_current._id === status_current_current._id ? (
                        <React.Fragment>
                            {/*Phần cho người dùng khi vào xem status của của mình */}
                            <button
                                className="GoodDetail-btn-back"
                                onClick={() => {
                                    if (
                                        typeof this.props.handleHideReceiverStatusDetail ===
                                        "function"
                                    )
                                        this.props.handleHideReceiverStatusDetail();
                                    else this.props.handleHiddenShowFormDetail();
                                }}
                            >
                                <i className="fas fa-chevron-left GoodDetail-icon-back"></i>{" "}
                                Quay lại
                            </button>
                            <div>
                                <button
                                    className="GoodDetailContainer-btn-item GoodDetail-btn__Del"
                                    onClick={() => this.handleShowHideModalDelete()}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
                                    onClick={this.handleShowHideUpdateReceiver}
                                >
                                    Cập nhật
                                </button>
                            </div>
                            
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/*Phần cho người dùng khi vào xem status của người khác */}
                            <button
                                className="GoodDetail-btn-back"
                                onClick={() => {this.props.handleHiddenShowFormDetail()}}
                            >
                                <i className="fas fa-chevron-left GoodDetail-icon-back"></i>
                                Quay lại
                            </button>

                            <button
                                className="GoodDetailContainer-btn-item GoodDetail-btn__Del"
                                onClick={() => {
                                    this.handleShowMessage();
                                }}
                            >
                                Nhắn tin
                            </button>
                            {role_name_current.role_name === "car_trip" && (
                                
                                status_current.detail.regis_status === false ?
                                    <button
                                    //CHƯA XONG
                                    //nếu chuyến xe khác đã đăng ký status này thì phải thông báo cho họ biết
                                    //nếu chưa thì viết hàm xử lý (CHƯA XONG)
                                        className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
                                        onClick={() =>{this.handleRegisReceiverStatus()}}
                                    >
                                        Đăng ký
                                    </button>
                                    :
                                    <button
                                        //CHƯA XONG
                                        //nếu chuyến xe khác đã đăng ký status này thì phải thông báo cho họ biết
                                        //nếu chưa thì viết hàm xử lý (CHƯA XONG)
                                        className="GoodDetailContainer-btn-item GoodDetail-btn__Update"
                                        onClick={() => {
                                            status_current.detail.regis_status === true
                                                ? toast.info("Đã có chuyến xe đăng ký!")
                                                : alert("CHƯA XONG. Nơi viết hàm xử lý");
                                        }}
                                    >
                                        Đã đăng ký
                                    </button>
                            )}
                        </React.Fragment>
                    )}
                </div>
                {checkUpdateReceiverForm}
                {this.state.showModalDelete && (
                    <ModalDeleteStatus
                        showModalDelete={this.state.showModalDelete}
                        handleShowHideModalDelete={this.handleShowHideModalDelete}
                        status_id={this.props.status_current._id}
                        handleLoadAgainWhenCreateStatus={
                            this.props.handleLoadAgainWhenCreateStatus
                        }
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        essentialsDetailReducer: state.essentialsDetailReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentialsDetail: async (essential_id) => {
            const action = await getEssentialsDetail(essential_id);
            return dispatch(action);
        },
        register_receiver_status_of_car: async (car_status_id , receiver_status_id) =>{
            const action = await register_receiver_status_of_car(car_status_id, receiver_status_id);
            return dispatch(action);
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceiverStatusDetail);
