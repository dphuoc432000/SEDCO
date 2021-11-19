import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HistoryTable from './HistoryTable/HistoryTable';
import TableMainSubCss from './TableMainSub.module.css';
import {API_IMAGE_URL} from '../../../../../constants/api';
class TableMainSub extends Component {
    state={
        status: this.props.status,
    }
    render() {
        const {status} = this.state;
        return (
            <table className={TableMainSubCss.table_main__sub}>
                <tbody>
                    <tr>
                        <th className={TableMainSubCss.tb_main_sub_column_title}>Ghi chú</th>
                        <td className={TableMainSubCss.tb_main_sub_column_data}>{status.detail.note}</td>
                    </tr>
                    <tr>
                        <th className={TableMainSubCss.tb_main_sub_column_title}>Hình ảnh</th>
                        <td className={TableMainSubCss.tb_main_sub_column_data}>
                            <img style={{width: '130px'}} src={status.detail.picture && `${API_IMAGE_URL}/${status.detail.picture}`} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <th className={TableMainSubCss.tb_main_sub_column_title__history} colSpan='2'>Lịch sử</th>
                    </tr>
                    <tr className={TableMainSubCss.tb_main_sub_row__history_data}>
                        <td colSpan='2'>
                            <HistoryTable status = {this.props.status}/>
                        </td>
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TableMainSub))
