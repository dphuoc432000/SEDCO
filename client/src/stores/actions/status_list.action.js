import React from 'react';
import axios from 'axios';
import {
    STATUS_LIST_NO_COMPLETE_SUCCESS,
    STATUS_LIST_NO_COMPLETE_LOADING,
    STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_status_list_no_complete = async () =>{
    const action = {
        type: STATUS_LIST_NO_COMPLETE_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/no_completed/list`)
        .then(response =>{
            action.type = STATUS_LIST_NO_COMPLETE_SUCCESS;
            action.payload.status_list = response.data;
        })
        .catch(err =>{
            action.type = STATUS_LIST_NO_COMPLETE_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action
}

export {get_status_list_no_complete};
