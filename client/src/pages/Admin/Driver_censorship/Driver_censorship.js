import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Driver_censorship.css";
import logo from '../../../assets/images/logo.png';
class Driver_censorship extends React.Component {
    render() {
        return (
            <div className="content_Driver_censorship">
                <h2 class="content-Title">Kiểm duyệt tài xế</h2>
                <div class="Block-Search-Filter">
                    <div class="content-search">
                        <h3 class="content-search__lable">Tìm kiếm</h3>
                        <input type="text" class="content-search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div class="Filter_the_data_driver">
                        <h3 class="Filter_the_data_driver_lable">Lọc</h3>
                        <div>
                            <select id="Filter_box_driver" placeholder="Mặc định - tăng dần">
                                <option value="" class="Filter_box_driver__item">tăng dần</option>
                                <option value="" class="Filter_box_driver__item">Giảm dần</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="KiemDuyet-Container">
                    <div id="Danhsach_kiemduyet">
                        {/* <!-- Danh sách kiểm duyệt --> */}
                        <h4 className="danh_sach">Danh sách kiểm duyệt</h4>
                        <div id="List-Chuyen-Xe">
                            <div class="Chuyen-Xe__item">
                                <h4 class="Chuyen-Xe__item--name">Đoàn Trần Minh Khôi</h4>
                                <div class="Chuyen-Xe__item--status">
                                    <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                    <h5 class="Chuyen-Xe__item--status-lable">Chưa kiểm duyệt</h5>
                                </div>
                            </div>
                            <div class="Chuyen-Xe__item">
                                <h4 class="Chuyen-Xe__item--name">Trần Công Tứ</h4>
                                <div class="Chuyen-Xe__item--status">
                                    <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                    <h5 class="Chuyen-Xe__item--status-lable">Chưa kiểm duyệt</h5>
                                </div>
                            </div>
                            <div class="Chuyen-Xe__item">
                                <h4 class="Chuyen-Xe__item--name">Phạm Minh Hiếu</h4>
                                <div class="Chuyen-Xe__item--status">
                                    <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                    <h5 class="Chuyen-Xe__item--status-lable">Chưa kiểm duyệt</h5>
                                </div>
                            </div>
                            <div class="Chuyen-Xe__item">
                                <h4 class="Chuyen-Xe__item--name">Hà Đức Phước</h4>
                                <div class="Chuyen-Xe__item--status">
                                    <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                    <h5 class="Chuyen-Xe__item--status-lable">Chưa kiểm duyệt</h5>
                                </div>
                            </div>
                            <div class="Chuyen-Xe__item">
                                <h4 class="Chuyen-Xe__item--name">Trần Văn Tiến</h4>
                                <div class="Chuyen-Xe__item--status">
                                    <i class="fas fa-circle Chuyen-Xe__item--status-ICON"></i>
                                    <h5 class="Chuyen-Xe__item--status-lable">Chưa kiểm duyệt</h5>
                                </div>
                            </div>
                        </div>
                        <ul class="pagination_driver">
                            <li style={{ color: "#485AFF" }}>Trang</li>
                            <li class="pagination_driver-item pagination_driver-item--active"><a href="" class="pagination_driver-item__link">1</a></li>
                            <li class="pagination_driver-item"><a href="" class="pagination_driver-item__link">2</a></li>
                            <li class="pagination_driver-item"><a href="" class="pagination_driver-item__link">3</a></li>
                            <li class="pagination_driver-item"><a href="" class="pagination_driver-item__link">...</a></li>
                            <li class="pagination_driver-item"><a href="" class="pagination_driver-item__link">99</a></li>
                        </ul>
                    </div>
                    {/* <!-- Thông tin tài xế --> */}
                    <div id="Thong-tin-Chuyen-Xe">
                        <h4 className="informations_driver">Thông tin tài xế</h4>
                        <div class="Form-TTKD-Detail">
                            <div class="Form-TTKD__header">
                                <h2 class="Form-TTKD__header--name">Đoàn Trần Minh Khôi</h2>
                                <h3 class="Form-TTKD__header--Date">Ngày đăng ký:20/09/2021 4:20:00</h3>
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
                                        <li class="Info-Taixe__item">asdj98-asd9</li>
                                        <li class="Info-Taixe__item">24</li>
                                        <li class="Info-Taixe__item">Quận Sơn Trà, Đà Nẵng</li>
                                        <li class="Info-Taixe__item">1234567890</li>
                                        <li class="Info-Taixe__item">doantranminhkhoi@gmail.com</li>
                                    </ul>
                                </div>
                                <h3 class="Form-TTKD-Title-Major">Hình ảnh</h3>
                                <h3 class="Form-TTKD-Title-Major">Căn cước công dân/CMND</h3>
                                <div class="List-IMG-CCCD">
                                    <div class="IMG-CCCD__item">
                                        <h3 class="CCCD__item-title">Mặt trước</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                    <div class="IMG-CCCD__item">
                                        <h3 class="CCCD__item-title">Mặt sau</h3>
                                        <div >
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                </div>
                                <h3 class="Form-TTKD-Title-Major">Giấy phép lái xe</h3>
                                <div class="List-IMG-GPLX">
                                    <div class="IMG-GPLX__item">
                                        <h3 class="GPLX__item-title">Mặt trước</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                    <div class="IMG-GPLX__item">
                                        <h3 class="GPLX__item-title">Mặt sau</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                </div>
                                <h3 class="Form-TTKD-Title-Major">Giấy xét nghiệm COVID19 / Xác nhận đã tim Vaccine</h3>
                                <div class="List-IMG-GXN">
                                    <div class="IMG-GXN__item">
                                        <h3 class="GPLX__item-title-1">Mặt sau</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                    <div class="IMG-GXN__item">
                                        <h3 class="GPLX__item-title-1">Mặt sau</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                    <div class="IMG-GXN__item">
                                        <h3 class="GPLX__item-title-1">Mặt sau</h3>
                                        <div>
                                            <img src={logo} alt="" className="img_logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="BTN_Accuracy">
                                <button class="BTN_Accuracy__item BTN_Accuracy_cancel">Hủy</button>
                                <button class="BTN_Accuracy__item BTN_Accuracy__Duyet">Duyệt</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Driver_censorship));
