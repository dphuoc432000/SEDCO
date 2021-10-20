import React, { Component } from 'react';
import { withRouter } from 'react-router';
import InforUser from './InforUser/InforUser';
import '../../styles/main.css';
import './UpdateUser.css';
import { Route, Link } from 'react-router-dom';
import UpdateUserInforForm from './UpdateUserInforForm/UpdateUserInforForm';
import {get_role_user} from '../../stores/actions/role.action'
import {getUserInforIsLogined} from '../../stores/actions/userIsLogin.action';
import {connect} from 'react-redux';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
const translateRoleName = (role_name)=>{
    switch(role_name) {
        case "user":
            return {name:"Người dùng",color:"#808E9B" };
        case "sender":
            return {name:"Người hỗ trợ",color:"#FED330" };
        case "receiver":
            return {name:"Người cần hỗ trợ",color:"#EE5A24" };
        case "car trip":
            return {name:"Người vận chuyển",color:"#A3CB38" };
        case "mod":
            return {name:"Mod",color:"#EA2027" };
        case "admin":
            return {name:"Admin",color: "#EA2027"};
        default:
            return;
    }
}

class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            account:{
                _id: '',
                username: '',
                password: '*********',
                role_id: ''
            },
            user:{
                full_name: '',
                age: null,
                email: '',
                phone_number: '',
                city: '',
                district: '',
                address: '',
            },
            role_name: {},
            isEdit: false,
            showChangePasswordForm:false
        }
    }

    componentDidMount = async () =>{
        const verifydata = {...await this.props.verifyTokenData};
        // console.log(verifydata)
        await this.props.get_role_user_action(verifydata.role_id);
        const role_name = this.props.roleReducer.role_user.role_name;

        await this.props.get_User_Infor_Is_Logined(verifydata.account_id);
        const account = this.props.userIsLogined.account;
        const user = this.props.userIsLogined.user;
        
        this.setState({
            role_name: translateRoleName(role_name),
            account: {
                ...this.state.account,
                _id: account._id,
                username: account.username,
                role_id: account.role_id
            },
            user: {
                full_name: user.full_name,
                age: user.age,
                email: user.email,
                phone_number: user.phone_number,
                city: user.city,
                district: user.district,
                address: user.address,
            }
        })
        // console.log("đã chạy")
    }

    handleShowChangePasswordForm = () =>{
        this.setState({
            showChangePasswordForm: !this.state.showChangePasswordForm
        })
    }
    render() {
        return (
            <main>
                {/*<Route path="/user/information" exact>*/}
                    <div className="layer-infor-user">
                        <div className="user-infor-container">
                            <div className="user-infor-title">
                                <h2>Thông tin người dùng</h2>
                            </div>
                            <InforUser account={this.state.account} user={this.state.user} role_name={this.state.role_name}/>
                            <div className="btn-container">
                                <div className="btn-update-password-account">
                                    {/*<Link to="/user/account/update" >
                                        <span>Đổi mật khẩu</span>
                                    </Link>*/}
                                    {<span onClick={()=>{this.handleShowChangePasswordForm()}}>Đổi mật khẩu</span>}
                                </div>
                                <div className="btn-update-user-infor">
                                    <Link to="/user/information/update">
                                        <span>Cập nhật thông tin người dùng</span>
                                    </Link>
                                    {/*<span onClick={()=>{this.handleShowFormUpdateUserInfor()}}>Cập nhật thông tin người dùng</span>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                {/*</Route>*/}
                {/*<Route path="/user/information/update" exact>
                    <UpdateUserInforForm user={this.state.user}/>
                </Route>
                <Route path="/user/account/update">
                    
        </Route>*/}
                {this.state.showChangePasswordForm &&
                    <div className="showform_auth">
                        <div className="form_auth">
                            <div className="layout_auth" onClick={()=>{this.handleShowChangePasswordForm()}}></div>
                            <ChangePassword handleShowChangePasswordForm = {this.handleShowChangePasswordForm}/>
                        </div>
                    </div>
                }
            </main>
           
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        verifyTokenData: state.verifyTokenReducer,
        roleReducer: state.roleReducer,
        userIsLogined: state.userIsLoginReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        get_role_user_action: async (role_id) => {
            const action = await get_role_user(role_id)
            return dispatch(action)
        },
        get_User_Infor_Is_Logined: async (account_id) =>{
            const action = await getUserInforIsLogined(account_id);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUser))
