import React from "react";
import axios from 'axios';
import {
    ROLE_USER,
    ROLE_USER_ERROR,
    GET_ROLE_BY_ACCOUNT_ID_SUCCESS,
    GET_ROLE_BY_ACCOUNT_ID_ERROR,
    GET_ROLE_BY_ACCOUNT_ID_LOADING,
} from "../../constants/actions";
import {API_URL} from '../../constants/api';

const get_role_user = async (role_id) =>{
    const action ={
        type: ROLE_USER,
        payload:{}
    }

    await axios.get(`${API_URL}/api/role/${role_id}/detail`)
        .then(data => {
            action.payload = data.data;
            // console.log(action.payload)
        })
        .catch(err => {
            action.type = ROLE_USER_ERROR;
            action.payload = {
                description: "ROLE_USER không xác định",
                message:err.message
            };
        });

    return action;
}
const get_role_by_account_id = async(account_id) =>{
    const action ={
        type: GET_ROLE_BY_ACCOUNT_ID_LOADING,
        payload:{}
    }

    await axios.get(`${API_URL}/api/role/account/${account_id}/detail`)
        .then(data => {
            action.type=GET_ROLE_BY_ACCOUNT_ID_SUCCESS;
            action.payload = data.data;
            // console.log(action.payload)
        })
        .catch(err => {
            action.type = GET_ROLE_BY_ACCOUNT_ID_ERROR;
            action.payload = {
                description: "account_id không xác định",
                message:err.message
            };
        });

    return action;
}
export {get_role_user, get_role_by_account_id};