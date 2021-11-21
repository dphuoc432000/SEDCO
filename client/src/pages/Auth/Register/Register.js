import React from 'react';
import {withRouter}from "react-router-dom";
import "./Register.css";
import { connect } from "react-redux";
import { cities as citiesAction } from "../../../stores/actions/cities.action";
import { districts as districtsAction } from "../../../stores/actions/districts.action";
import { register as registerAction } from "../../../stores/actions/register.action";
import {REGISTER_SUCCESS} from "../../../constants/actions"
import { FormError } from '../../../components/FormError/FormError';
import {toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

class Register extends React.Component{

    state={
        user_infor: {
            username:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            password:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            full_name:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            age:{
                value:"",
                isInputValue: true,
                errorMessage:''
            },
            email:{
                value:"",
                isInputValue: true,
                errorMessage:''
            },
            phone_number:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            city:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            district:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
            specific_address:{
                value:"",
                isInputValue: false,
                errorMessage:''
            },
        },
        password_again:{
            value:"",
            isInputValue: false,
            errorMessage:''
        },
        districts: [],
        cities: [],
    }
    
    async componentDidMount(){
        try {
            await this.props.get_cities();
            const cities = this.props.dataRedux.citiesReducer.cities;
            this.setState({
                cities: [...cities]
            })
        } catch (error) {
            console.log(error.message)
        }
    }
  
    checkingForm =() =>{
        const dataForm = [...Object.values(this.state.user_infor)];
        return dataForm.some((item)=>{
            return item.isInputValue === false
        })
    }

    handleRegister = async() =>{
        //Nếu có feild chưa nhập thì đúng. Nhập hết rồi thì là sai
        if(this.checkingForm()){
            toast.error(`Đăng ký thất bại. Vui lòng nhập thông tin bắt buộc!`);
        }
        else{
            //chay action
            const regisActionPropsData = await this.props.register(this.state.user_infor);
            //Đăng ký thất bại
            if(regisActionPropsData.type !== REGISTER_SUCCESS){
                toast.warn(`Đã xãy ra lỗi trong quá trình đăng ký. ${regisActionPropsData.payload.errdata}!`);
                return;
            }
            //Đăng ký thành công
            toast.success("Đăng ký tài khoản thành công. Mời bạn đăng nhập!");
            this.props.history.push('/');
            this.props.handleChangeShowFormLogin();
        }
    }

    handleDistricts = (districts) => {
        this.setState({
        districts: [...districts],
        });
    }

    onChangeCitySelect = async (event) => {
        const city_select = document.getElementById("city");
        const city_code =
        city_select.options[city_select.selectedIndex].getAttribute("data_id");

        const district_select = document.getElementById("district");
        district_select.value = "";


            await this.props.get_districts(city_code);
            this.setState({
                user_infor:{
                    ...this.state.user_infor,
                    city:{
                        ...this.state.user_infor.city,
                        value: event.target.value
                    }
                }
            })
            const districts = this.props.dataRedux.districtsReducer.districts;
            this.handleDistricts(districts)
    }

    onChangeDistrictSelect = (event) =>{
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                district:{
                    ...this.state.user_infor.district,
                    value: event.target.value,
                } 
            }
        })
    }

    onChangeRegisterForm = event =>{
        let value = event.target.value;
        const name = event.target.name;
        const dataValidate = this.validateInput(name, value)
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                [name]:{
                    ...this.state.user_infor[name],
                    value,
                    ...dataValidate
                } 
            }
        })
    }

    onChangePasswordAgain = (event) =>{
        this.setState({
            password_again: {
                ...this.state.password_again,
                value: event.target.value
            }
        })
    }

    validateInput = (type, checkingText) => {
        switch (type) {
            case 'username':
                var usernameRegex = /^[a-zA-Z0-9]+$/;
                const checkingusernameRegex = usernameRegex.exec(checkingText);
                if (checkingusernameRegex !== null) {
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập 6 ký tự trở lên. Bao gồm: a-z, A-Z, 0-9!'};
                
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
            case 'full_name':
                var full_name_regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{5,}$/;
                if((full_name_regex).test(checkingText)) 
                { 
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: 4 ký tự trở lên!'};
            case 'age':
                if(checkingText==='')
                    return { isInputValue: true,
                        errorMessage: ''};
                const age = parseInt(checkingText, 10);
                
                if (isNaN(age) || age < 1 || age > 100)
                { 
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: số từ 1 đến 100!'};
                }
                    
                return { isInputValue: true,
                    errorMessage: ''};
            case 'email':
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkingText)|| checkingText === "")
                {
                    return { isInputValue: true,
                        errorMessage: ''};
                }
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Email không hợp lệ!'};
            case 'phone_number':
                const regexp = /^\d{10,11}$/;
                const checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return { isInputValue: true,
                            errorMessage: ''};
                } else {
                    return { isInputValue: false,
                            errorMessage: 'Vui lòng nhập lại. Bao gồm: 10-11 chữ số 0-9!'};
                }
            case 'city':
                if (checkingText) {
                    return { isInputValue: true,
                            errorMessage: ''};
                } else {
                    return { isInputValue: false,
                            errorMessage: 'Vui lòng chọn tỉnh/thành phố!'};
                }
            case 'district':
                if (checkingText) {
                    return { isInputValue: true,
                            errorMessage: ''};
                } else {
                    return { isInputValue: false,
                            errorMessage: 'Vui lòng chọn quận/huyện!'};
                }
            case 'specific_address':
                const specific_address_reg = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ0-9/.\s,'-]{5,}$/ 
                if(specific_address_reg.test(checkingText))
                    return { isInputValue: true,
                        errorMessage: ''};
                return { isInputValue: false,
                    errorMessage: 'Vui lòng nhập lại. Bao gồm: 5 ký tự trở lên a-z, A-Z, 0-9, ", - / ."!'};  
            default:
                break;
        }
        
    }
    
    handleInputValidation = event => {
        const { name } = event.target;
        const { isInputValue, errorMessage } = this.validateInput(name, this.state.user_infor[name].value);
        const newState = {
            value: this.state.user_infor[name].value,
            isInputValue: this.state.user_infor[name].isInputValue,
            errorMessage: this.state.user_infor[name].errorMessage
        }; /* dummy object */
        newState.isInputValue = isInputValue;
        newState.errorMessage = errorMessage;
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                [name]: {...newState}
            }
        })
    }

    validateConfirmPassword = () =>{
        const password = this.state.user_infor.password.value;
        const password_again = this.state.password_again.value;
        console.log(password, password_again)
        if(password === password_again)
            return { isInputValue: true,
                errorMessage: ''};
        return { isInputValue: false,
            errorMessage: 'Vui lòng nhập lại. Mật khâu không trùng khớp!'};  
    }

    handleConfirmPassword = () =>{
        const { isInputValue, errorMessage } = this.validateConfirmPassword();
        const newState = {
            value: this.state.password_again.value,
            isInputValue: this.state.password_again.isInputValue,
            errorMessage: this.state.password_again.errorMessage
        };
        newState.isInputValue = isInputValue;
        newState.errorMessage = errorMessage;
        this.setState({
            password_again:{
                ...newState
            }
        })
    }

    render(){
        const cities = this.state.cities;
        const districts = this.state.districts;
        return(
            <React.Fragment>
                <div className="register_container">
                <CloseIcon onClick={()=>{this.props.handleChangeShowFormLogin()}} style={{position: 'absolute', top:'5px', right:'5px',fontSize:'20px', cursor:'pointer'}}/>
                    <div className="title">
                        <h2>Đăng ký</h2>
                    </div>
                    <form>
                        <div className="account_infor">
                            <span>Thông tin tài khoản<p style={{color:'red'}}>*</p></span>
                            <div className="input_username">
                                <input 
                                    type="text" 
                                    placeholder="Tên đăng nhập(Bắt buộc)*" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.username.value}  
                                    name="username" 
                                    id="username"
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="username"
                                isHidden={this.state.user_infor.username.isInputValue} 
                                errorMessage={this.state.user_infor.username.errorMessage}
                            />
                            <div className="input_password">
                                <input 
                                    type="password"  
                                    placeholder="Mật khẩu(Bắt buộc)*" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.password.value} 
                                    name="password" 
                                    id="password"
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="password"
                                isHidden={this.state.user_infor.password.isInputValue} 
                                errorMessage={this.state.user_infor.password.errorMessage}
                            />
                            <div className="input_password_again">
                                <input 
                                    type="password"  
                                    placeholder="Nhập lại mật khẩu(Bắt buộc)*" 
                                    onChange={(event) => {this.onChangePasswordAgain(event)}} 
                                    value={this.state.password_again.value}
                                    name="password_again" 
                                    id="password_again" 
                                    onBlur={(event) =>{this.handleConfirmPassword(event)}}
                                />
                            </div>
                            <FormError 
                                type="password_again"
                                isHidden={this.state.password_again.isInputValue} 
                                errorMessage={this.state.password_again.errorMessage}
                            />
                        </div>
                        <div className="input_user_infor">
                            <span>Thông tin người dùng<p style={{color:'red'}}>*</p></span>
                            <div className="full_name">
                                <input 
                                    type="text" 
                                    placeholder="Họ và tên(Bắt buộc)*" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.full_name.value} 
                                    name="full_name" 
                                    id="full_name"
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="full_name"
                                isHidden={this.state.user_infor.full_name.isInputValue} 
                                errorMessage={this.state.user_infor.full_name.errorMessage}
                            />
                            <div className="input_age">
                                <input 
                                    type="number" 
                                    placeholder="Tuổi" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.age.value} 
                                    name="age" 
                                    id="age" 
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="age"
                                isHidden={this.state.user_infor.age.isInputValue} 
                                errorMessage={this.state.user_infor.age.errorMessage}
                            />
                            <div className="input_email">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.email.value} 
                                    name="email" 
                                    id="email" 
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="email"
                                isHidden={this.state.user_infor.email.isInputValue} 
                                errorMessage={this.state.user_infor.email.errorMessage}
                            />
                            <div className="input_phone_number">
                                <input 
                                    type="text" 
                                    placeholder="Số điện thoại(Bắt buộc)*" 
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.phone_number.value} 
                                    name="phone_number" 
                                    id="phone_number" 
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="phone_number"
                                isHidden={this.state.user_infor.phone_number.isInputValue} 
                                errorMessage={this.state.user_infor.phone_number.errorMessage}
                            />
                            <div className="input_address">
                                <div className="input_city">
                                    <select id="city" name="city" onChange={(event) => {this.onChangeCitySelect(event)}}
                                        onBlur={(event) =>{this.handleInputValidation(event)}}
                                    >
                                        <option value="">Chọn tỉnh/thành phố(Bắt buộc)*</option>
                                        {cities.map((item,index)=>{
                                            return <option key={item.code} data_id={item.code} value={item.name}>{item.name}</option> 
                                        })}
                                    </select>
                                    
                                </div>
                                
                                <div className="input_district">
                                    <select id="district" name="district" onChange={(event) => {this.onChangeDistrictSelect(event)}}
                                        onBlur={(event) =>{this.handleInputValidation(event)}}
                                    >
                                        <option value="" >Chọn quận/huyện(Bắt buộc)*</option>
                                        {districts.map((item,index)=>{
                                            return <option key={index} value={item.name}>{item.name}</option> 
                                        })}
                                        
                                    </select>
                                    
                                </div>
                                
                            </div>
                            <FormError 
                                type="city"
                                isHidden={this.state.user_infor.city.isInputValue} 
                                errorMessage={this.state.user_infor.city.errorMessage}
                                style={{paddingLeft: '17px'}}
                            />
                            <FormError 
                                type="district"
                                isHidden={this.state.user_infor.district.isInputValue} 
                                errorMessage={this.state.user_infor.district.errorMessage}
                            />
                            <div className="input_specific_address">
                                <input 
                                    type="text" 
                                    placeholder="Địa chỉ cụ thể(Bắt buộc)*"
                                    onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                    value={this.state.user_infor.specific_address.value} 
                                    name="specific_address" 
                                    id="specific_address" 
                                    onBlur={(event) =>{this.handleInputValidation(event)}}
                                />
                            </div>
                            <FormError 
                                type="specific_address"
                                isHidden={this.state.user_infor.specific_address.isInputValue} 
                                errorMessage={this.state.user_infor.specific_address.errorMessage}
                            />
                        </div>
                        <div className="btn_submit">
                            <input type="button" onClick={() => {this.handleRegister()}} value="Đăng ký" />
                        </div>
                    </form>
                                
                    <div className="btn_login">
                        <p onClick={()=>{this.props.handleChangeShowFormLogin()}}>Đăng nhập</p>
                    </div>
                </div>
            </React.Fragment>
        );
    } 
}
const mapStateToProps = (state) => {
  return {
    dataRedux: state,
  };
};

//dispatch này của redux không phải react
const mapDispatchToProps = (dispatch) => {
  return {
    get_cities: async () => {
      const action = await citiesAction();
      return dispatch(action);
    },
    get_districts: async (province_code) => {
      const action = await districtsAction(province_code);
      return dispatch(action);
    },
    register: async (user_infor) => {
      const action = await registerAction(user_infor);
      return dispatch(action);
    },
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register));
