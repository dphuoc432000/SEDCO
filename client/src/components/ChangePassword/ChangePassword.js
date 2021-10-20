import './changePassword.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import FormError from '../FormError/FormError';

class ChangePassword extends Component {
    state={
        password_old: {
            value: '',
            isInputValue: false,
            errorMessage:''
        },
        password_new: {
            value: '',
            isInputValue: false,
            errorMessage:''
        },
        password_new_again: {
            value: '',
            isInputValue: false,
            errorMessage:''
        }
    }
    
    validateInput = (type, checkingText) => {
        switch (type) {
            case 'password':
                this.handleConfirmPassword()
                var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if((passw).test(checkingText)) 
                { 
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: từ 6 đến 20 ký tự, ít nhất một chữ số, một chữ hoa và một chữ thường'};
            case 'password_new':
                this.handleConfirmPassword()
                var passw_new=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if((passw_new).test(checkingText)) 
                { 
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: từ 6 đến 20 ký tự, ít nhất một chữ số, một chữ hoa và một chữ thường'};
            default:
                break;
        }
        
    }

    validateConfirmPassword = () =>{
        const password_new = this.state.password_new.value;
        const password_new_again = this.state.password_new_again.value;
        console.log(password_new, password_new_again)
        if(password_new === password_new_again)
            return { isInputValue: true,
                errorMessage: ''};
        return { isInputValue: false,
            errorMessage: 'Vui lòng nhập lại. Mật khâu không trùng khớp!'};  
    }

    handleConfirmPassword = () =>{
        const { isInputValue, errorMessage } = this.validateConfirmPassword();
        const newState = {
            value: this.state.password_new_again.value,
            isInputValue: this.state.password_new_again.isInputValue,
            errorMessage: this.state.password_new_again.errorMessage
        };
        newState.isInputValue = isInputValue;
        newState.errorMessage = errorMessage;
        this.setState({
            password_new_again:{
                ...newState
            }
        })
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
            [name]: {...newState}
        })
    }

    checkingForm =() =>{
        const dataForm = [...Object.values(this.state)];
        return dataForm.some((item)=>{
            return item.isInputValue === false
        })
    }

    onChangeRegisterForm = event =>{
        let value = event.target.value;
        const name = event.target.name;
        const dataValidate = this.validateInput(name, value)
        this.setState({
            [name]:{
                ...this.state[name],
                value,
                ...dataValidate
            }
        })
    }

    render() {
        return (
            <div className="changePassword_container">
                <div className="title">
                    <h2>Đổi mật khẩu</h2>
                </div>
                <form>
                    <div className="input_email">
                        <input 
                            type="password" 
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

const mapStateToProps = (state) =>{
    return {
        dataRedux: state
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChangePassword))
