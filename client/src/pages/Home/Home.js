import React, { Component, Fragment } from 'react';
import Main from '../../components/Main/Main';
import "../../styles/main.css";
// import {  } from 'react-router';
import { Route, withRouter } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import "./home.css";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";

export default withRouter(
class Home extends Component {
    render() {
        return (
            <Fragment>
                <main className={"main"}>
                    <Main 
                        user={this.props.user}
                        handleChangeShowFormLogin={this.props.handleChangeShowFormLogin} 
                        role_name={this.props.role_name} 
                        account_id={this.props.account_id}
                        status_current={this.props.status_current}
                        handleUpdateStatusCurrent={this.props.handleUpdateStatusCurrent}
                        handleLoadAgainWhenCreateStatus={this.props.handleLoadAgainWhenCreateStatus}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                    {   this.props.showFormLogin &&
                        <div className="showform_auth">
                            <div className="form_auth">
                                <div className="layout_auth" onClick={()=>{this.props.handleChangeShowFormLogin()}}></div>
                                <Login 
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin} 
                                    handleLogin={this.props.handleLogin}
                                    handleChangeShowFormRegister = {this.props.handleChangeShowFormRegister}
                                    handleChangeShowFormForgotPassword = {this.props.handleChangeShowFormForgotPassword}
                                />
                            </div>
                        </div>
                    }
                    {   this.props.showFormRegister &&
                        <div className="showform_auth">
                            <div className="form_auth">
                                <div className="layout_auth" onClick={()=>{this.props.handleChangeShowFormLogin()}}></div>
                                <Register 
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    handleChangeShowFormRegister = {this.props.handleChangeShowFormRegister}
                                />
                            </div>
                        </div>
                    }
                    {   this.props.showFormForgotPassword &&
                        <div className="showform_auth">
                            <div className="form_auth">
                                <div className="layout_auth" onClick={()=>{this.props.handleChangeShowFormLogin()}}></div>
                                <ForgotPassword 
                                    handleChangeShowFormLogin={this.props.handleChangeShowFormLogin}
                                    handleChangeShowFormRegister = {this.props.handleChangeShowFormRegister}
                                />
                            </div>
                        </div>
                    }
                </main>
            </Fragment>
            
        );
    }
}
);
