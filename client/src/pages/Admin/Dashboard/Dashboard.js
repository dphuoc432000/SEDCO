import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Dashboard.css";
// import "../Sidebar.css";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="content_Dashboard">
                <h2 class="content_Title">Trang chủ</h2>
                <div class="content_List_box">
                    <div class="Box_item" style={{ backgroundColor: "#4A69BD" }} >
                        <h2 class="Box_item__number" >
                            1647
                        </h2>
                        <h3 class="Box_item__status">
                            Tổng trạng thái
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#FED330" }} >
                        <h2 class="Box_item__number">
                            172
                        </h2>
                        <h3 class="Box_item__status">
                            Đang chờ nhận
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#EE5A24" }} >
                        <h2 class="Box_item__number">
                            287
                        </h2>
                        <h3 class="Box_item__status">
                            Đang chờ hỗ trợ
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#A3CB38" }} >
                        <h2 class="Box_item__number">
                            94
                        </h2>
                        <h3 class="Box_item__status">
                            Chưa vận chuyển
                        </h3>
                    </div>
                    <div class="Box1_item" >
                        <h2 class="Box_item__number">
                            668
                        </h2>
                        <h3 class="Box_item__status">
                            Đã nhận
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#FFA801" }} >
                        <h2 class="Box_item__number">
                            234
                        </h2>
                        <h3 class="Box_item__status">
                            Đã nhận
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#EA2027" }} >
                        <h2 class="Box_item__number">
                            581
                        </h2>
                        <h3 class="Box_item__status">
                            Đã hỗ trợ
                        </h3>
                    </div>
                    <div class="Box_item" style={{ backgroundColor: "#009432" }} >
                        <h2 class="Box_item__number">
                            288
                        </h2>
                        <h3 class="Box_item__status">
                            Đang vận chuyển
                        </h3>
                    </div>
                </div>
                <div className="content_form" >
                    <div class="form_search">
                        <h3 class="form_search__lable">Tìm kiếm</h3>
                        <input type="text" class="form_search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div class="form_list">
                        <h3 class="filter_data_dashboard">Lọc</h3>
                        <div>
                            <select id="box_filter" placeholder="tăng dần">
                                <option value="" class="box_filter_item">tăng dần</option>
                                <option value="" class="box_filter_item">Giảm dần</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table id="table_ListGoods_Giver_dashboard">
                    <tr style={{ backgroundColor: "#ccc" }}>
                        <th>ID</th>
                        <th style={{ width: "35%" }}>Mã người tạo</th>
                        <th>Loại trạng thái</th>
                        <th>Thời gian tạo</th>
                        <th>Hoàn thành</th>
                    </tr>
                    <tr>
                        <td>65686525</td>
                        <td>M65</td>
                        <td>Người gửi</td>
                        <td>12/09/2021 12:20:00</td>
                        <td>Đã hoàn thành</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <ul class="pagination_dashboard">
                    <li style={{ color: "#485AFF" }}>Trang</li>
                    <li class="pagination_dashboard-item pagination_dashboard-item--active"><a href="" class="pagination_dashboard-item__link">1</a></li>
                    <li class="pagination_dashboard-item"><a href="" class="pagination_dashboard-item__link">2</a></li>
                    <li class="pagination_dashboard-item"><a href="" class="pagination_dashboard-item__link">3</a></li>
                    <li class="pagination_dashboard-item"><a href="" class="pagination_dashboard-item__link">...</a></li>
                    <li class="pagination_dashboard-item"><a href="" class="pagination_dashboard-item__link">99</a></li>
                </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
