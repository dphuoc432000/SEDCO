import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Manage_the_ride.css";
import logo from '../../../assets/images/logo.png';
import { get_list_role_is_cartrip } from '../../../stores/actions/car_trip.action'
import SeeDetail_Infor_CarTrip from './SeeDetail_Infor_CarTrip'
class Manage_the_ride extends React.Component {
    state = {
        seeDetailCartrip: false,
        list_info_role_is_cartrip: [],
        cartrip_infor: {},
    }
    componentDidMount = async () => {


        await this.props.get_list_role_is_cartrip(20, 1);

        console.log('check', this.props.carTripReducer.list_info_role_is_cartrip);
        this.setState({
            list_info_role_is_cartrip: this.props.carTripReducer.list_info_role_is_cartrip,
        })
    }

    handleShowSeeDetailCartrip = (car_infor) => {
        this.setState({
            seeDetailCartrip: true,
            cartrip_infor: car_infor
        })
    }
    render() {
        let { seeDetailCartrip, list_info_role_is_cartrip, cartrip_infor } = this.state;
        console.log('check infor list car', list_info_role_is_cartrip);

        return (
            <React.Fragment>
                <div className="content_Title">
                    <h2 >Quản lý chuyến xe</h2>
                </div>
                <div className="Content_Manage_the_ride">
                    <div className="Block-Search-Filter">
                        <div className="content-search">
                            <h3 className="content-search__lable">Tìm kiếm</h3>
                            <input type="text" className="content-search__input" placeholder="Nhập để tìm kiếm" />
                        </div>
                        <div className="Filter_the_data">
                            <h3 className="Filter_the_data_lable">Lọc</h3>
                            <select name="" id="Filter_data" placeholder="tăng dần">
                                <option value="" className="Filter_data__item">tăng dần</option>
                                <option value="" className="Filter_data__item">Giảm dần</option>
                            </select>
                        </div>
                    </div>
                    <div className="Data_content_manage_the_ride">
                        <div id="Car_list">
                            {/* <!-- Danh sách chuyến xe --> */}
                            <h4 className="Car_trips">Các chuyến xe</h4>
                            <div id="List_Car_trips">
                                {list_info_role_is_cartrip && list_info_role_is_cartrip.map(car_infor => {
                                    return (
                                        <div className="Car_trips_item" onClick={() => { this.handleShowSeeDetailCartrip(car_infor) }}>
                                            <div>
                                                <h4 className="Car_trips_item--name">{car_infor.user.full_name}</h4>
                                                <div className="Car_trips_item--status">
                                                    <i className="fas fa-circle Car_trips_item--status-ICON" style={{ color: "#A3cb38" }}></i>
                                                    <h5 className="Car_trips_item--status-lable" >{car_infor.status_completed === true ? 'Đã vận chuyển' : 'Chưa vận chuyển'}</h5>
                                                </div>
                                            </div>
                                            

                                        </div>
                                    )

                                })}


                            </div>
                        </div>
                        {seeDetailCartrip && cartrip_infor &&
                            <SeeDetail_Infor_CarTrip cartrip_infor={cartrip_infor} />
                        }
                    </div>
                </div>

               

            </React.Fragment>

        )

    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        carTripReducer: state.carTripReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_list_role_is_cartrip: async () => {
            const action = await get_list_role_is_cartrip()
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manage_the_ride));
