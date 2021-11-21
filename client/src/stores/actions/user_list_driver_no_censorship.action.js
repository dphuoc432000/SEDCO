import React from 'react';
import axios from 'axios';
import {
    GET_USER_LIST_NO_CENSORSHIP_ERROR,
    GET_USER_LIST_NO_CENSORSHIP_SUCCESS,
    GET_USER_LIST_NO_CENSORSHIP_LOADING
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_user_list_no_censorship_action = async (_limit, _page) =>{
    const action = {
        type:  GET_USER_LIST_NO_CENSORSHIP_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/user/no_censorship/list?_limit=${_limit}&_page=${_page}`)
        .then(response =>{
            action.type =  GET_USER_LIST_NO_CENSORSHIP_SUCCESS;
            action.payload = response.data;
        })
        .catch(err =>{
            action.type =  GET_USER_LIST_NO_CENSORSHIP_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action;
}



export {get_user_list_no_censorship_action};
