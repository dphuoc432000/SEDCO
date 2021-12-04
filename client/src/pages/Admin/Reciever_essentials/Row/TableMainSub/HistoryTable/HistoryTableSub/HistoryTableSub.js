import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HistoryTableSubCss from './HistoryTableSub.module.css';
import getEssentials from './../../../../../../../stores/actions/essentials.action';

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class HistoryTableSub extends Component {
    state={
        history_receiver: this.props.history_receiver,
        essentials : [],
    }
    componentDidMount = async () => {
       
        await this.props.getEssentials();
        const essentialsReducer = this.props.essentialsReducer.essentials;
        const essentials_history_receiver = this.props.history_receiver.essentials;
        console.log(essentials_history_receiver);
        const essentials_map = essentials_history_receiver.map((essential) =>{
            const object = {};
            essentialsReducer.find(item => {
                if(item._id === essential.essential_id ){
                    object.quantity = essential.quantity;
                    object.essential_id = essential.essential_id;
                    object.name = item.name;
                    object.unit = item.unit;
                }
                return item._id === essential.essential_id;
                
            })
            return object;
        })
        this.setState({
            essentials : essentials_map ,
        })
    }
    render() {
        const {history_receiver , essentials } = this.state;
        return (
            <table className={HistoryTableSubCss.history_table__sub}>
                <tbody>
                    <tr>
                        <th style={{width: '200px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Nhu yếu phẩm</th>
                        <th style={{width: '100px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Đơn vị</th>
                        <th style={{width: '100px'}} className={HistoryTableSubCss.ht_tb_sub_column_title}>Hỗ trợ</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Thời gian</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Xác nhận <br/> chuyến xe</th>
                        <th className={HistoryTableSubCss.ht_tb_sub_column_title}>Xác nhận <br/> receiver</th>
                    </tr>
                    {essentials.length > 0 ? (essentials.map(essential => {
                        return(
                            <tr key={essential.essential_id}>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{essential.name}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{essential.unit}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{essential.quantity}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{converJsonDateToDate(history_receiver.receiver_time)}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_receiver.car_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_receiver.receiver_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                            </tr>
                        )
                         }))
                        : 
                        (
                            <tr >
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>chưa xác nhận</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>chưa xác nhận</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>chưa xác nhận</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{converJsonDateToDate(history_receiver.receiver_time)}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_receiver.car_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                                    <td className={HistoryTableSubCss.ht_tb_sub_column_data}>{history_receiver.receiver_confirm?'Đã xác nhận':'Chưa xác nhận'}</td>
                            </tr>
                        )
                
                    }
                    
                </tbody>
            </table>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        essentialsReducer : state.essentialsReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        getEssentials : async () => {
            const action = await getEssentials()
            return dispatch(action);
        },
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HistoryTableSub))
