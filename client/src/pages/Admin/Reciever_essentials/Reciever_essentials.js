import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Reciever_essentials.css";
import SeeDetailsReciever_form from "./SeeDetailsReciever_form";

class Reciever_essentials extends React.Component {
    state = {
        SeeDetailsReciever: false
    }
    handleSeeDetailsReciever = () => {
        this.setState({
            SeeDetailsReciever: !this.state.SeeDetailsReciever
        })
    }
    render() {
        const { SeeDetailsReciever } = this.state;
        const check =
            SeeDetailsReciever === true ? (
                <SeeDetailsReciever_form exitModalSeeDetailsReciever_form={this.handleSeeDetailsReciever} />
            ) : (
                ""
            );
        return (
            <div id="Form_reciever_essentials">
                <h2 className="Form_reciever_essentials-Title">Quản lý nhận nhu yếu phẩm</h2>
                <div className="Block-Search-Filter">
                    <div className="content-search">
                        <h3 className="content-search__lable">Tìm kiếm</h3>
                        <input type="text" className="content-search__input" placeholder="Nhập để tìm kiếm" />
                    </div>
                    <div className="Filter_the_data_reciever">
                        <h3 className="Filter_the_data_reciever__lable">Lọc</h3>
                        <select name="" id="Filter_box_reciever" placeholder="tăng dần">
                            <option value="" className="Filter_box_reciever__item">tăng dần</option>
                            <option value="" className="Filter_box_reciever__item">Giảm dần</option>
                        </select>
                    </div>
                </div>
                <table id="table-ListGoods-Giver">
                    <tr>
                        <th>ID</th>
                        <th>Mã chuyến xe</th>
                        <th>Mã người nhận</th>
                        <th>Thời gian nhận</th>
                        <th>Xác nhận của chuyến xe</th>
                        <th>Xác nhận của người nhận</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>CX001</td>
                        <td>NN005</td>
                        <td>23/09/2021 4:20:00</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                            <p className="btn_view" onClick={() => this.handleSeeDetailsReciever()}>Xem chi tiết</p>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
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
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
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
                {check}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reciever_essentials));
