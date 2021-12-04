import React from 'react';
import axios from 'axios';
import {
    GET_REPORT_LIST_HAVE_FILTER_SUCCESS,
    GET_REPORT_LIST_HAVE_FILTER_LOADING,
    GET_REPORT_LIST_HAVE_FILTER_ERROR,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_ERROR,
    CREATE_REPORT_LOADING,
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_report_list_have_filter_action = async (sort, _limit,_page) =>{
    const action = {
        type: GET_REPORT_LIST_HAVE_FILTER_LOADING,
        payload: {}
    };

    await axios.get(`${API_URL}/api/report/list/filter?sort=${sort}&_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_REPORT_LIST_HAVE_FILTER_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = GET_REPORT_LIST_HAVE_FILTER_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

const create_report_action = async (account_id,status_id, object) =>{
    const action = {
        type: CREATE_REPORT_LOADING,
        payload: {}
    };

    await axios.post(`${API_URL}/api/report/${account_id}/${status_id}/create`, object)
        .then(res =>{
            action.type = CREATE_REPORT_SUCCESS;
            action.payload = res.data;
        })
        .catch((err) => {
            action.type = CREATE_REPORT_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })
    return action;
}

export {get_report_list_have_filter_action, create_report_action};
