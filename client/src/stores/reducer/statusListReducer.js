import React from "react";
import {
  GET_STATUS_LIST_SUCCESS,
  GET_STATUS_LIST_LOADING,
  GET_STATUS_LIST_ERROR,
  GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS,
  GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_ERROR,
  GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_LOADING,
  GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS,
  GET_ALL_HISTORY_OF_RECEIVER_STATUS_ERROR,
  GET_ALL_HISTORY_OF_RECEIVER_STATUS_LOADING,
  GET_ALL_HISTORY_OF_SENDER_STATUS_SUCCESS,
  GET_ALL_HISTORY_OF_SENDER_STATUS_ERROR,
  GET_ALL_HISTORY_OF_SENDER_STATUS_LOADING

} from "../../constants/actions";

const initState = {
    status_list: [],
    pagination:{},
    history_receiver_list:[],
    pagination_history_receiver_status:{},
    history_sender_list:[],
    pagination_history_sender_status:{}
}

const statusListReducer = (state=initState, action) =>{
    switch(action.type){
        case GET_STATUS_LIST_SUCCESS:
            state.status_list = action.payload.status_list;
            state.pagination = action.payload.pagination;
            return {...state}
        case GET_STATUS_LIST_LOADING:
            return {...state, ...action.payload}
        case GET_STATUS_LIST_ERROR:
            return {...state, ...action.payload}  
        case GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_SUCCESS:
            state.status_list = action.payload.status_list;
            state.pagination = action.payload.pagination;
            return {...state}
        case GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_LOADING:
            return {...state, ...action.payload}
        case GET_STATUS_LIST_BY_TYPE_HAVE_FILTER_ERROR:
            return {...state, ...action.payload} 
        case GET_ALL_HISTORY_OF_RECEIVER_STATUS_SUCCESS:
            state.history_receiver_list = action.payload.history_receiver_list;
            state.pagination_history_receiver_status = action.payload.pagination;
            return {...state}
        case GET_ALL_HISTORY_OF_RECEIVER_STATUS_ERROR:
            return {...state, ...action.payload}
        case GET_ALL_HISTORY_OF_RECEIVER_STATUS_LOADING:
            return {...state, ...action.payload}
        case GET_ALL_HISTORY_OF_SENDER_STATUS_SUCCESS:
            state.history_sender_list = action.payload.history_sender_list;
            state.pagination_history_sender_status = action.payload.pagination;
            return {...state}
        case GET_ALL_HISTORY_OF_SENDER_STATUS_ERROR:
            return {...state, ...action.payload}
        case GET_ALL_HISTORY_OF_SENDER_STATUS_LOADING:
            return {...state, ...action.payload}
        default :
            return state;
    }
}
export default statusListReducer;