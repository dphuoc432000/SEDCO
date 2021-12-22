import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Driver_censorship.css";
import logo from '../../../assets/images/logo.png';
import { get_user_list_no_censorship_action } from '../../../stores/actions/user_list_driver_no_censorship.action';
import BasicPagination from '../../../components/Pagination/Pagination';
import { API_IMAGE_URL } from '../../../constants/api'
import { confirm_driver_censorship_action, cancle_driver_censorship_action } from '../../../stores/actions/car_trip.action';
import { CONFIRM_DRIVER_CENSORSHIP_SUCCESS, CANCLE_DRIVER_CENSORSHIP_SUCCESS } from '../../../constants/actions';
import { toast } from 'react-toastify';
import ModalConfirm from "./ModalConfirm/ModalConfirm";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function converJsonDateToDate(jsonDate) {
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
}

class Driver_censorship extends React.Component {
    state = {
        user_driver_no_censorship: [],
        pagination: {
            _limit: 1,
            _page: 1,
            totalRows: 1
        },
        user_no_censorship: {},
        open_ModalConfirm: false
    }

    componentDidMount = async () => {
        const user_list_no_censorship_action = await this.props.get_user_list_no_censorship_action(5, 1);
        const user_list_no_censorshipReducer = this.props.user_list_no_censorshipReducer;
        if (user_list_no_censorship_action.type === 'GET_USER_LIST_NO_CENSORSHIP_SUCCESS')
            this.setState({
                user_driver_no_censorship: user_list_no_censorshipReducer.user_driver_no_censorship,
                pagination: user_list_no_censorshipReducer.pagination,
            })
    }

