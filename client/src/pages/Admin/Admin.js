
import React, { Component, Fragment, useState } from 'react';
// import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "../../styles/main.css"
import adminCss from "./Sidebar.module.css"
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import Drive_censorship from "./Driver_censorship/Driver_censorship";
import History_management from "./History_management/History_management";
import Manage_the_ride from "./Manage_the_ride/Manage_the_ride";
import Management_of_misconduct_reports from "./Management_of_misconduct_reports/Management_of_misconduct_reports";
import Reciever_essentials from "./Reciever_essentials/Reciever_essentials";
import Sender_essentials from "./Sender_essentials/Sender_essentials";
import Account_management from "./Account_management/Account_management"

export default class Admin extends Component {
    state ={
        subMenuIsOpen: false 
    }
    handleSubMenuOpen = ()=>{
        this.setState({
            subMenuIsOpen: !this.state.subMenuIsOpen
        })
    }
    handleSubMenuClose = () =>{
        this.setState({
            subMenuIsOpen: false
        })
    }
    render() {
        const {subMenuIsOpen} = this.state
        return (
            <main className={"main"}>
                <div className={adminCss.sidebar}>
                    <nav>
                        <ul>
                            <li><NavLink exact activeClassName={adminCss.active} onClick={()=>{this.state.subMenuIsOpen && this.handleSubMenuClose()}} to="/admin">Trang chủ</NavLink></li>
                            <li><NavLink exact activeClassName={adminCss.active} onClick={()=>{this.state.subMenuIsOpen && this.handleSubMenuClose()}} to="/admin/driver_censorship">Kiểm duyệt tài xế</NavLink></li>
                            <li><NavLink exact activeClassName={adminCss.active} onClick={()=>{this.state.subMenuIsOpen && this.handleSubMenuClose()}} to="/admin/account_management">Quản lý tài khoản</NavLink></li>
                            <li><NavLink exact activeClassName={adminCss.active} onClick={()=>{this.state.subMenuIsOpen && this.handleSubMenuClose()}} to="/admin/manage_the_ride">Quản lý chuyến xe</NavLink></li>
                            <li className={adminCss.sub_sidebar} >
                                <NavLink onClick={()=>{this.handleSubMenuOpen()}} exact to="/admin/reciever_essentials">Quản lý lịch sử</NavLink>
                                {
                                    subMenuIsOpen &&
                                    <ul className={adminCss.Sidebar_item}>
                                        <li ><NavLink exact activeClassName={adminCss.active} to="/admin/reciever_essentials">Nhận nhu yếu phẩm</NavLink></li>
                                        <li ><NavLink exact activeClassName={adminCss.active} to="/admin/sender_essentials">Hỗ trợ nhu yếu phẩm</NavLink></li>
                                    </ul>
                                }
                            </li>
                            <li><NavLink exact activeClassName={adminCss.active} onClick={()=>{this.state.subMenuIsOpen && this.handleSubMenuClose()}}  to="/admin/management_of_misconduct_reports">Quản lý báo cáo sai phạm</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className={adminCss.content_container}>
                    <Route exact path={"/admin"}>
                        <Dashboard />
                    </Route>
                    <Route exact path={"/admin/driver_censorship"}>
                        <Drive_censorship />
                    </Route>
                    <Route exact path={"/admin/account_management"}>
                        <Account_management />
                    </Route>
                    <Route exact path={"/admin/manage_the_ride"}>
                        <Manage_the_ride />
                    </Route>
                    <Route exact path={"/admin/history_management"}>
                        <History_management />
                    </Route>
                    <Route exact path={"/admin/reciever_essentials"}>
                        <Reciever_essentials />
                    </Route>
                    <Route exact path={"/admin/sender_essentials"}>
                        <Sender_essentials />
                    </Route>
                    <Route exact path={"/admin/management_of_misconduct_reports"}>
                        <Management_of_misconduct_reports />
                    </Route>
                </div>
            </main>
        )
    }
}
