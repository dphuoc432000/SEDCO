import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dashboardCss from "./Dashboard.module.css";
import {get_status_list_action} from '../../../stores/actions/status_list.action';
import BasicPagination from '../../../components/Pagination/Pagination';

const translateStatusTypeName = (name) => {
    switch(name){
        case 'SENDER':
            return 'Hỗ trợ'
        case 'RECEIVER':
            return 'Cần hỗ trợ';
        case 'CAR_TRIP':
            return 'Chuyến xe';
        default:
            return;
    }
}

function converJsonDateToDate(jsonDate){
    const date = new Date(jsonDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0'+day:day}/${month < 10 ? '0'+month:month}/${year}`
}

class Dashboard extends React.Component {
    state = {
        status_list: [],
        pagination: {
            _limit: 1,
            _page:1,
            totalRows:1
        }
    }
    componentDidMount = async()=>{
        await this.props.get_status_list_action(5, 1);
        const statusListReducer = await this.props.statusListReducer;
        this.setState({
            status_list: statusListReducer.status_list,
            pagination: statusListReducer.pagination,
        })
    }
    handleChangePage = async (value) =>{
        await this.props.get_status_list_action(5, value);
        const statusListReducer = await this.props.statusListReducer;
        console.log(statusListReducer)
        this.setState({
            status_list: statusListReducer.status_list,
            pagination: statusListReducer.pagination,
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className={dashboardCss.content_Title}>
                    <h2>Trang chủ</h2>
                </div>
                <div className={dashboardCss.content_Dashboard}>
                    <div className={dashboardCss.content_List_box}>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145))" }} >
                            <p className={dashboardCss.Box_item__number} >
                                1647
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Tổng trạng thái
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                172
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Đang chờ nhận
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                287
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Đang chờ hỗ trợ
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                94
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Chưa vận chuyển
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(247, 151, 30), rgb(255, 210, 0))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                234
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Đã nhận
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(255, 81, 47),rgb(221, 36, 118))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                581
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Đã hỗ trợ
                            </p>
                        </div>
                        <div className={dashboardCss.Box_item} style={{ background: "linear-gradient(to right, rgb(86, 171, 47), rgb(168, 224, 99))" }} >
                            <p className={dashboardCss.Box_item__number}>
                                288
                            </p>
                            <p className={dashboardCss.Box_item__status}>
                                Đang vận chuyển
                            </p>
                        </div>
                    </div>
                    <div className={dashboardCss.search_filter_container} >
                        <div className={dashboardCss.search_form}>
                            <input type="text" className={dashboardCss.search_form__input} placeholder="Tìm kiếm" />
                        </div>
                        <div className={dashboardCss.filter_form}>
                            <select className={dashboardCss.filter_form__input} placeholder="Bộ lọc">
                                <option value="" className={dashboardCss.filter_item}>Chọn bộ lọc</option>
                                <option value="" className={dashboardCss.filter_item}>Tăng dần</option>
                                <option value="" className={dashboardCss.filter_item}>Giảm dần</option>
                            </select>
                        </div>
                    </div>
                    <table id={dashboardCss.table_ListGoods_Giver_dashboard}>
                        <tbody>
                            <tr style={{ backgroundColor: "#ccc" }}>
                                <th>Mã người tạo</th>
                                <th style={{ width: "35%" }}>Mã trạng thái</th>
                                <th>Loại</th>
                                <th>Thời gian tạo</th>
                                <th>Hoàn thành</th>
                            </tr>
                            {
                                this.state.status_list.map(status => {
                                    return(
                                        <tr key={status._id}>
                                            <td>{status.user._id}</td>
                                            <td>{status._id}</td>
                                            <td>{translateStatusTypeName(status.status_type)}</td>
                                            <td>{converJsonDateToDate(status.createdAt)}</td>
                                            <td>{(!status.status_completed)?'Chưa hoàn thành':'Đã hoàn thành'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className={dashboardCss.pagination_container}>
                        <BasicPagination 
                            count={Math.ceil(this.state.pagination.totalRows / this.state.pagination._limit)}
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
        get_status_list_action : async (_limit,_page)=>{
            const action = await get_status_list_action(_limit,_page);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
