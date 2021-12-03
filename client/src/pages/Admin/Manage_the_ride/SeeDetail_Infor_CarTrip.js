import React from "react";
import "./Manage_the_ride.css";
import {API_IMAGE_URL} from '../../../constants/api'
class SeeDetail_Infor_CarTrip extends React.Component {

    render() {
        const cartrip_infor = this.props.cartrip_infor;
        const ngaynhan = this.props.cartrip_infor.detail.start_receive_time;
        const ngayvanchuyen = this.props.cartrip_infor.detail.departure_time;
        const location_start = this.props.cartrip_infor.detail.location_start;
        const location_finish = this.props.cartrip_infor.detail.location_finish;
        const note = this.props.cartrip_infor.detail.note;
        const matrangthai = this.props.cartrip_infor._id;
        const manguoidung = this.props.cartrip_infor.user._id;
        const date = this.props.cartrip_infor.createdAt;
        const bienso = this.props.cartrip_infor.detail.car.license_plate;
        const trongtai = this.props.cartrip_infor.detail.car.tonnage;
        const songuoi = this.props.cartrip_infor.detail.car.many_people;
        const picture = this.props.cartrip_infor.detail.picture;
        const todate = new Date(date).getDate();
        const tomonth =
          new Date(date).getMonth() + 1;
        const toyear = new Date(
            date
        ).getFullYear();
        const original_time =
          todate +
          "/" +
           tomonth +
          "/" +
          toyear;

          const todate_start_receive = new Date(ngaynhan).getDate();
          const tomonth_start_receive =
            new Date(ngaynhan).getMonth() + 1;
          const toyear_start_receive = new Date(
              ngaynhan
          ).getFullYear();
          const original_start_receive_time =
            tomonth_start_receive +
            "/" +
            todate_start_receive +
            "/" +
            toyear_start_receive;
      
          const todate_departure_time = new Date(ngayvanchuyen).getDate();
          const tomonth_departure_time =
            new Date(ngayvanchuyen).getMonth() + 1;
          const toyear_departure_time = new Date(ngayvanchuyen).getFullYear();
          const original_departure_time =
            tomonth_departure_time +
            "/" +
            todate_departure_time +
            "/" +
            toyear_departure_time;
        return (
            <div id="Car_trips_information">
                <h4 className="Information_car_trips">Thông tin chi tiết chuyến xe</h4>
                <div className="Rides_management_form">
                    <div className="Rides_management_form_header">
                        <h2 className="Rides_management_form_header--name">{cartrip_infor.user.full_name}</h2>
                        <div className="Rides_management_form_header--Status">
                            <h3 className="Rides_management_form_header--Date">{`Ngày đăng ký : ${original_time} `}</h3>
                            {/* <div className="Status_of_the_ride">
                                <i className="fas fa-circle Rides_management_form_header--Status-ICON" style={{ color: "#A3cb38" }}></i>
                                <h3 className="Rides_management_form_header--Status-lable">Chưa bắt đầu</h3>
                            </div> */}
                        </div>
                    </div>
                    <div className="Form-QLCX-Detail">
                        <div className="Form-QLCX__container">
                            <h3 className="Form-QLCX-Title-Major">Thông tin chuyến xe</h3>
                            <div>
                                <div className="Manage_the_ride_form_list">
                                    <ul className="List_Infor_car_trips">
                                        <li className="Infor-Chuyen-Xe__item">Thời gian nhận nhu yếu phẩm:</li>
                                        <li className="Infor-Chuyen-Xe__item">Thời gian khởi hành:</li>
                                        <li className="Infor-Chuyen-Xe__item">Vị trí khởi hành:</li>
                                        <li className="Infor-Chuyen-Xe__item">Vị trí đến:</li>
                                        <li className="Infor-Chuyen-Xe__item">Mã trạng thái:</li>
                                        <li className="Infor-Chuyen-Xe__item">Ghi chú:</li>
                                    </ul>
                                    <ul className="List_detail_Infor_car_trips">
                                        <li className="Infor-Chuyen-Xe__item">{original_start_receive_time}</li>
                                        <li className="Infor-Chuyen-Xe__item">{original_departure_time}</li>
                                        <li className="Infor-Chuyen-Xe__item">{location_start}</li>
                                        <li className="Infor-Chuyen-Xe__item">{location_finish}</li>
                                        <li className="Infor-Chuyen-Xe__item">{matrangthai}</li>
                                        <li className="Infor-Chuyen-Xe__item">{note}</li>
                                    </ul>
                                </div>
                                <h3 className="Form-QLCX-Title-Major">Thông tin xe</h3>
                                <div className="Manage_the_ride_form_list">
                                    <ul className="List_Infor_car_trips">
                                        <li className="Infor-Chuyen-Xe__item">Mã người dùng:</li>
                                        <li className="Infor-Chuyen-Xe__item">Biển số:</li>
                                        <li className="Infor-Chuyen-Xe__item">Trọng tải:</li>
                                        <li className="Infor-Chuyen-Xe__item">Số người đi:</li>
                                    </ul>
                                    <ul className="Sub_list_detail_Infor_car_trips">
                                        <li className="Infor-Chuyen-Xe__item">{manguoidung}</li>
                                        <li className="Infor-Chuyen-Xe__item">{bienso}</li>
                                        <li className="Infor-Chuyen-Xe__item">{trongtai}</li>
                                        <li className="Infor-Chuyen-Xe__item">{songuoi}</li>
                                    </ul>

                                    <div className="IMG_driver">
                                        <h3 className="lable_img_driver">Hình ảnh</h3>
                                        <img  src={`${API_IMAGE_URL}/${picture}`} alt="" className="img_of_driver" />
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
export default SeeDetail_Infor_CarTrip;