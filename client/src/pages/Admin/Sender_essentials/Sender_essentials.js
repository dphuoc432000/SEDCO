import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SenderEssentialsCss from './Sender_essentials.module.css';
import './Sender_essentials.module.css';
import BasicPagination from '../../../components/Pagination/Pagination';
import Row from "./Row/Row";
import {get_status_list_by_type_have_filter_action} from '../../../stores/actions/status_list.action'
import {GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS} from '../../../constants/actions'

class Sender_essentials extends React.Component {
    state = {
        status_list:[],
        pagination:{
            _limit: 1,
            _page: 1,
            totalRows: 1
        },
        status_completed: ''
    }
    componentDidMount = async ()=>{
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('SENDER',this.state.status_completed,5,1);
        if(get_status_list_by_type_have_filter_action.type === GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS){
            const statusListReducer = await this.props.statusListReducer
            this.setState({
                status_list: statusListReducer.status_list,
                pagination: statusListReducer.pagination
            })
        }
    }
    
    handleChangePage = async (value) =>{
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('SENDER',this.state.status_completed,5,value);
        if(get_status_list_by_type_have_filter_action.type === GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS){
            const statusListReducer = await this.props.statusListReducer
            this.setState({
                status_list: statusListReducer.status_list,
                pagination: statusListReducer.pagination
            })
        }
    }
    handleChangeFilter = async (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('SENDER',value,5,1);
        if(get_status_list_by_type_have_filter_action.type === GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS){
            const statusListReducer = await this.props.statusListReducer
            this.setState({
                status_list: statusListReducer.status_list,
                pagination: statusListReducer.pagination,
                [name]: value
            })
        }
    }

    render() {
        const { status_list, pagination, status_completed } = this.state;
        // console.log(this.props)
        return (
            <React.Fragment>
                <div className={SenderEssentialsCss.content_Title}>
                    <h2 >Quản lý hỗ trợ nhu yếu phẩm</h2>
                </div>
                <div className={SenderEssentialsCss.form_sender_essentials}>
                    <div className={SenderEssentialsCss.search_filter_container} >
                        {/*<div className={SenderEssentialsCss.search_form}>
                            <input type="text" className={SenderEssentialsCss.search_form__input} placeholder="Tìm kiếm" />
                        </div>*/}
                        <div className={SenderEssentialsCss.filter_form}>
                            <select name="status_completed" value={status_completed} onChange={(event) =>{this.handleChangeFilter(event)}} className={SenderEssentialsCss.filter_form__input} placeholder="Trạng thái">
                                <option value="" className={SenderEssentialsCss.filter_item}>Tất cả trạng thái</option>
                                <option value="true" className={SenderEssentialsCss.filter_item}>Đã hoàn thành</option>
                                <option value="false" className={SenderEssentialsCss.filter_item}>Chưa hoàn thành</option>
                            </select>
                        </div>
                    </div>
                    <table className={SenderEssentialsCss.table_main}>
                        <tbody>
                            <tr className={SenderEssentialsCss.table_main_row_header}  style={{ backgroundColor: "#ccc" }}>
                                <th>Mã tài khoản</th>
                                <th>Mã trạng thái</th>
                                <th>Thời gian tạo</th>
                                {/*Trạng thái đã hoàn thành, chưa hoàn thành, đã được đăng ký */}
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                            {
                                status_list.map(status =>{
                                    return <Row status={status} key={status._id} />
                                })
                            }
                        </tbody>
                    </table>
                    <div className={SenderEssentialsCss.pagination_container}>
                        <BasicPagination 
                            count={Math.ceil(pagination.totalRows / pagination._limit)}
                            handleChangePage = {this.handleChangePage}
                        />
                    </div>
                </div>
            </React.Fragment>

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
        get_status_list_by_type_have_filter_action: async(status_type, status_completed,_lmit,_page) =>{
            const action = await get_status_list_by_type_have_filter_action(status_type, status_completed,_lmit,_page);
            return dispatch(action)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sender_essentials));
