import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Account_management.css";

class Account_management extends React.Component {
    render() {
        return (
            <div id="Account_manager_content">
                <h2 className="Account_manager_content-Title">Quản lý tài khoản</h2>
                <div className="Block-Search-Filter" style={{ color: "#36ce80" }}>
                    <div className="content-search">
                        <h3 className="content-search__lable">Tìm kiếm</h3>
                        <input type="text" className="content-search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div className="Filter_data_account">
                        <h3 className="Filter_data_account__lable">Lọc</h3>
                        <select name="" id="Filter_box_account" placeholder="tăng dần">
                            <option value="" className="Filter_box_account__item">tăng dần</option>
                            <option value="" className="Filter_box_account__item">Giảm dần</option>
                        </select>
                    </div>
                </div>
                <table id="table-ListGoods-Giver" >
                    <tr>
                        <th>Mã tài khoản</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Mã người dùng</th>
                        <th>Mã vai trò</th>
                        <th></th>

                    </tr>
                    <tr>
                        <td>TK001</td>
                        <td>HaDucPhuoc</td>
                        <td>DucPhuoc231</td>
                        <td>US001</td>
                        <td>1</td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><a href="" className="btn_Delete">Xóa</a></td>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account_management));
