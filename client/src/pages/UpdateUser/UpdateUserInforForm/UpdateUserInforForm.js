import React, { Component } from 'react';
import './UpdateUserInforForm.css';
import FormError from '../../../components/FormError/FormError';
import { cities as citiesAction } from "../../../stores/actions/cities.action";
import { districts as districtsAction } from "../../../stores/actions/districts.action";
import { withRouter}from "react-router-dom";
import {getUserInforIsLogined, updateUserInfor} from '../../../stores/actions/userIsLogin.action';
import { connect } from "react-redux";
import {toast } from 'react-toastify';
import {UPDATE_USER_SUCCESS,UPDATE_USER_ERROR} from '../../../constants/actions';
import {getVehicleCensorship_forUser} from '../../../stores/actions/vehicle_censorship.action';
import {API_IMAGE_URL} from '../../../constants/api';

// import Header from '../../components/Header/Header';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
class UpdateUserInforForm extends Component {
    checkInputedValue = (value) =>{
        return value?true:false;
    }
    mergeData = (data) =>{
        return data?data:"";
    }
    constructor(props) {
        super(props);
        this.state={
            user_infor: {
                full_name:{
                    value: "",
                    isInputValue:true,
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
                    isInputValue: true,
                    errorMessage:''
                },
                city:{
                    value:"",
                    isInputValue: true,
                    errorMessage:''
                },
                district:{
                    value:"",
                    isInputValue: true,
                    errorMessage:''
                },
                specific_address:{
                    value:"",
                    isInputValue: true,
                    errorMessage:''
                },
            },
            face_img: null,
            id_card_img_before: null,
            id_card_img_after:  null,
            driving_license_img_before:  null,
            driving_license_img_after: null,
            test_img_1: null,
            test_img_2:null,
            vehicle_censorship: [],
            districts: [],
            cities: [],
        }
        // console.log("đã vào constructor",this.props)
    }
    
    //kiểm tra feild đã có giá trị. Nếu chưa có trả về isInputValue = false,
    
