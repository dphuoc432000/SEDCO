import React, { Component } from 'react';
import './UpdateUserInforForm.css';
import FormError from '../../../components/FormError/FormError';
import { cities as citiesAction } from "../../../stores/actions/cities.action";
import { districts as districtsAction } from "../../../stores/actions/districts.action";
import { withRouter}from "react-router-dom";
import {getUserInforIsLogined, updateUserInfor} from '../../../stores/actions/userIsLogin.action';
import { connect } from "react-redux";
import {toast } from 'react-toastify';
import {UPDATE_USER_SUCCESS,UPDATE_USER_ERROR} from '../../../constants/actions'
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
            // console.log(user)
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
                cities: [...cities]
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
        this.setState({
            user_infor:{
                ...this.state.user_infor,
                city:{
                    ...this.state.user_infor.city,
                    value: event.target.value
                }
            }
        })
        const city_select = document.getElementById("city");
        const city_code = city_select.options[city_select.selectedIndex].getAttribute("data_id");
        console.log(city_code)
        const district_select = document.getElementById("district");
        district_select.value = "";

        await this.props.get_districts(city_code);
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
        const verifydata = {...await this.props.verifyTokenData};
        await this.props.get_User_Infor_Is_Logined(verifydata.account_id);
        const user_id = await this.props.userIsLogined.user._id;
        const user_update = {
            full_name: this.state.user_infor.full_name.value,
            age: this.state.user_infor.age.value,
            email: this.state.user_infor.email.value,
            phone_number: this.state.user_infor.phone_number.value,
            city: this.state.user_infor.city.value,
            district: this.state.user_infor.district.value,
            address: this.state.user_infor.specific_address.value
        }            
        // console.log(user_update)
        const action = await this.props.update_user_infor(user_id,user_update)
        // console.log(user_id)
        // console.log(action)
        if(action.type !== UPDATE_USER_SUCCESS){
            toast.error("Cập nhật thất bại. Vui lòng nhập dữ liệu bắt buộc!");
            return;
        }
        this.props.handlUpdateFull_name(user_update.full_name);
        toast.success("Cập nhật thành công!");
        this.props.history.push("/user/information")
        console.log(await this.props.dataRedux)
    }

    render() {
        const user_infor = this.state.user_infor;
        const cities = this.state.cities;
        const districts = this.state.districts;
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
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                        <td className="input_age">
                                            <input 
                                                type="number" 
                                                placeholder="Tuổi" 
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.age.value} 
                                                name="age" 
                                                id="age" 
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
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
                                    <tr>
                                        <td className="input_email">
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.email.value} 
                                                name="email" 
                                                id="email" 
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
                                            />
                                        </td>
                                        <td className="input_phone_number">
                                            <input 
                                                type="text" 
                                                placeholder="Số điện thoại(Bắt buộc)*" 
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.phone_number.value} 
                                                name="phone_number" 
                                                id="phone_number" 
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
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
                                    <tr>
                                        <td className="input_city">
                                            <select id="city" name="city" value={user_infor.city.value} onChange={(event) => {this.onChangeCitySelect(event)}}
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
                                            >
                                                <option>Chọn tỉnh/thành phố(Bắt buộc)*</option>
                                                {cities.map((item,index)=>{
                                                    return <option key={item.code} data_id={item.code} value={item.name}>{item.name}</option> 
                                                })}
                                            </select>
                                        </td>
                                        <td className="input_district">
                                            <select id="district" name="district" value={user_infor.district.value} onChange={(event) => {this.onChangeDistrictSelect(event)}}
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
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
                                    <tr>
                                        <td colSpan={2} className="input_specific_address">
                                            <input 
                                                type="text" 
                                                placeholder="Địa chỉ cụ thể(Bắt buộc)*"
                                                onChange={(event) => {this.onChangeUpdateForm(event)}} 
                                                value={user_infor.specific_address.value} 
                                                name="specific_address" 
                                                id="specific_address" 
                                                onBlur={(event) =>{this.handleInputValidation(event)}}
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
                                    <tr>
                                        <td>
                                            <p>Mặt trước</p>
                                        </td>
                                        <td>
                                            <p>Mặt sau</p>
                                        </td>
                                    </tr>
                                    <tr className="identity_card_img_container">
                                        <td className="img_front">
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="id_card_front"/>
                                            <label htmlFor="id_card_front">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                        <td className="img_back"> 
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="id_card_back"/>
                                            <label htmlFor="id_card_back">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2} >
                                            <span>Khuôn mặt</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="img" colSpan={2}  >
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="face_img"/>
                                            <label htmlFor="face_img">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2} >
                                            <span >Giấy phép lái xe</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Mặt trước</p>
                                        </td>
                                        <td>
                                            <p>Mặt sau</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="img_front">
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="driving_front"/>
                                            <label htmlFor="driving_front">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                        <td className="img_back">
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="driving_back"/>
                                            <label htmlFor="driving_back">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr className="img_input_title">
                                        <td colSpan={2}>
                                            <span >Giấy xét nghiệm Covid/Đã tiêm vaccine</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="img">
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="covid_test_1"/>
                                            <label htmlFor="covid_test_1">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                        <td className="img">
                                            <input type="file" name="" style={{visibility:'hidden', display: 'none'}} id="covid_test_2"/>
                                            <label htmlFor="covid_test_2">
                                                <p>Thêm hình ảnh</p>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn_submit">
                                <input type="button" onClick={() => {this.handleUpdate()}} value="Cập nhật" />
                            </div>
                        </form>
                        <div className="btn-back-page">
                            <p onClick={() => {this.handleBackPage()}}>Quay lại</p>
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
      userIsLogined: state.userIsLoginReducer
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
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdateUserInforForm));