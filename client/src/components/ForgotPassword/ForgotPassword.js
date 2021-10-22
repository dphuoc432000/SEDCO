import React, { Component } from 'react'
import {withRouter}from "react-router-dom";
import {toast} from 'react-toastify';
import { connect } from 'react-redux';
import './ForgotPassword.css';
import FormError from '../FormError/FormError';
import forgotPasswordAction from '../../stores/actions/forgotPassword.action';
import CloseIcon from '@mui/icons-material/Close';
import {FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_LOADING } from '../../constants/actions'
class ForgotPassword extends Component {
    state={
        email: {
            value: '',
            isInputValue: false,
            errorMessage:''
        }
    }
    
    onChangeInput = (event) =>{
        let value = event.target.value;
        const name = event.target.name;
        const dataValidate = this.validateInput(name, value)
        this.setState({
            email:{
                value,
                ...dataValidate
            }
        })
    }
    validateInput = (type, checkingText) => {
        switch (type) {
            case 'email':
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkingText))
                {
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Email không hợp lệ!'};
            default:
                break;
        }
    }

    handleInputValidation = event => {
        const name = event.target.name;
        const email = this.state.email;
        const { isInputValue, errorMessage } = this.validateInput(name, email.value);
        const newState = {
            value: email.value,
            isInputValue: email.isInputValue,
            errorMessage: email.errorMessage
        }; /* dummy object */
        newState.isInputValue = isInputValue;
        newState.errorMessage = errorMessage;
        this.setState({
            email: {...newState}
        })
    }
    //nếu form chưa nhập đúng thông tin thì bằng true
    checkingForm =() =>{
        return this.state.email.isInputValue===false?true:false;
    }
    handleForgotPassword = async (event) =>{
        event.preventDefault();
        console.log(this.checkingForm())
        if(this.checkingForm()){
            toast.error(`Vui lòng nhập email!`);
            return;
        }
        
        toast.info("Khôi phục mật khẩu...");
        const forgotReduxdata = await this.props.forgotPasswordAction(this.state.email.value);
        
        if(forgotReduxdata.type === FORGOT_PASSWORD_SUCCESS){
            toast.success('Khôi phục mật khẩu hoàn tất. Vui lòng kiểm tra gmail!')
            this.props.handleChangeShowFormLogin();
        }
        else if(forgotReduxdata.type === FORGOT_PASSWORD_ERROR)
            toast.warn("Gmail chưa được đăng ký!");
        else
            toast.error('Đã xãy ra lỗi trong quá trình khôi phục mật khẩu!')

    }
    render() {
        return (
            <div className="forgotPassword_container">
                <CloseIcon onClick={()=>{this.props.handleChangeShowFormLogin()}} style={{position: 'absolute', top:'5px', right:'5px',fontSize:'20px', cursor:'pointer'}}/>
                <div className="title">
                    <h2>Quên mật khẩu</h2>
                </div>
                <form>
                    <div className="input_email">
                        <label htmlFor="email">Mật khẩu sẽ được gửi về gmail:</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            id="email" 
                            onChange ={(event)=>{this.onChangeInput(event)}}
                            onBlur={(event) =>{this.handleInputValidation(event)}}
                        />
                        <FormError 
                            type="email"
                            isHidden={this.state.email.isInputValue} 
                            errorMessage={this.state.email.errorMessage}
                        />
                    </div>
                    <div className="btn_submit">
                        <button onClick={(event)=>{this.handleForgotPassword(event)}}>Gửi</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        forgotPasswordReducer: state.forgotPasswordReducer
    };
  };
  
  //dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
    return {
        forgotPasswordAction: async (email) =>{
            const action = await forgotPasswordAction(email);
            return dispatch(action);
        }
    };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ForgotPassword))
