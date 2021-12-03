import React from "react";
import axios from 'axios';
import {
    USER_DETAIL_ERROR,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_LOADING,
    GET_USER_BY_ACCOUNT_ID_SUCCESS,
    GET_USER_BY_ACCOUNT_ID_LOADING,
    GET_USER_BY_ACCOUNT_ID_ERROR,
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const get_user_detail_by_user_id_action = async (user_id) =>{
    const action = {
        type: USER_DETAIL_LOADING,
        payload:{}
    }

    await axios.get(`${API_URL}/api/user/${user_id}/detail`)
        .then(res =>{
            action.type = USER_DETAIL_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = USER_DETAIL_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action;
}

const get_user_detail_by_account_id_action = async (account_id) =>{
    const action = {
        type: GET_USER_BY_ACCOUNT_ID_LOADING ,
        payload:{}
    }

    await axios.get(`${API_URL}/api/user/account_id/${account_id}/detail`)
        .then(res =>{
            action.type = GET_USER_BY_ACCOUNT_ID_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = GET_USER_BY_ACCOUNT_ID_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action;
}

export {get_user_detail_by_user_id_action, get_user_detail_by_account_id_action};