import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {get_role_user} from '../../../stores/actions/role.action';
import {get_user_detail_by_user_id_action} from '../../../stores/actions/user.action';
import {
    ROLE_USER,
    USER_DETAIL_SUCCESS
} from '../../../constants/actions'

const translateRoleName = (role_name) => {
    switch(role_name){
        case 'user':
            return 'Khách'
        case 'sender':
            return 'Hỗ trợ';
        case 'receiver':
            return 'Cần hỗ trợ';
        case 'car_trip':
            return 'Chuyến xe';
        case 'admin':
            return 'Admin';
        case 'mode':
            return 'Mod';
        default:
            return
    }
}

class Row extends Component {
    state = {
        supRowIsOpen: false,
        account:{},
        role_user:{},
        user:{},
    }
    componentDidMount = async () => {
        const account = this.props.account;
        if(account){
            const get_role_user_action = await this.props.get_role_user(account.role_id);
            const get_user_detail_by_user_id_action = await this.props.get_user_detail_by_user_id_action(account.user_id);
            let role_user ={};
            let user = {};
            if(get_role_user_action.type === ROLE_USER){
                role_user = await this.props.roleReducer.role_user;
            }
            if(get_user_detail_by_user_id_action.type === USER_DETAIL_SUCCESS){
                user = await this.props.userReducer.user
            }
            this.setState({
                account: account,
                role_user: role_user,
                user: user
            })
        }
    }
    render() {
        const {account, role_user, user, supRowIsOpen} = this.state
        return (
            <React.Fragment>
                <tr onClick={()=>{this.setState({supRowIsOpen: !this.state.supRowIsOpen})}}>
                    <td>{account._id}</td>
                    <td>{account.username}</td>
                    <td>{account.password}</td>
                    <td>{account.user_id}</td>
                    <td>{translateRoleName(role_user.role_name)}</td>
                    <td><a href="" className="btn_Delete">Xóa</a></td>
                </tr>
                {supRowIsOpen &&
                    <tr>
                        <td colSpan={6}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tên người dùng</th>
                                        <td>{user.full_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Tuổi</th>
                                        <td>{user.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <td>{user.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Tỉnh/Thành phố</th>
                                        <td>{user.city}</td>
                                    </tr>
                                    <tr>
                                        <th>Quận/Huyện</th>
                                        <td>{user.district}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ</th>
                                        <td>{user.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roleReducer : state.roleReducer,
        userReducer: state.userReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        get_role_user: async (role_id) =>{
            const action = await get_role_user(role_id);
            return dispatch(action);
        },
        get_user_detail_by_user_id_action: async (user_id) =>{
            const action = await get_user_detail_by_user_id_action(user_id);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Row));
