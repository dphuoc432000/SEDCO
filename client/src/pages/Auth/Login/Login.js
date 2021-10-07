import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import "./Login.css";

class Login extends React.Component{

    render(){

        return(
            <div className="login_container">
                <div className="title">
                    <h2>Đăng nhập</h2>
                </div>
                <form>
                    <div className="input_username">
                        <input type="text" placeholder="Tên đăng nhập" id="username"/>
                    </div>
                    <div className="input_password">
                        <input type="password"  placeholder="Mật khẩu" id="password"/>
                    </div>
                    <div className="checkbox_remember_password">
                        <input type="checkbox" id="remember_password"/>
                        <label htmlFor="remember_password">Nhớ mật khẩu</label>
                    </div>
                    <div className="btn_submit">
                        <input type="button" value="Đăng nhập" />
                    </div>
                </form>  
                <div className="btn_forget_password">
                    <Link  to="/forget_password">Quên mật khẩu</Link>
                </div>
                <div className="btn_register">
                    <Link  to="/register">Tạo tài khoản</Link>
                </div>
            </div>
        );
    }

}

export default Login;