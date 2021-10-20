import React from "react";
import axios from 'axios';
import {
    CHANGE_PASSWORD_LOADING,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from "../../constants/actions";
import {API_URL} from '../../constants/api';


const ChangePasswordAction = async (account_id, password_old, password_new) =>{
    const action ={
        type: CHANGE_PASSWORD_LOADING,
        payload:{},
    }
    await axios.post(`${API_URL}/api/account/${account_id}/password/update`,{password_old, password_new})
        .then(data => {
            action.type = CHANGE_PASSWORD_SUCCESS;
            action.payload = data.data;
        })
        .catch(err => {
            action.type = CHANGE_PASSWORD_ERROR;

            action.payload = {
                description: "Mật khẩu không chính xác!",
                message:err.message,
                errdata: err.response.data
            };
        });
    console.log(action)
    return action;
}

export {ChangePasswordAction};