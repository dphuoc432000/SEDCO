import React from 'react';
import axios from 'axios';
import {
    GET_ACCOUNT_LIST_SUCCESS,
    GET_ACCOUNT_LIST_ERROR,
    GET_ACCOUNT_LIST_LOADING
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const get_account_list_action = async (_limit,_page) =>{
    const action = {
        type: GET_ACCOUNT_LIST_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/account/list?_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_ACCOUNT_LIST_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_ACCOUNT_LIST_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

export {get_account_list_action};