import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./Account_management.css";
import Row from "./Row";
import {get_account_list_action} from '../../../stores/actions/account.action';
// import "../Sidebar.css";
import BasicPagination from '../../../components/Pagination/Pagination';
import {
    GET_ACCOUNT_LIST_SUCCESS
} from '../../../constants/actions'

class Account_management extends React.Component {
    state ={
        account_list:[],
        pagination:{
            _limit:1,
            _page: 1,
            totalRows:1,
        }
    }
    
    componentDidMount = async () =>{
        const get_account_list_action = await this.props.get_account_list_action(5,1);
        const accountReducer = await this.props.accountReducer;
        if(get_account_list_action.type === GET_ACCOUNT_LIST_SUCCESS){
            this.setState({
                account_list: accountReducer.account_list,
                pagination: accountReducer.pagination
            })
        }
    }

    handleChangePage = async (value) =>{
        const get_account_list_action = await this.props.get_account_list_action(5,value);
        const accountReducer = await this.props.accountReducer;
        if(get_account_list_action.type === GET_ACCOUNT_LIST_SUCCESS){
            this.setState({
                account_list: accountReducer.account_list,
                pagination: accountReducer.pagination
            })
        }
    }

    render() {
        const {account_list, pagination} = this.state;
        return (
            <React.Fragment>
                <div className="content_Title">
                    <h2>Quản lý tài khoản</h2>
                </div>
                <div id="Account_manager_content">
                    <div className="Block-Search-Filter" style={{ color: "#36ce80" }}>
                        <div className="content-search">
                            <h3 className="content-search__lable">Tìm kiếm</h3>
                            <input type="text" className="content-search__input" placeholder="Nhập để tìm kiếm" />
                        </div>
                        <div className="Filter_data_account">
                            <h3 className="Filter_data_account__lable">Lọc</h3>
                            <select name="" id="Filter_box_account" placeholder="tăng dần">
                                <option value="" className="Filter_box_account__item">tăng dần</option>
                                <option value="" className="Filter_box_account__item">Giảm dần</option>
                            </select>
                        </div>
                    </div>
                    <table id="table-ListGoods-Giver" >
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên đăng nhập</th>
                                <th>Mật khẩu</th>
                                <th>Mã người dùng</th>
                                <th>Vai trò</th>
                                <th></th>
                            </tr>
                            {account_list.map(account =>{
                                return <Row key={account._id} account={account}/>
                            })}
                        </tbody>
                    </table>
                    <BasicPagination
                        count={Math.ceil(pagination.totalRows / pagination._limit)}
                        handleChangePage = {this.handleChangePage}
                    />
                </div>
            </React.Fragment>
            
        )
    }
}
//state này của redux không phải react
const mapStateToProps = (state) => {
    return {
        accountReducer: state.accountReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_account_list_action: async (_limit, _page) =>{
            const action = await get_account_list_action(_limit, _page);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account_management));
