import React from 'react';
import axios from 'axios';
import {
    SENDER_STATUS_LIST_NO_COMPLETE_SUCCESS,
    SENDER_STATUS_LIST_NO_COMPLETE_LOADING,
    SENDER_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_sender_status_list_no_complete = async () =>{
    const action = {
        type:  SENDER_STATUS_LIST_NO_COMPLETE_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/SENDER/no_completed/list`)
        .then(response =>{
            action.type =  SENDER_STATUS_LIST_NO_COMPLETE_SUCCESS;
            action.payload.sender_status_list = response.data;
        })
        .catch(err =>{
            action.type =  SENDER_STATUS_LIST_NO_COMPLETE_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action
}



export {get_sender_status_list_no_complete};
