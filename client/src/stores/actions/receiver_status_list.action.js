import React from 'react';
import axios from 'axios';
import {
    RECEIVER_STATUS_LIST_NO_COMPLETE_SUCCESS,
    RECEIVER_STATUS_LIST_NO_COMPLETE_LOADING,
    RECEIVER_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_receiver_status_list_no_complete = async () =>{
    const action = {
        type:  RECEIVER_STATUS_LIST_NO_COMPLETE_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/RECEIVER/no_completed/list`)
        .then(response =>{
            action.type =  RECEIVER_STATUS_LIST_NO_COMPLETE_SUCCESS;
            action.payload.receiver_status_list = response.data;
        })
        .catch(err =>{
            action.type =  RECEIVER_STATUS_LIST_NO_COMPLETE_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action
}



export {get_receiver_status_list_no_complete};
