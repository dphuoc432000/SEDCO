import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './InforUser.css';
import {get_role_user} from '../../../stores/actions/role.action'
import {getUserInforIsLogined} from '../../../stores/actions/userIsLogin.action';
import {connect} from 'react-redux';

// const translateRoleName = (role_name)=>{
//     switch(role_name) {
//         case "user":
//             return {name:"Người dùng",color:"#808E9B" };
//         case "sender":
//             return {name:"Người hỗ trợ",color:"#FED330" };
//         case "receiver":
//             return {name:"Người cần hỗ trợ",color:"#EE5A24" };
//         case "car trip":
//             return {name:"Người vận chuyển",color:"#A3CB38" };
//         case "mod":
//             return {name:"Mod",color:"#EA2027" };
//         case "admin":
//             return {name:"Admin",color: "#EA2027"};
//         default:
//             return;
//     }
// }

class InforUser extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         account:{
    //             _id: '',
    //             username: '',
    //             password: '',
    //             role_id: ''
    //         },
    //         user:{
    //             full_name: '',
    //             age: null,
    //             email: '',
    //             phone_number: '',
    //             city: '',
    //             district: '',
    //             address: '',
    //         },
    //         role_name: {},
    //     }
    // }

    // componentDidMount = async () =>{
    //     const verifydata = {...await this.props.verifyTokenData};

    //     await this.props.get_role_user_action(verifydata.role_id);
    //     const role_name = this.props.roleReducer.role_user.role_name;

    //     await this.props.get_User_Infor_Is_Logined(verifydata.account_id);
    //     const account = this.props.userIsLogined.account;
    //     const user = this.props.userIsLogined.user;
        
    //     this.setState({
    //         role_name: translateRoleName(role_name),
    //         account: {
    //             _id: account._id,
    //             username: account.username,
    //             password: account.password,
    //             role_id: account.role_id
    //         },
    //         user: {
    //             full_name: user.full_name,
    //             age: user.age,
    //             email: user.email,
    //             phone_number: user.phone_number,
    //             city: user.city,
    //             district: user.district,
    //             address: user.address,
    //         }
    //     })
    // }

    render() {
        const account = this.props.account;
        const user = this.props.user;
        const role_name = this.props.role_name;
        return (
            <React.Fragment>
                <div className="user-infor">
                    <div className="name-id-status_user">
                        <div className="name-id">
                            <div className="name">
                                <h3>{user.full_name}</h3>
                            </div>
                            <div className="id">
                                <p>Mã tài khoản: {account._id}</p>
                            </div>
                        </div>
                        <div className="status_user">
                            <p style={{color: role_name.color}}>{role_name.name}</p>
                        </div>
                    </div>
                    <div className="infor">
                        <div className="infor_account">
                            <table>
                                <caption>Tài khoản</caption>
                                <tbody>
                                    <tr>
                                        <td>Tên đăng nhập:</td>
                                        <td>{account.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Mật khẩu:</td>
                                        <td>{account.password}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="infor_user">
                            <table>
                                <caption>Người dùng</caption>
                                <tbody>
                                    <tr>
                                        <td>Họ và tên:</td>
                                        <td>{user.full_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Tuổi:</td>
                                        <td>{user.age}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại:</td>
                                        <td>{user.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Tỉnh/thành phố:</td>
                                        <td>{user.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Quận/huyện:</td>
                                        <td>{user.district}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ cụ thể:</td>
                                        <td>{user.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="image-private-container">
                        <div className="image-private-title">
                            <span>Hình ảnh </span>	&nbsp; <p style={{color:'red'}}>(Dành cho đăng ký chuyến xe)</p>
                        </div>
                        <div className="identity_card_img_container">
                            <span>Căn cước công dân/CMND</span>
                            <div className="img_container">
                                <div className="img_front">
                                    <p>Mặt trước</p>
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                                <div className="img_back">
                                    <p>Mặt sau</p>
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                            </div>
                            
                        </div> 
                        <div className="face_img_container">
                            <span>Khuôn mặt</span>
                            <div className="img_container">
                                <div className="img">
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="driving_license_img_container">
                            <span>Giấy phép lái xe</span>
                            <div className="img_container">
                                <div className="img_front">
                                    <p>Mặt trước</p>
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                                <div className="img_back">
                                    <p>Mặt sau</p>
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="covid_test_paper_img_container">
                            <span>Giấy xét nghiệm Covid/Đã tiêm vaccine</span>
                            <div className="img_container">
                                <div className="img">
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                                <div className="img">
                                    <img src="https://via.placeholder.com/100" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

            // console.log(action)
            return dispatch(action)
        },
        get_User_Infor_Is_Logined: async (account_id) =>{
            const action = await getUserInforIsLogined(account_id);
            return dispatch(action);
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InforUser));
