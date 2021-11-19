import React, { Component } from 'react'
import { withRouter } from 'react-router';
import HistoryTableCss from '../HistoryTable.module.css';
import HistoryTableSub from '../HistoryTableSub/HistoryTableSub';
class HistoryRow extends Component {
    state={
        showHistoryTableSub: false,
        history: this.props.history_receiver
    }
    handleShowHistoryTableSub = () =>{
        this.setState({
            showHistoryTableSub: !this.state.showHistoryTableSub
        })
    }
    render() {
        const {history,showHistoryTableSub} = this.state;
        return (
            <React.Fragment key={history._id}>
                <tr>
                    <td className={HistoryTableCss.ht_tb_column_data}>{history.car_status_id}</td>
                    <td className={HistoryTableCss.ht_tb_column_action}><p className={HistoryTableCss.btn_information} onClick={()=> {this.handleShowHistoryTableSub()}}>{showHistoryTableSub?'Đóng':'Chi tiết'}</p></td>
                </tr>
                {
                    showHistoryTableSub &&
                    <tr className={HistoryTableCss.ht_tb_row__history_table_sub}>
                        <td colSpan='3'>
                            <HistoryTableSub history_receiver={history}/>
                        </td>
                    </tr>
                }
            </React.Fragment>
        )
    }
}
export default withRouter(HistoryRow)