    handleChangeFormUserInfor = (user) => {
        console.log(user)
        this.setState({
            user_no_censorship: user
        })
    }
    handleChangePage = async (value) => {
        const user_list_no_censorship_action = await this.props.get_user_list_no_censorship_action(5, value);
        const user_list_no_censorshipReducer = this.props.user_list_no_censorshipReducer;
        if (user_list_no_censorship_action.type === 'GET_USER_LIST_NO_CENSORSHIP_SUCCESS')
            this.setState({
                user_driver_no_censorship: user_list_no_censorshipReducer.user_driver_no_censorship,
                pagination: user_list_no_censorshipReducer.pagination,
            })
    }
    handleCensorhipAction = async () => {
        const confirm_driver_censorship_action = await this.props.confirm_driver_censorship_action(this.state.user_no_censorship.car_status.detail._id)
        if (confirm_driver_censorship_action.type === CONFIRM_DRIVER_CENSORSHIP_SUCCESS) {
            toast.success('Kiểm duyệt thành công!');
            const user_list_no_censorship_action = await this.props.get_user_list_no_censorship_action(5, 1);
            const user_list_no_censorshipReducer = this.props.user_list_no_censorshipReducer;
            if (user_list_no_censorship_action.type === 'GET_USER_LIST_NO_CENSORSHIP_SUCCESS')
                this.setState({
                    user_driver_no_censorship: user_list_no_censorshipReducer.user_driver_no_censorship,
                    pagination: user_list_no_censorshipReducer.pagination,
                    user_no_censorship: {}
                })
        }
        else {
            toast.error('Đã xảy ra lỗi trong quá trình kiểm duyệt!')
        }
    }
    handleCancleCensorshipAction = async (car_status) => {
        const cancle_driver_censorship_action = await this.props.cancle_driver_censorship_action(car_status._id)
        if (cancle_driver_censorship_action.type === CANCLE_DRIVER_CENSORSHIP_SUCCESS) {
            toast.success('Hủy chuyến xe thành công!');
            const user_list_no_censorship_action = await this.props.get_user_list_no_censorship_action(5, 1);
            const user_list_no_censorshipReducer = this.props.user_list_no_censorshipReducer;
            if (user_list_no_censorship_action.type === 'GET_USER_LIST_NO_CENSORSHIP_SUCCESS')
                this.setState({
                    user_driver_no_censorship: user_list_no_censorshipReducer.user_driver_no_censorship,
                    pagination: user_list_no_censorshipReducer.pagination,
                    user_no_censorship: {}
                })
        }
        else {
            toast.error('Đã xảy ra lỗi trong quá trình hủy chuyến xe !')
        }
    }
    handleOpenModalConfirm = () => {
        this.setState({
            open_ModalConfirm: !this.state.open_ModalConfirm
        })
    }
    render() {
        console.log(this.state)
        const { user_driver_no_censorship, pagination, user_no_censorship } = this.state
        return (
            <React.Fragment>
                <div class="content_Title">
                    <h2 >Kiểm duyệt tài xế</h2>
                </div>
                <div className="content_Driver_censorship">
                    {/*<div class="block_search_filter">
                        <div className="form_search">
                            <h3 className="form_search__lable">Tìm kiếm</h3>
                            <input type="text" className="form_search__input" placeholder="Nhập để tìm kiếm" />
                        </div>
                        <div className="filter_form">
                            <h3 className="filter_data_dashboard">Lọc</h3>
                            <select id="box_filter" placeholder="tăng dần">
                                <option value="" className="box_filter_item">tăng dần</option>
                                <option value="" className="box_filter_item">Giảm dần</option>
                            </select>
                        </div>
                    </div>*/}
                    <div className="KiemDuyet-Container">
                        <div id="Danhsach_kiemduyet">
                            {/* <!-- Danh sách kiểm duyệt --> */}
                            <h4 className="danh_sach">Danh sách kiểm duyệt</h4>
                            <div id="List-Chuyen-Xe">
                                {user_driver_no_censorship.map((user) => {
                                    return (
                                        <div class="Chuyen-Xe__item" key={user._id} onClick={() => { this.handleChangeFormUserInfor(user) }}>
                                            <h4 class="Chuyen-Xe__item--name">{user.full_name}</h4>
                                            <div class="Chuyen-Xe__item--status">
                                                <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                                <h5 class="Chuyen-Xe__item--status-lable">
                                                    {!user.car_status.detail.censorship && 'Chưa kiểm duyêt'}
                                                </h5>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            {/*<ul class="pagination_driver">
                                <BasicPagination
                                    count={Math.ceil(pagination.totalRows / pagination._limit)}
                                    handleChangePage={this.handleChangePage}
                                />
                            </ul>*/}
                        </div>
                        {/* <!-- Thông tin tài xế --> */}
                        <div id="Thong-tin-Chuyen-Xe">
                            <h4 className="informations_driver">Thông tin tài xế</h4>
                            <div class="Form-TTKD-Detail">
                                {
                                    !isEmpty(user_no_censorship) ?
                                        <React.Fragment>
                                            <div class="Form-TTKD__header">
                                                <h2 class="Form-TTKD__header--name">{user_no_censorship.full_name}</h2>
                                                <h3 class="Form-TTKD__header--Date">Ngày đăng ký trạng thái: {converJsonDateToDate(user_no_censorship.car_status.createdAt)}</h3>
                                            </div>
                                            <div class="Form-TTKD__container">
                                                <h3 class="Form-TTKD-Title-Major">Thông tin tài xế</h3>
                                                <div className="information_user">
                                                    <ul class="List-Info-Taixe">
                                                        <li class="Info-Taixe__item">Mã người dùng:</li>
                                                        <li class="Info-Taixe__item">Tuổi:</li>
                                                        <li class="Info-Taixe__item">Địa chỉ:</li>
                                                        <li class="Info-Taixe__item">Số điện thoại:</li>
                                                        <li class="Info-Taixe__item">Email:</li>
                                                    </ul>
                                                    <ul class="List-Info-Taixe">
                                                        <li class="Info-Taixe__item">{user_no_censorship._id}</li>
                                                        <li class="Info-Taixe__item">{user_no_censorship.age}</li>
                                                        <li class="Info-Taixe__item">{user_no_censorship.address}</li>
                                                        <li class="Info-Taixe__item">{user_no_censorship.phone_number}</li>
                                                        <li class="Info-Taixe__item">{user_no_censorship.email}</li>
                                                    </ul>
                                                </div>
                                                <h3 class="Form-TTKD-Title-Major">Hình ảnh</h3>
                                                {user_no_censorship.vehicle_censorship ?
                                                    <React.Fragment>
                                                        <h3 class="Form-TTKD-Title-Major">Khuôn mặt</h3>
                                                        <div class="List-IMG-FACE">
                                                            <div class="IMG-FACE__item">
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.face_img ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.face_img}`} alt="" className="img_logo" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 class="Form-TTKD-Title-Major">Căn cước công dân/CMND</h3>
                                                        <div class="List-IMG-CCCD">
                                                            <div class="IMG-CCCD__item">
                                                                <h3 class="CCCD__item-title">Mặt trước</h3>
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.id_card_img_before ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.id_card_img_before}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div class="IMG-CCCD__item">
                                                                <h3 class="CCCD__item-title">Mặt sau</h3>
                                                                <div >
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.id_card_img_after ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.id_card_img_after}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 class="Form-TTKD-Title-Major">Giấy phép lái xe</h3>
                                                        <div class="List-IMG-GPLX">
                                                            <div class="IMG-GPLX__item">
                                                                <h3 class="GPLX__item-title">Mặt trước</h3>
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.driving_license_img_before ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.driving_license_img_before}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div class="IMG-GPLX__item">
                                                                <h3 class="GPLX__item-title">Mặt sau</h3>
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.driving_license_img_after ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.driving_license_img_after}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 class="Form-TTKD-Title-Major">Giấy xét nghiệm COVID19 / Xác nhận đã tim Vaccine</h3>
                                                        <div class="List-IMG-GXN">
                                                            <div class="IMG-GXN__item">
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.test_img_1 ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.test_img_1}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div class="IMG-GXN__item">
                                                                <div>
                                                                    {
                                                                        user_no_censorship.vehicle_censorship.test_img_2 ?
                                                                            <img src={`${API_IMAGE_URL}/${user_no_censorship.vehicle_censorship.test_img_2}`} alt="" className="img_item_admin" />
                                                                            :
                                                                            <p>Chưa có hình ảnh</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    :
                                                    <p>Chưa có hình ảnh </p>
                                                }

                                            </div>
                                            <div class="BTN_Accuracy">
                                                <button onClick={() => { this.handleOpenModalConfirm() }} class="BTN_Accuracy__item BTN_Accuracy_cancel">Hủy</button>
                                                <button onClick={() => { this.handleCensorhipAction() }} class="BTN_Accuracy__item BTN_Accuracy__Duyet">Duyệt</button>
                                            </div>
                                        </React.Fragment>
                                        :
                                        <p>Chưa có thông tin</p>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.open_ModalConfirm &&
                    <ModalConfirm
                        open={this.state.open_ModalConfirm}
                        car_status={this.state.user_no_censorship.car_status}
                        content={'Bạn muốn hủy nhận nhu yếu phẩm từ người dùng này?'}
                        handleCancleCensorshipAction={this.handleCancleCensorshipAction}
                        handleOpenModalConfirm={this.handleOpenModalConfirm}
                    />
                }

            </React.Fragment>

        )
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        user_list_no_censorshipReducer: state.user_list_no_censorshipReducer,
        carTripReducer: state.carTripReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_user_list_no_censorship_action: async (_limit, _page) => {
            const action = await get_user_list_no_censorship_action(_limit, _page);
            return dispatch(action);
        },
        confirm_driver_censorship_action: async (car_status_id) => {
            const action = await confirm_driver_censorship_action(car_status_id);
            return dispatch(action);
        },
        cancle_driver_censorship_action: async (status_id) => {
            const action = await cancle_driver_censorship_action(status_id);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Driver_censorship));
