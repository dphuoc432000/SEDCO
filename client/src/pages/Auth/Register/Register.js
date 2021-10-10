import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link}from "react-router-dom";
import "./Register.css";
import {connect} from 'react-redux';
import {cities as citiesAction} from '../../../stores/actions/cities.action';
import {districts as districtsAction} from '../../../stores/actions/districts.action';
import {register as registerAction} from '../../../stores/actions/register.action';
import Header from "../../../components/Header/Header";
import {REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS} from "../../../constants/actions"

class Register extends React.Component{

    state={
        user_infor: {
            username:"",
            password:"",
            full_name:"",
            age:"",
            email:"",
            phone_number:"",
            city:"",
            district:"",
            specific_address:"",
        },
        password_again:"",
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

    handleRegister = async() =>{
        console.log(await this.props.register(this.state.user_infor))
        const regisActionType = await this.props.register(this.state.user_infor).type;
        if(regisActionType !== REGISTER_SUCCESS){
            alert("Đăng ký tài khoản lỗi, vui lòng đăng ký lại");
            return;
        }
        const data = this.props.dataRedux.registerReducer;
        console.log(data);
    }

    handleDistricts = (districts)=>{
        this.setState({
            districts: [...districts]
        })
    }

    onChangeCitySelect = async(event) =>{
        const city_select = document.getElementById('city');
        const city_code = city_select.options[city_select.selectedIndex].getAttribute("data_id");

        const district_select = document.getElementById('district');
        district_select.value = "";

        await this.props.get_districts(city_code);
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                city: event.target.value
            }
        })
        const districts = this.props.dataRedux.districtsReducer.districts;
        this.handleDistricts(districts)
    }

    onChangeDistrictSelect = (event) =>{
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                district: event.target.value
            }
        })
    }
    onChangeRegisterForm = event =>{
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangePasswordAgain = (event) =>{
        this.setState({
            password_again: event.target.value
        })
    }

    render(){
        const cities = this.state.cities;
        const districts = this.state.districts;
        return(
            <React.Fragment>
                <Header />
                <main>
                    <div className="register_container">
                        <div className="title">
                            <h2>Đăng ký</h2>
                        </div>
                        <form>
                            <div className="account_infor">
                                <span>Thông tin tài khoản</span>
                                <div className="input_username">
                                    <input 
                                        type="text" 
                                        placeholder="Tên đăng nhập" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.username}  
                                        name="username" 
                                        id="username"
                                    />
                                </div>
                                <div className="input_password">
                                    <input 
                                        type="password"  
                                        placeholder="Mật khẩu" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.password} 
                                        name="password" 
                                        id="password"/>
                                </div>
                                <div className="input_password_again">
                                    <input 
                                        type="password"  
                                        placeholder="Nhập lại mật khẩu" 
                                        onChange={(event) => {this.onChangePasswordAgain(event)}} 
                                        value={this.state.password_again}
                                        name="password_again" 
                                        id="password_again"
                                    />
                                </div>
                            </div>
                            <div className="input_user_infor">
                                <span>Thông tin người dùng</span>
                                <div className="full_name">
                                    <input 
                                        type="text" 
                                        placeholder="Họ và tên" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.full_name} 
                                        name="full_name" 
                                        id="full_name"
                                    />
                                </div>
                                <div className="input_age">
                                    <input 
                                        type="number" 
                                        placeholder="Tuổi" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.age} 
                                        name="age" 
                                        id="age" 
                                    />
                                </div>
                                <div className="input_email">
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.email} 
                                        name="email" 
                                        id="email" 
                                    />
                                </div>
                                <div className="input_phone_number">
                                    <input 
                                        type="text" 
                                        placeholder="Số điện thoại" 
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.phone_number} 
                                        name="phone_number" 
                                        id="phone_number" 
                                    />
                                </div>
                                <div className="input_address">
                                    <div className="input_city">
                                        <select id="city" name="city" onChange={(event) => {this.onChangeCitySelect(event)}}>
                                            <option value="">Chọn tỉnh/thành phố</option>
                                            {cities.map((item,index)=>{
                                                return <option key={item.code} data_id={item.code} value={item.name}>{item.name}</option> 
                                            })}
                                        </select>
                                    </div>
                                    <div className="input_district">
                                        <select id="district" name="district" onChange={(event) => {this.onChangeDistrictSelect(event)}}>
                                            <option value="" value>Chọn quận/huyện</option>
                                            {districts.map((item,index)=>{
                                                return <option key={index} value={item.name}>{item.name}</option> 
                                            })}
                                            
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="input_specific_address">
                                    <input 
                                        type="text" 
                                        placeholder="Địa chỉ cụ thể"
                                        onChange={(event) => {this.onChangeRegisterForm(event)}} 
                                        value={this.state.user_infor.specific_address} 
                                        name="specific_address" 
                                        id="specific_address" 
                                    />
                                </div>
                            </div>
                            <div className="btn_submit">
                                <input type="button" onClick={() => {this.handleRegister()}} value="Đăng ký" />
                            </div>
                        </form>
                                    
                        <div className="btn_login">
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
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
        get_cities: async () => {
            const action = await citiesAction()
            return dispatch(action)
        },
        get_districts: async(province_code) =>{
            const action = await districtsAction(province_code)
            return dispatch(action)
        },
        register: async(user_infor) =>{
            const action = await registerAction(user_infor)
            return dispatch(action);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);