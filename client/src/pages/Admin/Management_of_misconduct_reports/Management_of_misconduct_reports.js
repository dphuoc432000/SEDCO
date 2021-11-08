import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Management_of_misconduct_reports.css";

class Management_of_misconduct_reports extends React.Component {
    render() {
        return (
            <div id="QL-Report-Form">
                <h2 class="QL-Report-Form-Title">Quản lý báo cáo sai phạm</h2>
                <div class="Block-Search-Filter">
                    <div class="content-search">
                        <h3 class="content-search__lable">Tìm kiếm</h3>
                        <input type="text" class="content-search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div class="Filter_the_data_report">
                        <h3 class="Filter_the_data_report__lable">Lọc</h3>
                        <select name="" id="Filter_box_report" placeholder="tăng dần">
                            <option value="" class="Filter_box_report__item">tăng dần</option>
                            <option value="" class="Filter_box_report__item">Giảm dần</option>
                        </select>
                    </div>
                </div>
                <table id="table-ListGoods-Giver">
                    <tr>
                        <th>Mã báo cáo</th>
                        <th>Mã status</th>
                        <th>Mã người dùng</th>
                        <th>Mô tả</th>
                        <th>Thời gian</th>
                    </tr>
                    <tr>
                        <td>RP001</td>
                        <td>025A</td>
                        <td>CX001</td>
                        <td>NN005</td>
                        <td>23/09/2021 4:20:00</td>
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
                <ul class="pagination">
                    <li style={{ color: "#485AFF" }}>Trang</li>
                    <li class="pagination-item pagination-item--active"><a href="" class="pagination-item__link">1</a></li>
                    <li class="pagination-item"><a href="" class="pagination-item__link">2</a></li>
                    <li class="pagination-item"><a href="" class="pagination-item__link">3</a></li>
                    <li class="pagination-item"><a href="" class="pagination-item__link">...</a></li>
                    <li class="pagination-item"><a href="" class="pagination-item__link">99</a></li>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Management_of_misconduct_reports));
