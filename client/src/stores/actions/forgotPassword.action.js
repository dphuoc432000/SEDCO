import React from "react";
import axios from 'axios';
import {
    FORGOT_PASSWORD_LOADING,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const forgotPasswordAction = async (email) =>{
    const action ={
        type: FORGOT_PASSWORD_LOADING,
        payload:{}
    }

    await axios.post(`${API_URL}/api/authentication/forgot_password`,{email})
        .then(res => {
            action.type = FORGOT_PASSWORD_SUCCESS;
            action.payload = {
                data: res.data,
                message:"Send email thành công"
            };
            console.log(action.payload )
        })
        .catch(err => {
            action.type = FORGOT_PASSWORD_ERROR;
            action.payload = {
                description: "API FORGOT PASSWORD ERROR",
                message:err.message
            };
        });

    return action;
}

export default forgotPasswordAction;