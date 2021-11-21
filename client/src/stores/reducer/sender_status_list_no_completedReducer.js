import React from 'react';
import axios from 'axios';
import {
    SENDER_STATUS_LIST_NO_COMPLETE_SUCCESS,
    SENDER_STATUS_LIST_NO_COMPLETE_LOADING,
    SENDER_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';

const initState ={
    status_list: []
}

const senderStatusListNoCompletedReducer = (state = initState, action) =>{
    switch(action.type){
        case SENDER_STATUS_LIST_NO_COMPLETE_SUCCESS:
            return {...state,sender_status_list: action.payload.sender_status_list};
        case SENDER_STATUS_LIST_NO_COMPLETE_ERROR:
            return {...state,error: action.payload};
        case SENDER_STATUS_LIST_NO_COMPLETE_LOADING:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default senderStatusListNoCompletedReducer;