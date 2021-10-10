import React from 'react';
import { withRouter } from 'react-router';
import {Link}from "react-router-dom";
import "./Login.css";
import {connect} from 'react-redux';
import {login as loginAction} from '../../../stores/actions/auth.action';
import Header from '../../../components/Header/Header';
import '../../../styles/main.css'

class Login extends React.Component{

    state ={
        username: "",
        password: ""
    }

    handleLogin = async() =>{
        await this.props.login({...this.state})
        console.log("123", this.props.dataRedux);
        this.props.history.push({
            pathname: '/',
            state2: {
                name:"phuoc",
            }    
        });
    }

    onChangeLoginForm = event =>{
        // let value =
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <main>
                    <div className="login_container">
                        <div className="title">
                            <h2>Đăng nhập</h2>
                        </div>
                        <form>
                            <div className="input_username">
                                <input 
                                    type="text" 
                                    placeholder="Tên đăng nhập" 
                                    value={this.state.username} 
                                    onChange={(event)=>this.onChangeLoginForm(event)} 
                                    name="username" 
                                    id="username"/>
                            </div>
                            <div className="input_password">
                                <input 
                                    type="password"  
                                    placeholder="Mật khẩu" 
                                    value={this.state.password} 
                                    onChange={(event)=>this.onChangeLoginForm(event)} 
                                    name="password" 
                                    id="password"/>
                            </div>
                            <div className="checkbox_remember_password">
                                <input type="checkbox" id="remember_password"/>
                                <label htmlFor="remember_password">Nhớ mật khẩu</label>
                            </div>
                            <div className="btn_submit">
                                <input type="button" value="Đăng nhập" onClick={()=>this.handleLogin()}/>
                            </div>
                        </form>  
                        <div className="btn_forget_password">
                            <Link  to="/forget_password">Quên mật khẩu</Link>
                        </div>
                        <div className="btn_register">
                            <Link  to="/register">Tạo tài khoản</Link>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }

}





//state này của redux không phải react
const mapStateToProps = (state) =>{
    return {
        dataRedux: state
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        login: async ({username, password}) => {
            const action = await loginAction({username, password})

            // console.log(action)
            return dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));