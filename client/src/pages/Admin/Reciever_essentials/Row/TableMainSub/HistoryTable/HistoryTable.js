import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HistoryTableCss from './HistoryTable.module.css';
import HistoryTableSub from './HistoryTableSub/HistoryTableSub';
import {get_all_history_of_receiver_status_action} from '../../../../../../stores/actions/status_list.action';
import {GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS} from '../../../../../../constants/actions';
import HistoryRow from './HistoryRow/HistoryRow';
class HistoryTable extends Component {
    state={
        status: this.props.status,
        history_receiver_list: [],
        pagination:{}
    }
    componentDidMount = async () =>{
        const {status} = this.state;
        const get_all_history_of_receiver_status_action = await this.props.get_all_history_of_receiver_status_action(status.detail._id);
        if(get_all_history_of_receiver_status_action.type === GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS ){
            const statusListReducer = this.props.statusListReducer;
            this.setState({
                history_receiver_list: statusListReducer.history_receiver_list,
                pagination: statusListReducer.pagination_history_receiver_status
            })
        }
    }
    render() {
        const { history_receiver_list, pagination} = this.state
        return (
            <table className={HistoryTableCss.history_table}>
                <tbody>
                    <tr>
                        <th className={HistoryTableCss.ht_tb_column_title}>Mã chuyến xe</th>
                        <th className={HistoryTableCss.ht_tb_column_title}></th>
                    </tr>
                    {
                        history_receiver_list.map(history =>{
                            return <HistoryRow history_receiver={history} key={history._id}/>
                        })
                    }
                   
                </tbody>
            </table>
        )
    }
}

//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        statusListReducer: state.statusListReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_all_history_of_receiver_status_action: async (receiver_status_id, _limit ,_page) =>{
            const action = await get_all_history_of_receiver_status_action(receiver_status_id, _limit ,_page);
            return dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HistoryTable))
