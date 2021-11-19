import React from "react";
import {
    GET_REPORT_LIST_HAVE_FILTER_SUCCESS,
    GET_REPORT_LIST_HAVE_FILTER_LOADING,
    GET_REPORT_LIST_HAVE_FILTER_ERROR
} from '../../constants/actions';

const initState = {
    report_list: [],
    pagination:{},
}

const reportListReducer = (state=initState, action) =>{
    switch(action.type){
        case GET_REPORT_LIST_HAVE_FILTER_SUCCESS:
            state.report_list = action.payload.report_list;
            state.pagination = action.payload.pagination;
            return {...state}
        case GET_REPORT_LIST_HAVE_FILTER_LOADING:
            return {...state, ...action.payload}
        case GET_REPORT_LIST_HAVE_FILTER_ERROR:
            return {...state, ...action.payload}  
        default:
            return state;
    }
}
export default reportListReducer;