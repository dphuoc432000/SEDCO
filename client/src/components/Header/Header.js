import React from "react";
import logo from "../../assets/images/logo.png";
import {
    Link, NavLink
  } from "react-router-dom";
import "./header.css";
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {get_role_user} from '../../stores/actions/role.action'
import { menuHeader } from "./menuHeader";
import CustomizedMenus from './subMenu';
import CircleIcon from '@mui/icons-material/Circle';

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

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            role_name: {},
            menu: []
        }
    }

    async componentDidMount(){
        if(localStorage.getItem('accessToken')){
            await this.props.get_role_user_action(this.props.verifyTokenData.role_id);
       
            if(this.props.roleReducer.role_user ){
                const role_name = this.props.roleReducer.role_user.role_name;
                const roles = this.props.roleReducer.roles;
                if(roles.includes(role_name)){
                    const menu = menuHeader.find(menu =>{
                        return menu.name === role_name;
                    }) //-> menu{name:..., menu:[]}
                    this.setState({
                        role_name: translateRoleName(role_name),
                        menu: menu.menu
                    })
                } 
            }
        }
        
    }

    render () {
        const menu = this.state.menu;
        const check_access_token = localStorage.getItem('accessToken')?true:false;
        console.log("check_access_token_header: ",check_access_token)
        return (
            <header id="header">
                <div className="header-navbar">
                    <div className="header-navbar-left">
                        <Link to="/" className="navbar-logo" exact="true">
                            <img src={logo} className="img-logo" alt="Logo chuyến xe tình nguyện" />
                        </Link>
                        <ul className="header-navbar__list">
                            <li className="header-navbar__item">
                                <Link to="/" className="header-navbar__item--link" exact="true">Trang Chủ</Link>
                            </li>
                            <li className="header-navbar__item">
                                <Link to="" className="header-navbar__item--link">Bản Đồ</Link>
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
                                    <div className="header_username">Hà Đức Phuoc</div> 
                                    <div className="header_role">
                                        <CircleIcon className="header_role_circle" style={{color: this.state.role_name.color}}/> 
                                        <p className="header_role_name" style={{color: this.state.role_name.color}}>{this.state.role_name.name}</p>
                                    </div>
                                </div>
                                <div className="header-navbar__sub_menu">
                                    <ul>
                                        <CustomizedMenus/>
                                    </ul>
                                </div>
                            </React.Fragment>
                            :
                            <div className="header-navbar__btn_login">
                                <Link to="/login">
                                    <button className="btn-dangnhap js-btn__login">Đăng nhập</button>
                                </Link>
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
        roleReducer: state.roleReducer
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        get_role_user_action: async (role_id) => {
            const action = await get_role_user(role_id)

            // console.log(action)
            return dispatch(action)
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header)) ;
