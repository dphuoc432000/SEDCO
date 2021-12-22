import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {get_report_list_have_filter_action} from '../../../stores/actions/report.action';
import {GET_REPORT_LIST_HAVE_FILTER_SUCCESS} from '../../../constants/actions';
import Management_of_misconduct_reportCss from "./Management_of_misconduct_report.module.css";
import BasicPagination from '../../../components/Pagination/Pagination';
import Row from "./Row/Row";
function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class Management_of_misconduct_reports extends React.Component {
    state ={
        report_list: [],
        pagination: {},
        sort: '-'
    }
    componentDidMount = async () =>{
        const get_report_list_have_filter_action = await this.props.get_report_list_have_filter_action('-', 5,1)
        if(get_report_list_have_filter_action.type === GET_REPORT_LIST_HAVE_FILTER_SUCCESS){
            const reportListReducer = await this.props.reportListReducer;
            this.setState({
                report_list: reportListReducer.report_list,
                pagination: reportListReducer.pagination
            })
        }
    }
    handleChangeSort = async(event) =>{
        const name = event.target.name;
        const value = event.target.value;
        const get_report_list_have_filter_action = await this.props.get_report_list_have_filter_action(value, 5,1)
        if(get_report_list_have_filter_action.type === GET_REPORT_LIST_HAVE_FILTER_SUCCESS){
            const reportListReducer = await this.props.reportListReducer;
            this.setState({
                report_list: reportListReducer.report_list,
                pagination: reportListReducer.pagination,
                [name]: value
            })
        }
    }

    handleChangePage = async (value) =>{
       const get_report_list_have_filter_action = await this.props.get_report_list_have_filter_action(this.state.sort, 5,value)
        if(get_report_list_have_filter_action.type === GET_REPORT_LIST_HAVE_FILTER_SUCCESS){
            const reportListReducer = await this.props.reportListReducer;
            this.setState({
                report_list: reportListReducer.report_list,
                pagination: reportListReducer.pagination
            })
        }
    }

    render() {
        const {report_list, pagination} = this.state;
        // console.log(this.state)
        return (
            <React.Fragment>
                <div className={Management_of_misconduct_reportCss.content_Title}>
                    <h2>Quản lý báo cáo sai phạm</h2>
                </div>
                <div id={Management_of_misconduct_reportCss.QL_Report_Form}>
                    <div className={Management_of_misconduct_reportCss.Block_Search_Filter}>
                        {/*<div class="content-search">
                            <h3 class="content-search__lable">Tìm kiếm</h3>
                            <input type="text" class="content-search__input" placeholder="Nhập để tìm kiếm" />
                        </div>*/}
                        <div className={Management_of_misconduct_reportCss.Filter_the_data_report}>
                            <select name="sort" onChange={(event) =>{this.handleChangeSort(event)}} value={this.state.sort} id={Management_of_misconduct_reportCss.Filter_box_report} placeholder="Mới nhất">
                                <option value="-" class={Management_of_misconduct_reportCss.Filter_box_report__item}>Mới nhất</option>
                                <option value="" class={Management_of_misconduct_reportCss.Filter_box_report__item}>Cũ nhất</option>
                            </select>
                        </div>
                    </div>
                    <table className={Management_of_misconduct_reportCss.table_ListGoods_Giver}>
                        <tbody>
                            <tr className={Management_of_misconduct_reportCss.table_main_row_header}  style={{ backgroundColor: "#ccc" }}>
                                <th>Mã báo cáo</th>
                                <th>Mã tài khoản <br/> báo cáo</th>
                                <th>Mã trạng thái</th>
                                <th>Thời gian</th>
                                <th></th>
                            </tr>
                            {
                                report_list.map(report =>{
                                    return <Row report={report} key = {report._id}/>
                                })
                            }
                        </tbody>
                    </table>
                    <div className={Management_of_misconduct_reportCss.pagination_container}>
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
        reportListReducer: state.reportListReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_report_list_have_filter_action: async (sort, _limit, _page)=>{
            const action = await get_report_list_have_filter_action(sort, _limit, _page);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Management_of_misconduct_reports));
