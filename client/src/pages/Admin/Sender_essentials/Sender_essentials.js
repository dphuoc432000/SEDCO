import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Sender_essentials.css";
import SeeDetailsSender_form from "./SeeDetailsSender_form";


class Sender_essentials extends React.Component {
    state = {
        SeeDetailsSender: false
    }
    handleSeeDetailsSender = () => {
        this.setState({
            SeeDetailsSender: !this.state.SeeDetailsSender
        })
    }
    render() {
        const { SeeDetailsSender } = this.state;
        const check =
        SeeDetailsSender === true ? (
                <SeeDetailsSender_form exitModalSeeDetailsSender_form={this.handleSeeDetailsSender} />
            ) : (
                ""
            );
        return (
            <div id="QL-HoTro-NYP-Form">    
                <h2 class="QL-Nhan-NYP-Form-Title">Quản lý hỗ trợ nhu yếu phẩm</h2>
                <div class="Block-Search-Filter">
                    <div class="content-search">
                       <h3 class="content-search__lable">Tìm kiếm</h3> 
                       <input type="text" class="content-search__input" placeholder="Nhập để tìm kiếm"/>
                   </div>   
                   <div class="Filter_the_data_sender">
                       <h3 class="Filter_the_data_sender__lable">Lọc</h3> 
                       <select name="" id="Filter_box_sender" placeholder="tăng dần">
                           <option value="" class="Filter_box_sender__item">tăng dần</option>
                           <option value="" class="Filter_box_sender__item">Giảm dần</option>
                       </select>
                   </div> 
               </div>
               <table id="table-ListGoods-Giver">
                <tr>
                    <th>ID</th>
                    <th>Mã chuyến xe</th>
                    <th>Mã người gửi</th>
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
                        <p className="btn_view" onClick={() => this.handleSeeDetailsSender()}>Xem chi tiết</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sender_essentials));
