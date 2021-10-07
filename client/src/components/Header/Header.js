import React from "react";
import logo from "../../assets/images/logo.png";
import {
    Link, NavLink
  } from "react-router-dom";
import "./header.css"
class Header extends React.Component {
    render() {
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
                                <a href className="header-navbar__item--link">Bản Đồ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-navbar-right">
                        {/*<ul className="header-navbar__list_user">
                            
                        </ul>
                        <div className="header-navbar__infor_user">
                        
                        </div>*/}
                        <div className="header-navbar__btn_login">
                            <Link to="/login">
                                <button className="btn-dangnhap js-btn__login">Đăng nhập</button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </header>
        );
    }
}

export default Header;
