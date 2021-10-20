import './changePassword.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import FormError from '../FormError/FormError';
import {toast } from 'react-toastify';
import {ChangePasswordAction} from '../../stores/actions/changePassword.action';
import {CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR} from '../../constants/actions';
import CloseIcon from '@mui/icons-material/Close';

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
            case 'password_old':
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

    handleComparePasswordOld_New = (event) =>{
        if(this.state.password_new.value !== '' &&
            this.state.password_old.value === this.state.password_new.value){
            this.setState({
                password_new:{
                    ...this.state.password_new,
                    isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Mật khẩu mới đã trùng mật khẩu cũ.'
                }
            })
        }
        else(
            this.handleInputValidation(event)
        )
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

    onChangeInput= event =>{
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

    handleChangePassword = async (event) =>{
        event.preventDefault();
        const verifyTokenData = await this.props.verifyTokenData;
        const changePasswordReduxData = 
            await this.props.changePasswordAction(
                verifyTokenData.account_id, 
                this.state.password_old.value,
                this.state.password_new.value);
                console.log(changePasswordReduxData);
        if(changePasswordReduxData.type === CHANGE_PASSWORD_SUCCESS){
            toast.success("Cập nhật mật khẩu thành công!");
            this.props.handleShowChangePasswordForm();
        }
        else if(changePasswordReduxData.type === CHANGE_PASSWORD_ERROR)
            toast.error(`${changePasswordReduxData.payload.errdata.errors.description}`);
        else
            toast.warn("Đã xãy ra lỗi trong quá trình cập nhật mật khẩu!");
    }

    render() {
        return (
            <div className="changePassword_container">
            <CloseIcon onClick={()=>{this.props.handleShowChangePasswordForm()}} style={{position: 'absolute', top:'5px', right:'5px',fontSize:'20px', cursor:'pointer'}}/>
                <div className="title">
                    <h2>Đổi mật khẩu</h2>
                </div>
                <form>
                    <div className="input-password_old">
                        <input 
                            type="password" 
                            placeholder="Nhập password cũ" 
                            name="password_old" 
                            id="password_old" 
                            onChange ={(event)=>{this.onChangeInput(event)}}
                            onBlur={(event) =>{this.handleInputValidation(event)}}
                        />
                        <FormError 
                            type="password_old"
                            isHidden={this.state.password_old.isInputValue} 
                            errorMessage={this.state.password_old.errorMessage}
                        />
                    </div>
                    <div className="input-password_new">
                        <input 
                            type="password" 
                            placeholder="Nhập password mới" 
                            name="password_new" 
                            id="password_new" 
                            onChange ={(event)=>{this.onChangeInput(event)}}
                            onBlur={(event) =>{this.handleInputValidation(event)}}
                        />
                        <FormError 
                            type="password_new"
                            isHidden={this.state.password_new.isInputValue} 
                            errorMessage={this.state.password_new.errorMessage}
                        />
                    </div>
                    <div className="input-password_new_again">
                        <input 
                            type="password" 
                            placeholder="Nhập lại password mới" 
                            name="password_new_again" 
                            id="password_new_again" 
                            onChange ={(event)=>{this.onChangeInput(event)}}
                            onBlur={(event) =>{this.handleConfirmPassword(event)}}
                        />
                        <FormError 
                            type="password_new_again"
                            isHidden={this.state.password_new_again.isInputValue} 
                            errorMessage={this.state.password_new_again.errorMessage}
                        />
                    </div>
                    <div className="btn_submit">
                        <button onClick={(event)=>{this.handleChangePassword(event)}}>Thay đổi</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        dataRedux: state,
        changePasswordReducer: state.changePasswordReducer,
        verifyTokenData: state.verifyTokenReducer,
    }
}

//dispatch này của redux không phải react
const mapDispatchToProps =(dispatch)=>{
    return {
        changePasswordAction: async (account_id, password_old, password_new) =>{
            const action = await ChangePasswordAction(account_id, password_old, password_new);
            return dispatch(action)
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChangePassword))
