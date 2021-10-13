import React from "react";
import axios from 'axios';
import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';


const register = async (user_infor) =>{
    const action ={
        type: REGISTER_LOADING,
        payload:{}
    }
    const object = {
        username: user_infor.username.value,
        password: user_infor.password.value,
        full_name: user_infor.full_name.value,
        age: parseInt(user_infor.age.value),
        email: user_infor.email.value,
        phone_number: user_infor.phone_number.value,
        city: user_infor.city.value,
        district: user_infor.district.value,
        address: user_infor.specific_address.value,
    }
    await axios.post(`${API_URL}/api/authentication/register_user`, object)
        .then(data => {
            action.type = REGISTER_SUCCESS;
            action.payload = data.data;
            console.log("register action: ",action.payload);
        })
        .catch(err => {
            action.type = REGISTER_ERROR;
            action.payload = {
                description: "API REGISTER ERROR",
                message:err.message,
                errdata: err.response.data
            };
        });

    return action;
}

export {register};