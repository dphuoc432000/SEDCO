import React from 'react';
import axios from 'axios';
import {
    GET_STATUS_LIST_LOADING,
    GET_STATUS_LIST_SUCCESS,
    GET_STATUS_LIST_ERROR,
    GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS,
    GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_ERROR,
    GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_LOADING,
    GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS,
    GET_ALL_HISTORY_OF_RECEIVER_STATUS_ERROR,
    GET_ALL_HISTORY_OF_RECEIVER_STATUS_LOADING,
    GET_ALL_HISTORY_OF_SENDER_STATUS_SUCCESS,
    GET_ALL_HISTORY_OF_SENDER_STATUS_ERROR,
    GET_ALL_HISTORY_OF_SENDER_STATUS_LOADING,
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_status_list_action = async (_limit,_page) =>{
    const action = {
        type: GET_STATUS_LIST_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/list?_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_STATUS_LIST_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_STATUS_LIST_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

//filter: status_completed
const get_status_list_by_type_have_filter_action = async (status_type,status_completed,_limit,_page) =>{
    const action = {
        type: GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/${status_type}/list/filter?status_completed=${status_completed}&_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

//lấy tất cả lịch sử của một receiver status bằng receiver_status_id
const get_all_history_of_receiver_status_action = async(receiver_status_id,_limit,_page)=>{
    const action = {
        type: GET_ALL_HISTORY_OF_RECEIVER_STATUS_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/history/receiver/${receiver_status_id}/list?_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_ALL_HISTORY_OF_RECEIVER_STATUS_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

const get_all_history_of_sender_status_action = async(sender_status_id,_limit,_page)=>{
    const action = {
        type: GET_ALL_HISTORY_OF_SENDER_STATUS_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/history/sender/${sender_status_id}/list?_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_ALL_HISTORY_OF_SENDER_STATUS_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_ALL_HISTORY_OF_SENDER_STATUS_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}
export {get_status_list_action, get_status_list_by_type_have_filter_action, get_all_history_of_receiver_status_action, get_all_history_of_sender_status_action}