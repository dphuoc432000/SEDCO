import React from 'react';
import { withRouter } from 'react-router';
import {Link}from "react-router-dom";
import "./Login.css";
import {connect} from 'react-redux';
import {login as loginAction} from '../../../stores/actions/auth.action';
import '../../../styles/main.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    LOGIN_SUCCESS,
} from "../../../constants/actions";
import FormError from '../../../components/FormError/FormError';
import CloseIcon from '@mui/icons-material/Close';
import {get_role_user}  from '../../../stores/actions/role.action'
class Login extends React.Component{

    state ={
        username:{
            value:"",
            isInputValue: false,
            errorMessage: ""
        },
        password:{
            value:"",
            isInputValue: false,
            errorMessage: ""
        },
    }

    validateInput = (type, checkingText) => {
        switch (type) {
            case 'username':
                var usernameRegex = /^[a-zA-Z0-9]+$/;
                const checkingusernameRegex = usernameRegex.exec(checkingText);
                if (checkingText.length >= 6 && checkingusernameRegex !== null) {
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập 6 ký tự trở lên. Bao gồm: a-zA-Z0-9!'};
                
            case 'password':
                var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if((passw).test(checkingText)) 
                { 
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: từ 6 đến 20 ký tự, ít nhất một chữ số, một chữ hoa và một chữ thường!'};
            default:
                break;
        }
    }

    handleInputValidation = event => {
        const { name } = event.target;
        const { isInputValue, errorMessage } = this.validateInput(name, this.state[name].value);
        const newState = {
            value: this.state[name].value,
            isInputValue: this.state[name].isInputValue,
            errorMessage: this.state[name].errorMessage
        }; /* dummy object */
        newState.isInputValue = isInputValue;
        newState.errorMessage = errorMessage;
        this.setState({
            [name]:{
                ...newState
            }
        })
    }

    //nếu form chưa nhập đúng thông tin thì bằng true
    checkingForm =() =>{
        const dataForm = [...Object.values(this.state)];
        return dataForm.some((item)=>{
            return item.isInputValue === false
        })
    }

    handleLogin = async() =>{

        if(this.checkingForm()){
            toast.error(`Đăng nhập thất bại. Vui lòng nhập đúng tên đăng nhập và mật khẩu!`);
        }
        else{
            //chay action
            const data_action = await this.props.login({...this.state});
            //Đăng ký thất bại
            if(data_action.type !== LOGIN_SUCCESS){
                toast.error(`Đăng nhập thất bại. ${data_action.payload.description}!`);
                return;
            }
            const role_id = await this.props.dataRedux.loginReducer.account.role_id;
            await this.props.get_role_user(role_id)
            const role_name = await this.props.dataRedux.roleReducer.role_user.role_name;
            //Đăng ký thành công
            toast.success("Đăng nhập thành công!");
            if(role_name !== 'admin')
                this.props.history.push('/');
            else
                this.props.history.push('/admin');
            this.props.handleLogin();
        }
        

        // await toast.promise( this.props.login({...this.state}),{
        //     pending: 'Promise is pending',
        //     success: 'Promise resolved 👌',
        //     error: 'Promise rejected 🤯'
        // })
        // const data_action = await this.props.login({...this.state});
        // if(data_action.type === LOGIN_SUCCESS){
        //     toast.success("Đăng nhập thành công");
        //     console.log("123", this.props.dataRedux);
        //     this.props.history.push({
        //         pathname: '/',
        //         state2: {
        //             name:"phuoc",
        //         }    
        //     });
        // }
        // else
        //     toast.error(`Đăng nhập thất bại. \n

        //     ${data_action.payload.description}`);
    }

    onChangeLoginForm = event =>{
        let value = event.target.value;
        const name = event.target.name
        // if(value.lenght === 0){
        //     isInputValue = false;
        // }
        const dataValidate = this.validateInput(name, value)
        // console.log()
        this.setState({
            [name]:{
                ...this.state[name],
                value,
                ...dataValidate
            }
        })


        // this.setState({
        //     [event.target.name]: {
        //         ...this.state[event.target.name],
        //         value: event.target.value
        //     }
        // })
    }
    handleShowPassword = () =>{
        const password = document.getElementById("password");
        const checkbox = document.getElementById("remember_password");
        console.log(checkbox.checked)
        if (checkbox.checked) {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }
    render(){
        const {hiddenPassword} = this.state;
        return(
            <React.Fragment>
                {/*<Header/>*/}
                {/*<main>*/}
               
                    <div className="login_container">
                        <CloseIcon onClick={()=>{this.props.handleChangeShowFormLogin()}} style={{position: 'absolute', top:'5px', right:'5px',fontSize:'20px', cursor:'pointer'}}/>
                        <div className="title">
                            <h2>Đăng nhập</h2>
                        </div>
                        <form>
                            <div className="input_username">
                                <input 
                                    type="text" 
                                    placeholder="Tên đăng nhập" 
                                    value={this.state.username.value} 
                                    onChange={(event)=>this.onChangeLoginForm(event)} 
                                    name="username" 
                                    id="username"
                                    onBlur={(event) => this.handleInputValidation(event)}
                                />
                            </div>
                            <FormError 
                                type="username"
                                isHidden={this.state.username.isInputValue} 
                                errorMessage={this.state.username.errorMessage}
                            />
                            <div className="input_password">
                                <input 
                                    type='password'
                                    placeholder="Mật khẩu" 
                                    value={this.state.password.value} 
                                    onChange={(event)=>this.onChangeLoginForm(event)} 
                                    name="password" 
                                    id="password"
                                    onBlur={(event) => this.handleInputValidation(event)}
                                />
                            </div>
                            <FormError 
                                type='password'
                                isHidden={this.state.password.isInputValue} 
                                errorMessage={this.state.password.errorMessage}
                            />
                            <div className="checkbox_remember_password">
                                <div className="check_box_container" onClick={() =>{this.handleShowPassword()}}>
                                    <input type="checkbox" id="remember_password"/>
                                    <label htmlFor="remember_password" >Hiện mật khẩu</label>
                                </div>
                            </div>
                            <div className="btn_submit">
                                <input type="button" value="Đăng nhập" onClick={()=>this.handleLogin()}/>
                            </div>
                        </form>  
                        <div className="btn_forget_password">
                            <p onClick={() =>{this.props.handleChangeShowFormForgotPassword()}}>Quên mật khẩu</p>
                        </div>
                        <div className="btn_register">
                            <p onClick={() =>{this.props.handleChangeShowFormRegister()}}>Tạo tài khoản</p>
                        </div>
                    </div>
                {/*</main>*/}
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
        },
        get_role_user: async (role_id) =>{
            const action = await get_role_user(role_id)

            // console.log(action)
            return dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));