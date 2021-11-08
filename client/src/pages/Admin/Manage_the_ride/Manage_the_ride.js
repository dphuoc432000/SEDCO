import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Manage_the_ride.css";
import logo from '../../../assets/images/logo.png';

class Manage_the_ride extends React.Component {
    render() {
        return (
            <div class="Content_Manage_the_ride">
                <h2 class="content-Title">Quản lý chuyến xe</h2>
                <div class="Block-Search-Filter">
                    <div class="content-search">
                        <h3 class="content-search__lable">Tìm kiếm</h3>
                        <input type="text" class="content-search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div class="Filter_the_data">
                        <h3 class="Filter_the_data_lable">Lọc</h3>
                        <select name="" id="Filter_data" placeholder="tăng dần">
                            <option value="" class="Filter_data__item">tăng dần</option>
                            <option value="" class="Filter_data__item">Giảm dần</option>
                        </select>
                    </div>
                </div>
                <div className="Data_content_manage_the_ride">
                    <div id="Car_list">
                        {/* <!-- Danh sách chuyến xe --> */}
                        <h4 className="Car_trips">Các chuyến xe</h4>
                        <div id="List_Car_trips">
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#A3cb38" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Chưa bắt đầu</h5>
                                </div>
                            </div>
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#009432" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Đã bắt đầu</h5>
                                </div>
                            </div>
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#009432" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Đã bắt đầu</h5>
                                </div>
                            </div>
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#A3cb38" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Chưa bắt đầu</h5>
                                </div>
                            </div>
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#808E9B" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Đã kết thúc</h5>
                                </div>
                            </div>
                            <div class="Car_trips_item">
                                <h4 class="Car_trips_item--name">CX001</h4>
                                <div class="Car_trips_item--status">
                                    <i class="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#A3cb38" }}></i>
                                    <h5 class="Car_trips_item--status-lable" >Chưa bắt đầu</h5>
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
                    {/* <!-- Thông tin chuyến xe --> */}
                    <div id="Car_trips_information">
                        <h4 className="Information_car_trips">Thông tin chuyến xe</h4>
                        <div className="Rides_management_form">
                            <div class="Rides_management_form_header">
                                <h2 class="Rides_management_form_header--name">CX001</h2>
                                <div class="Rides_management_form_header--Status">
                                    <h3 class="Rides_management_form_header--Date">Ngày đăng ký :20/09/2021 4:20:00</h3>
                                    <div className="Status_of_the_ride">
                                        <i class="fas fa-circle Rides_management_form_header--Status-ICON" style={{ color: "#A3cb38" }}></i>
                                        <h3 class="Rides_management_form_header--Status-lable">Chưa bắt đầu</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="Form-QLCX-Detail">
                                <div class="Form-QLCX__container">
                                    <h3 class="Form-QLCX-Title-Major">Thông tin chuyến xe</h3>
                                    <div>
                                        <div className="Manage_the_ride_form_list">
                                            <ul class="List_Infor_car_trips">
                                                <li class="Infor-Chuyen-Xe__item">Thời gian nhận nhu yếu phẩm:</li>
                                                <li class="Infor-Chuyen-Xe__item">Thời gian khởi hành:</li>
                                                <li class="Infor-Chuyen-Xe__item">Vị trí khởi hành:</li>
                                                <li class="Infor-Chuyen-Xe__item">Vị trí đến:</li>
                                                <li class="Infor-Chuyen-Xe__item">Mã trạng thái:</li>
                                                <li class="Infor-Chuyen-Xe__item">Ghi chú:</li>
                                            </ul>
                                            <ul class="List_detail_Infor_car_trips">
                                                <li class="Infor-Chuyen-Xe__item">19/09/2021 15:52:00</li>
                                                <li class="Infor-Chuyen-Xe__item">20/09/2021 7:20:00</li>
                                                <li class="Infor-Chuyen-Xe__item">PhườngVĩnh Điện ,TX Điện Bàn, Tỉnh Quảng Nam</li>
                                                <li class="Infor-Chuyen-Xe__item">Phường Hòa Cường Nam ,Quận Hải Châu , TP Đà Nẵng</li>
                                                <li class="Infor-Chuyen-Xe__item">TH001</li>
                                                <li class="Infor-Chuyen-Xe__item">xe cần đi sớm</li>
                                            </ul>
                                        </div>
                                        <h3 class="Form-QLCX-Title-Major">Thông tin xe</h3>
                                        <div className="Manage_the_ride_form_list">
                                            <ul class="List_Infor_car_trips">
                                                <li class="Infor-Chuyen-Xe__item">Mã người dùng:</li>
                                                <li class="Infor-Chuyen-Xe__item">Biển số:</li>
                                                <li class="Infor-Chuyen-Xe__item">Trọng tải:</li>
                                                <li class="Infor-Chuyen-Xe__item">Số người đi:</li>
                                            </ul>
                                            <ul class="Sub_list_detail_Infor_car_trips">
                                                <li class="Infor-Chuyen-Xe__item">US01</li>
                                                <li class="Infor-Chuyen-Xe__item">43A1 66868</li>
                                                <li class="Infor-Chuyen-Xe__item">2 Tấn</li>
                                                <li class="Infor-Chuyen-Xe__item">2</li>
                                            </ul>
                                            
                                            <div class="IMG_driver">
                                            <h3 className="lable_img_driver">Hình ảnh</h3>
                                                <img src={logo} alt="" className="img_of_driver" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manage_the_ride));
