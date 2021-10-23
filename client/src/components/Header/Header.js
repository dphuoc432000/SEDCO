import React from "react";
import logo from "../../assets/images/logo.png";
import {
    Link,
  } from "react-router-dom";
import "./header.css";
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {get_role_user} from '../../stores/actions/role.action'
import {getUserInforIsLogined} from '../../stores/actions/userIsLogin.action';
// import { menuHeader } from "./menuHeader";
import CustomizedMenus from './subMenu';
import CircleIcon from '@mui/icons-material/Circle';

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

class Header extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state ={
    //         full_name: this.props.full_name,
    //         role_name: {},
    //         menu: [],
    //         isAuthenticated: this.props.isAuthenticated
    //     }
    // }

    // async componentDidMount(){
    //     if(localStorage.getItem('accessToken')){
    //         const veifydata = {...await this.props.verifyTokenData};
    //         await this.props.get_role_user_action(veifydata.role_id);
    //         const role_user = await this.props.roleReducer.role_user;
    //         if(role_user ){
    //             const role_name = role_user.role_name;
    //             const roles = await this.props.roleReducer.roles;
    //             if(roles.includes(role_name)){
    //                 const menu = menuHeader.find(menu =>{
    //                     return menu.name === role_name;
    //                 }) //-> menu{name:..., menu:[]}
    //                 await this.props.get_User_Infor_Is_Logined(veifydata.account_id);
    //                 const user = await this.props.userIsLogined.user;
    //                 this.setState({
    //                     full_name: user.full_name,
    //                     role_name: translateRoleName(role_name),
    //                     menu: menu.menu,
    //                     isLogined:true
    //                 })
    //             } 
                
    //         }
    //     }
    //     // const veifydata = {...await this.props.verifyTokenData};
    // }

    // componentDidUpdate() {
    //     const user_redux = this.props.userIsLogined.user;
    //     if(user_redux)
    //         if(this.state.full_name !== user_redux.full_name){
    //             this.setState({
    //                 full_name: user_redux.full_name
    //             })
    //             console.log("Đã vào componentDidUpdate của header")
    //         }
                
    // }

    // handlUpdateFull_name = () =>{
    //     if(this.state.full_name !== this.props.full_name)
    //         this.setState({
    //             full_name: this.props.full_name
    //         })
    // }
    handleChangeShowFormLogin = ()=>{
        this.props.handleChangeShowFormLogin();
    }
    
    render () {
        const menu = this.props.appProps.menu;
        const check_access_token = localStorage.getItem('accessToken')?true:false;
        
        return (
            <header id="header">
                <div className="header-navbar">
                    <div className="header-navbar-left">
                        <Link to="/" className="navbar-logo" exact="true">
                            <img src={logo} className="img-logo" alt="Logo chuyến xe tình nguyện" />
                        </Link>
                        <ul className="header-navbar__list">
                            <li className="header-navbar__item">
                                <Link to="/" className="header-navbar__item--link home_link" exact="true">Trang Chủ</Link>
                            </li>
                            <li className="header-navbar__item">
                                <Link to="" className="header-navbar__item--link">Giới thiệu</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="header-navbar-right">
                        { check_access_token && menu ?
                            <React.Fragment>
                                <ul className="header-navbar-right__menu_user">
                                    {menu.map((item,index)=>{
                                        return <li className="header-navbar__item" key={index}><Link to={item.link}>{item.name}</Link></li> 
                                    })}
                                </ul>
                                <div className="header-navbar-right__infor_user">
                                    <div className="header_username">{this.props.appProps.full_name}</div> 
                                    <div className="header_role">
                                        <CircleIcon className="header_role_circle" style={{color: this.props.appProps.role_name.color}}/> 
                                        <p className="header_role_name" style={{color: this.props.appProps.role_name.color}}>{this.props.appProps.role_name.name}</p>
                                    </div>
                                </div>
                                <div className="header-navbar__sub_menu">
                                    <ul>
                                        <CustomizedMenus handleLogout={this.props.handleLogout}/>
                                    </ul>
                                </div>
                            </React.Fragment>
                            :
                            <div className="header-navbar__btn_login">
                                {/*<Link to="/login">*/}
                                    <button onClick={()=>this.handleChangeShowFormLogin()} className="btn-dangnhap js-btn__login">Đăng nhập</button>
                                {/*</Link>*/}
                            </div>
                        }
                    </div>
                    
                </div>
            </header>
        );
    }
}
//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {
        verifyTokenData: state.verifyTokenReducer,
        roleReducer: state.roleReducer,
        isLogined: state.loginReducer.isLogined,
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header)) ;
