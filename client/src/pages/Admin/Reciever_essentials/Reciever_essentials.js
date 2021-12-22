import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RecieverEssentialsCss from "./Reciever_essentials.module.css";
import BasicPagination from '../../../components/Pagination/Pagination';
import Row from "./Row/Row";
import {get_status_list_by_type_have_filter_action} from '../../../stores/actions/status_list.action'
import {GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS} from '../../../constants/actions'
class Reciever_essentials extends React.Component {
    state = {
        status_list: [],
        pagination: {
            _limit: 1,
            _page:1,
            totalRows:1
        },
        status_completed: ''
    }
    componentDidMount = async ()=>{
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('RECEIVER',this.state.status_completed,5,1);
        if(get_status_list_by_type_have_filter_action.type === GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS){
            const statusListReducer = await this.props.statusListReducer
            this.setState({
                status_list: statusListReducer.status_list,
                pagination: statusListReducer.pagination
            })
        }
    }
    
    handleChangePage = async (value) =>{
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('RECEIVER',this.state.status_completed,5,value);
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
        const get_status_list_by_type_have_filter_action = await this.props.get_status_list_by_type_have_filter_action('RECEIVER',value,5,1);
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
        const {status_list, pagination, status_completed} = this.state;
        return (
            <React.Fragment>
                <div className={RecieverEssentialsCss.content_Title}>
                    <h2>Quản lý nhận nhu yếu phẩm</h2>
                </div>
                <div id={RecieverEssentialsCss.Form_reciever_essentials}>
                    <div className={RecieverEssentialsCss.search_filter_container} >
                        {/*<div className={RecieverEssentialsCss.search_form}>
                            <input type="text" className={RecieverEssentialsCss.search_form__input} placeholder="Tìm kiếm" />
                        </div>*/}
                        <div className={RecieverEssentialsCss.filter_form}>
                            <select name="status_completed" value={status_completed} onChange={(event) =>{this.handleChangeFilter(event)}} className={RecieverEssentialsCss.filter_form__input} placeholder="Trạng thái">
                                <option value="" className={RecieverEssentialsCss.filter_item}>Tất cả trạng thái</option>
                                <option value="true" className={RecieverEssentialsCss.filter_item}>Đã hoàn thành</option>
                                <option value="false" className={RecieverEssentialsCss.filter_item}>Chưa hoàn thành</option>
                            </select>
                        </div>
                    </div>
                    <table className={RecieverEssentialsCss.table_main}>
                        <tbody>
                            <tr className={RecieverEssentialsCss.table_main_row_header}  style={{ backgroundColor: "#ccc" }}>
                                <th>Mã tài khoản</th>
                                <th>Mã trạng thái</th>
                                <th>Thời gian tạo</th>
                                {/*Trạng thái đã hoàn thành, chưa hoàn thành, đã được đăng ký */}
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                            {
                                status_list.map(status =>{
                                    return <Row status={status} key={status._id}/>
                                })
                            }
                        </tbody>                        
                    </table>
                    <div className={RecieverEssentialsCss.pagination_container}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reciever_essentials));
