import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import "./Register.css"

class Register extends React.Component{

    render(){
        return(
            <div className="register_container">
                <div className="title">
                    <h2>Đăng ký</h2>
                </div>
                <form>
                    <div className="account_infor">
                        <span>Thông tin tài khoản</span>
                        <div className="input_username">
                            <input type="text" placeholder="Tên đăng nhập" id="username"/>
                        </div>
                        <div className="input_password">
                            <input type="password"  placeholder="Mật khẩu" id="password"/>
                        </div>
                        <div className="input_password_again">
                            <input type="password"  placeholder="Nhập lại mật khẩu" id="password_again"/>
                        </div>
                    </div>
                    <div className="input_user_infor">
                        <span>Thông tin người dùng</span>
                        <div className="full_name">
                            <input type="text" placeholder="Họ và tên" id="full_name"/>
                        </div>
                        <div className="input_age">
                            <input type="number" placeholder="Tuổi" id="age" />
                        </div>
                        <div className="input_email">
                            <input type="email" placeholder="Email" id="email" />
                        </div>
                        <div className="input_phone_number">
                            <input type="text" placeholder="Số điện thoại" id="phone_number" />
                        </div>
                        <div className="input_address">
                            <div className="input_city">
                                <label htmlFor="city">City: </label>
                                <select id="city">
                                    <option value="Đà Nẵng"> Đà Nẵng</option>
                                    <option value="HCM">Hồ Chí Minh</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                </select>
                            </div>
                            <div className="input_district">
                                <label htmlFor="district">District: </label>
                                <select id="district">
                                    <option value="Hải Châu">Hải Châu</option>
                                    <option value="Bình Thạnh">Bình Thạnh</option>
                                    <option value="Đống Đa">Đống Đa</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="input_specific_address">
                            <input type="text" placeholder="Địa chỉ cụ thể" id="specific_address" />
                        </div>
                    </div>
                    <div className="btn_submit">
                        <input type="button" value="Đăng ký" />
                    </div>
                </form>
                            
                <div className="btn_login">
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        );
    } 

}

export default Register;