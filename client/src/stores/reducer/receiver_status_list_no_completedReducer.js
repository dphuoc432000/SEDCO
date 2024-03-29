import React from 'react';
import axios from 'axios';
import {
    RECEIVER_STATUS_LIST_NO_COMPLETE_SUCCESS,
    RECEIVER_STATUS_LIST_NO_COMPLETE_LOADING,
    RECEIVER_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';

const initState ={
    status_list: []
}

const receiverStatusListNoCompletedReducer = (state = initState, action) =>{
    switch(action.type){
        case RECEIVER_STATUS_LIST_NO_COMPLETE_SUCCESS:
            return {...state,receiver_status_list: action.payload.receiver_status_list};
        case RECEIVER_STATUS_LIST_NO_COMPLETE_ERROR:
            return {...state,error: action.payload};
        case RECEIVER_STATUS_LIST_NO_COMPLETE_LOADING:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default receiverStatusListNoCompletedReducer;