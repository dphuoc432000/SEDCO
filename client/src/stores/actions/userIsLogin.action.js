import React from "react";
import axios from 'axios';
import {
    USER_IS_LOGINED_ERROR,
    USER_IS_LOGINED_LOADING,
    USER_IS_LOGINED_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_LOADING
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const getUserInforIsLogined = async (account_id)=>{
    const action ={
        type:USER_IS_LOGINED_LOADING,
        payload:{}
    }

    const api_account_detail = `${API_URL}/api/account/${account_id}/detail`;
    const account_detail = await axios.get(api_account_detail)
        .then(res => res.data)
        .catch(err=>{
            action.type = USER_IS_LOGINED_ERROR;
            action.payload = {
                description: "Tên đăng nhập hoặc mật khẩu không chính xác",
                message:err.message,
                errdata: err.response.data
            };
        });

    const api_user_detail = `${API_URL}/api/user/${account_detail.user_id}/detail`;
    await axios.get(api_user_detail)
        .then(res => {
            action.type = USER_IS_LOGINED_SUCCESS;
            action.payload.account = account_detail;
            action.payload.user = res.data;
        })
        .catch(err=>{
            action.type = USER_IS_LOGINED_ERROR;
            action.payload = {
                description: "Tên đăng nhập hoặc mật khẩu không chính xác",
                message:err.message,
                errdata: err.response.data
            };
        });

    return action;
}

const updateUserInfor = async (user_id, user_update) =>{
    const action ={
        type:UPDATE_USER_LOADING,
        payload:{}
    };

    const api_update_user = `${API_URL}/api/user/${user_id}/update`;
    await axios.post(api_update_user, user_update)
        .then(res =>{
            action.type = UPDATE_USER_SUCCESS;
            action.payload = res.data;
        })
        .catch(err=>{
            action.type = UPDATE_USER_ERROR;
            action.payload = {
                description: "User_id hoặc dữ liệu lên không hợp lệ",
                message:err.message,
                errdata: err.response.data
            };
        });

    return action;
}

export {getUserInforIsLogined, updateUserInfor}