import React from 'react';
import axios from 'axios';
import {
    GET_REPORT_LIST_HAVE_FILTER_SUCCESS,
    GET_REPORT_LIST_HAVE_FILTER_LOADING,
    GET_REPORT_LIST_HAVE_FILTER_ERROR
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

export {get_report_list_have_filter_action};