    async componentDidMount(){
        
        try {
            await this.props.get_cities();
            const cities = await this.props.dataRedux.citiesReducer.cities;
            // const isInputValue = true;
            const verifydata = {...await this.props.verifyTokenData};
            await this.props.get_User_Infor_Is_Logined(verifydata.account_id);
            const user = {...await this.props.userIsLogined.user};
            //lấy district
            await this.props.getVehicleCensorship_forUser(user._id);
            const vehicle_censorship = this.props.vehicleCensorshipReducer;
            const city = cities.find(city =>{
                // console.log(city)
                return city.name === user.city
            })
            await this.props.get_districts(city.code);
            const districts = await this.props.dataRedux.districtsReducer.districts;
            this.setState({
                user_infor:{
                    ...this.state.user_infor,
                    full_name:{
                        ...this.state.user_infor.full_name,
                        value: user.full_name,
                        // isInputValue: this.checkInputedValue(user.full_name),
                    },
                    age:{
                        ...this.state.user_infor.age,
                        value:user.age,
                        // isInputValue: this.checkInputedValue(user.age),
                    },
                    email:{
                        ...this.state.user_infor.email,
                        value:user.email,
                        // isInputValue: this.checkInputedValue(user.email),
                    },
                    phone_number:{
                        ...this.state.user_infor.phone_number,
                        value:user.phone_number,
                        // isInputValue: this.checkInputedValue(user.phone_number),
                    },
                    city:{
                        ...this.state.user_infor.city,
                        value:user.city,
                        // isInputValue: this.checkInputedValue(user.city),
                    },
                    district:{
                        ...this.state.user_infor.district,
                        value:user.district,
                        // isInputValue: this.checkInputedValue(user.district),
                    },
                    specific_address:{
                        ...this.state.user_infor.specific_address,
                        value:user.address,
                        // isInputValue: this.checkInputedValue(user.address),
                    },
                },
                face_img: vehicle_censorship.face_img,
                id_card_img_before: vehicle_censorship.id_car_img_before,
                id_card_img_after:  vehicle_censorship.id_cad_img_after,
                driving_license_img_before:  vehicle_censorship.driving_licens_img_before,
                driving_license_img_after: vehicle_censorship.driving_licene_img_after,
                test_img_1: vehicle_censorship.test_img_1,
                test_img_2:vehicle_censorship.test_img_2,
                cities: [...cities],
                districts: [...districts],
                vehicle_censorship: vehicle_censorship
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    handleDistricts = (districts) => {
        this.setState({
            districts: [...districts],
        });
    }

    onChangeCitySelect = async (event) => {
        let value = event.target.value;
        const name = event.target.name;
        const dataValidate = this.validateInput(name, value)
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                city:{
                    ...this.state.user_infor.city,
                    value: event.target.value,
                    ...dataValidate
                }
            }
        })
        const city_select = document.getElementById("city");
        const city_code = city_select.options[city_select.selectedIndex].getAttribute("data_id");
        // console.log(city_code)
        const district_select = document.getElementById("district");
        district_select.value = "";
        let districts =[];

        await this.props.get_districts(city_code);
        districts =  await this.props.dataRedux.districtsReducer.districts;
        
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                district:{
                    value:"",
                    isInputValue: false,
                    errorMessage:''
                },
            }
        })
        this.handleDistricts(districts)
    }

    onChangeDistrictSelect = (event) =>{
        let value = event.target.value;
        const name = event.target.name;
        const dataValidate = this.validateInput(name, value)
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                district:{
                    ...this.state.user_infor.district,
                    value: value,
                    ...dataValidate
                } 
            }
        })
    }

    onChangeUpdateForm = event =>{
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

    validateInput = (type, checkingText) => {
        switch (type) {
            case 'full_name':
                var full_name_regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{4,}$/;
                var spec_char_regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if((full_name_regex).test(checkingText) && !(spec_char_regex).test(checkingText)) 
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

    handleBackPage = () =>{
        this.props.history.push("/user/information")
    }

    checkIsInput_ErrMess = (name)=>{
        const isInputValue = this.state.user_infor[name].isInputValue;
        const errMess = this.state.user_infor[name].errorMessage;
        if(!isInputValue && errMess)
            return false;
        return true;
    }

    handleUpdate = async () =>{
        if(this.checkingForm()){
            toast.error("Cập nhật thất bại. Vui lòng nhập thông tin bắt buộc!")
        }
        else{
            const verifydata = {...await this.props.verifyTokenData};
            await this.props.get_User_Infor_Is_Logined(verifydata.account_id);
            const user_id = await this.props.userIsLogined.user._id;
            
            let formData = new FormData();
            formData.append('face_img', this.state.face_img);
            formData.append('id_card_img_before', this.state.id_card_img_before);
            formData.append('id_card_img_after', this.state.id_card_img_after);
            formData.append('driving_license_img_before', this.state.driving_license_img_before);
            formData.append('driving_license_img_after', this.state.driving_license_img_after);
            formData.append('test_img_1', this.state.test_img_1);
            formData.append('test_img_2', this.state.test_img_2);
            formData.append('full_name', this.state.user_infor.full_name.value);
            formData.append('age', this.state.user_infor.age.value);
            formData.append('email', this.state.user_infor.email.value);
            formData.append('phone_number', this.state.user_infor.phone_number.value);
            formData.append('city', this.state.user_infor.city.value);
            formData.append('district', this.state.user_infor.district.value);
            formData.append('address', this.state.user_infor.specific_address.value);
            // const user_update = {
            //     full_name: this.state.user_infor.full_name.value,
            //     age: this.state.user_infor.age.value,
            //     email: this.state.user_infor.email.value,
            //     phone_number: this.state.user_infor.phone_number.value,
            //     city: this.state.user_infor.city.value,
            //     district: this.state.user_infor.district.value,
            //     address: this.state.user_infor.specific_address.value,
            // }
            // console.log(user_update)
            const action = await this.props.update_user_infor(user_id, formData)
            // console.log(user_id)
            // console.log(action)
            if(action.type !== UPDATE_USER_SUCCESS){
                toast.warn("Đã xãy ra lỗi trong quá trình cập nhật!");
                return;
            }
            this.props.handlUpdateFull_name(this.state.user_infor.full_name.value);
            toast.success("Cập nhật thành công!");
            this.props.history.push("/user/information")
        }
}

    checkingForm =() =>{
        const dataForm = [...Object.values(this.state.user_infor)];
        return dataForm.some((item)=>{
            return item.isInputValue === false
        })
    }

    handleAgeInput = (event) =>{
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    onChangeImageInput =(event, id_img) =>{
        // console.log(id_img)
        const output = document.getElementById(id_img);
        const file = event.target.files[0];
        const name = event.target.name;
        // console.log(output)
        if(file){
            // console.log(URL.createObjectURL(file))
            output.src = URL.createObjectURL(file);
            output.onload = function() {
                URL.revokeObjectURL(output.src) // free memory
            }
            this.setState({
                [name]: file    
            })
        }
    }

    render() {
        const user_infor = this.state.user_infor;
        const cities = this.state.cities;
        const districts = this.state.districts;
        const vehicle_censorship = this.state.vehicle_censorship;
        // console.log(this.state)
        return (
            <main>
                <div className="layer_form_update_container">
                    <div className="form_update_container">
                        <div className="title">
                            <h2>Cập nhật thông tin cá nhân</h2> 
                        </div>
                        <form>
                            <table className="form_private_infor">
                                <caption>
                                    Thông tin người dùng<p style={{color:'red'}}>*</p>
                                </caption>
                                <tbody id="form_user_infor">
                                    <tr className="input-title">
                                        <td>Họ và tên</td>
                                        <td>Tuổi</td>
                                    </tr>
                                    <tr className="input-data">
                                        <td className="full_name">
                                            <input 
                                                type="text" 
                                                placeholder="Họ và tên(Bắt buộc)*" 
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.full_name.value} 
                                                name="full_name" 
                                                id="full_name"
                                            />
                                        </td>
                                        <td className="input_age">
                                            <input 
                                                type="text" 
                                                placeholder="Tuổi" 
                                                onKeyPress={(event)=>this.handleAgeInput(event)}
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.age.value} 
                                                name="age" 
                                                id="age" 
                                                min="0"
                                                max="100"
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                    </tr>
                                    {(!this.checkIsInput_ErrMess("full_name"))||(!this.checkIsInput_ErrMess("age"))?
                                        <tr className="input-error">
                                            <td>
                                                <FormError 
                                                    type="full_name"
                                                    isHidden={user_infor.full_name.isInputValue} 
                                                    errorMessage={user_infor.full_name.errorMessage}
                                                    />
                                            </td>
                                            <td>
                                                <FormError 
                                                    type="age"
                                                    isHidden={user_infor.age.isInputValue} 
                                                    errorMessage={user_infor.age.errorMessage}
                                                />
                                            </td>
                                        </tr>:<tr style={{height:"0"}}></tr>
                                    }
                                    <tr className="input-title">
                                        <td>Email</td>
                                        <td>Số điện thoại</td>
                                    </tr>
                                    <tr className="input-data">
                                        <td className="input_email">
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.email.value} 
                                                name="email" 
                                                id="email" 
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                        <td className="input_phone_number">
                                            <input 
                                                type="text" 
                                                placeholder="Số điện thoại(Bắt buộc)*" 
                                                onKeyPress={(event)=>this.handleAgeInput(event)}
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.phone_number.value} 
                                                name="phone_number" 
                                                id="phone_number" 
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                    </tr>
                                    {(!this.checkIsInput_ErrMess("email"))||(!this.checkIsInput_ErrMess("phone_number"))?
                                        <tr className="input-error">
                                            <td>
                                                <FormError 
                                                    type="email"
                                                    isHidden={user_infor.email.isInputValue} 
                                                    errorMessage={user_infor.email.errorMessage}
                                                />
                                            </td>
                                            <td>
                                                <FormError 
                                                    type="phone_number"
                                                    isHidden={user_infor.phone_number.isInputValue} 
                                                    errorMessage={user_infor.phone_number.errorMessage}
                                                />
                                            </td>
                                        </tr>:<tr style={{height:"0"}}></tr>
                                    }
                                    <tr className="input-title">
                                        <td>Tỉnh/Thành phố</td>
                                        <td>Quận/Huyện</td>
                                    </tr>
                                    <tr className="input-data">
                                        <td className="input_city">
                                            <select id="city" name="city" value={user_infor.city.value} onChange={(event) => {this.onChangeCitySelect(event)}}
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            >
                                                <option value="">Chọn tỉnh/thành phố(Bắt buộc)*</option>
                                                {cities.map((item,index)=>{
                                                    return <option key={item.code} data_id={item.code} value={item.name}>{item.name}</option> 
                                                })}
                                            </select>
                                        </td>
                                        <td className="input_district">
                                            <select id="district" name="district" value={user_infor.district.value} onChange={(event) => {this.onChangeDistrictSelect(event)}}
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            >
                                                <option value="" >Chọn quận/huyện(Bắt buộc)*</option>
                                                {districts.map((item,index)=>{
                                                    return <option key={item.code} value={item.name}>{item.name}</option> 
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    {(!this.checkIsInput_ErrMess("city"))||(!this.checkIsInput_ErrMess("district"))?
                                        <tr className="input-error">
                                            <td>
                                                <FormError 
                                                    type="city"
                                                    isHidden={user_infor.city.isInputValue} 
                                                    errorMessage={user_infor.city.errorMessage}
                                                    style={{paddingLeft: '17px'}}
                                                />
                                            </td>
                                            <td>
                                                <FormError 
                                                    type="district"
                                                    isHidden={user_infor.district.isInputValue} 
                                                    errorMessage={user_infor.district.errorMessage}
                                                />
                                            </td>
                                        </tr>:<tr style={{height:"0"}}></tr>
                                    }
                                    <tr className="input-title">
                                        <td colSpan={2}>Địa chỉ cụ thể</td>
                                    </tr>
                                    <tr className="input-data">
                                        <td colSpan={2} className="input_specific_address">
                                            <input 
                                                type="text" 
                                                placeholder="Địa chỉ cụ thể(Bắt buộc)*"
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.specific_address.value} 
                                                name="specific_address" 
                                                id="specific_address" 
                                                // onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                    </tr>
                                    {(!this.checkIsInput_ErrMess("specific_address"))?
                                        <tr className="input-error">
                                            <td colSpan={2}>
                                                <FormError 
                                                    type="specific_address"
                                                    isHidden={user_infor.specific_address.isInputValue} 
                                                    errorMessage={user_infor.specific_address.errorMessage}
                                                />
                                            </td>
                                        </tr>:<tr style={{height:"0"}}></tr>
                                    }
                                </tbody> 
                            </table>
                            <table className="form_image">
                                <caption>Hình ảnh<p style={{color:'red'}}>(Dành cho đăng ký chuyến xe)</p></caption>
                                <tbody id="form_image_tbody">
                                    <tr className="img_input_title">
                                        <td colSpan={2} >
                                            <span>Căn cước công dân/CMND</span>
                                        </td>
                                    </tr> 
                                    <tr className="img_data_title">
                                        <td>
                                            <p>Mặt trước</p>
                                        </td>
                                        <td>
                                            <p>Mặt sau</p>
                                        </td>
                                    </tr>
                                    <tr className="identity_card_img_container img_data">
                                        <td className="img_front">
                                            <input 
                                                onChange={(event) => this.onChangeImageInput(event,'id_card_img_before_data')} 
                                                type="file" 
                                                name="id_card_img_before" 
                                                style={{visibility:'hidden', display: 'none'}} 
                                                id="id_card_front"
                                                accept="image/png, image/jpeg"
                                            />
                                            {vehicle_censorship.id_card_img_before ?
                                                <React.Fragment>
                                                    <label htmlFor="id_card_front">
                                                        <p>Chỉnh sửa</p>
                                                    </label>
                                                    <img src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_before}`} id="id_card_img_before_data" alt="" />
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <label htmlFor="id_card_front">
                                                        <p>Cập nhật</p>
                                                    </label>
                                                    <img src='' id="id_card_img_before_data" alt="" />
                                               </React.Fragment>
                                            }
                                            
                                        </td>
                                        <td className="img_back"> 
                                        <input 
                                            onChange={(event) => this.onChangeImageInput(event,'id_card_img_after_data')} 
                                            type="file" 
                                            name="id_card_img_after" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="id_card_back"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.id_card_img_after ?
                                            <React.Fragment>
                                                <label htmlFor="id_card_back">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.id_card_img_after}`} id="id_card_img_after_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="id_card_back">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="id_card_img_after_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2} >
                                            <span>Khuôn mặt</span>
                                        </td>
                                    </tr>
                                    <tr className="img_data">
                                        <td className="img" colSpan={2}  >
                                        <input 
                                            onChange={(event) => this.onChangeImageInput(event,'face_img_data')} 
                                            type="file" 
                                            name="face_img" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="face_img"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.face_img ?
                                            <React.Fragment>
                                                <label htmlFor="face_img">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.face_img}`} id="face_img_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="face_img">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="face_img_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2} >
                                            <span >Giấy phép lái xe</span>
                                        </td>
                                    </tr>
                                    <tr className="img_data_title">
                                        <td>
                                            <p>Mặt trước</p>
                                        </td>
                                        <td>
                                            <p>Mặt sau</p>
                                        </td>
                                    </tr>
                                    <tr className="img_data">
                                        <td className="img_front">
                                        <input
                                            onChange={(event) => this.onChangeImageInput(event,'driving_license_img_before_data')}
                                            type="file" 
                                            name="driving_license_img_before" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="driving_front"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.driving_license_img_before ?
                                            <React.Fragment>
                                                <label htmlFor="driving_front">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.driving_license_img_before}`} id="driving_license_img_before_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="driving_front">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="driving_license_img_before_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                        <td className="img_back">
                                        <input 
                                            onChange={(event) => this.onChangeImageInput(event,'driving_license_img_after_data')} 
                                            type="file" 
                                            name="driving_license_img_after" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="driving_back"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.driving_license_img_after ?
                                            <React.Fragment>
                                                <label htmlFor="driving_back">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.driving_license_img_after}`} id="driving_license_img_after_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="driving_back">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="driving_license_img_after_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2}>
                                            <span >Giấy xét nghiệm Covid/Đã tiêm vaccine</span>
                                        </td>
                                    </tr>
                                    <tr className="img_data">
                                        <td className="img">
                                        <input 
                                            onChange={(event) => this.onChangeImageInput(event,'test_img_1_data')} 
                                            type="file" 
                                            name="test_img_1" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="covid_test_1"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.test_img_1 ?
                                            <React.Fragment>
                                                <label htmlFor="covid_test_1">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_1}`} id="test_img_1_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="covid_test_1">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="test_img_1_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                        <td className="img">
                                        <input 
                                            onChange={(event) => this.onChangeImageInput(event,'test_img_2_data')} 
                                            type="file" 
                                            name="test_img_2" 
                                            style={{visibility:'hidden', display: 'none'}} 
                                            id="covid_test_2"
                                            accept="image/png, image/jpeg"
                                        />
                                        {vehicle_censorship.test_img_2 ?
                                            <React.Fragment>
                                                <label htmlFor="covid_test_2">
                                                    <p>Chỉnh sửa</p>
                                                </label>
                                                <img src={`${API_IMAGE_URL}\\${vehicle_censorship.test_img_2}`} id="test_img_2_data" alt="" />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <label htmlFor="covid_test_2">
                                                    <p>Cập nhật</p>
                                                </label>
                                                <img src='' id="test_img_2_data" alt="" />
                                            </React.Fragment>
                                        }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn_submit">
                                <input type="button" onClick={() => {this.handleUpdate()}} value="Cập nhật" />
                            </div>
                        </form>
                        <div className="btn-back-page">
                            <p onClick={() => {this.handleBackPage()}}><i className="fas fa-chevron-left GoodDetail-icon-back"></i>Quay lại</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      dataRedux: state,
      verifyTokenData: state.verifyTokenReducer,
      userIsLogined: state.userIsLoginReducer,
      vehicleCensorshipReducer: state.vehicleCensorshipReducer,
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
        get_User_Infor_Is_Logined: async (account_id) =>{
            const action = await getUserInforIsLogined(account_id);
            return dispatch(action);
        },
        update_user_infor: async (user_id, user_update)=>{
            const action = await updateUserInfor(user_id, user_update);
            return dispatch(action);
        },
        getVehicleCensorship_forUser: async(user_id) =>{
            const action = await getVehicleCensorship_forUser(user_id);
            return dispatch(action);
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdateUserInforForm));