import React from "react";
import axios from 'axios';
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_ACCOUNT_LOADING,
    LOGOUT_ACCOUNT_SUCCESS,
    LOGOUT_ACCOUNT_ERROR,
} from "../../constants/actions";
import {API_URL} from '../../constants/api';


const login = async (account) =>{
    const action ={
        type: LOGIN_LOADING,
        payload:{},
    }
    const data_account = {
        username: account.username.value,
        password: account.password.value
    }
    await axios.post(`${API_URL}/api/authentication/signin`,data_account,{withCredentials: true})
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
    console.log(action)
    return action;
}
const logout = async () =>{
    const action ={
        type: LOGOUT_ACCOUNT_LOADING,
        payload:{},
    }
    await axios.get(`${API_URL}/api/authentication/logout`,{withCredentials: true})
        .then(data => {
            action.type = LOGOUT_ACCOUNT_SUCCESS;
        })
        .catch(err => {
            action.type = LOGOUT_ACCOUNT_ERROR;
        });
    return action;
}
export {login, logout};