import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HistoryTableSubCss from './HistoryTableSub.module.css';

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class HistoryTableSub extends Component {
    state={
        history_sender: this.props.history_sender,
    }
    render() {
        const {history_sender} = this.state;
        return (
            <table className={HistoryTableSubCss.history_table__sub}>
                <tbody>
                    <tr>
                        <th style={{width: '200px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Nhu yếu phẩm</th>
                        <th style={{width: '100px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Đơn vị</th>
                        <th style={{width: '100px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Nhận</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Thời gian</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Xác nhận <br/> chuyến xe</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Xác nhận <br/> người dùng</th>
                    </tr>
                    <tr>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>Chưa làm essential list</td>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>Chưa làm essential list</td>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>Chưa làm essential list</td>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{converJsonDateToDate(history_sender.sender_time)}</td>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_sender.car_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                        <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_sender.sender_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                    </tr>
                </tbody>
            </table>
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HistoryTableSub))
