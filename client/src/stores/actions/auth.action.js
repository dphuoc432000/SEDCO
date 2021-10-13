import React from "react";
import axios from 'axios';
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';


const login = async (account) =>{
    const action ={
        type: LOGIN_LOADING,
        payload:{}
    }
    const data_account = {
        username: account.username.value,
        password: account.password.value
    }
    await axios.post(`${API_URL}/api/authentication/signin`,data_account)
        .then(data => {
            action.type = LOGIN_SUCCESS;
            action.payload = data.data;
            localStorage.setItem("accessToken", data.data.accessToken);
            
        })
        .catch(err => {
            action.type = LOGIN_ERROR;
            action.payload = {
                description: "Tên đăng nhập hoặc mật khẩu không chính xác",
                message:err.message,
                errdata: err.response.data
            };
        });

    return action;
}

export {login};