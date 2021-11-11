import React from 'react';
import axios from 'axios';
import {
    GET_RECENT_STATUS_ERROR,
    GET_RECENT_STATUS_SUCCESS,
    GET_RECENT_STATUS_LOADING
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_recent_status = async () =>{
    const action = {
        type: GET_RECENT_STATUS_LOADING,
        action:{}
    }

    await axios.get(`${API_URL}/api/status/get/recent/list`)
        .then(res =>{
            action.type = GET_RECENT_STATUS_SUCCESS
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = GET_RECENT_STATUS_ERROR;
            action.payload = {
                description: "API RECENT STATUS ERROR",
                message:err.message,
                errdata: err.response.data
            };
        })
    return action;
}

export {get_recent_status};