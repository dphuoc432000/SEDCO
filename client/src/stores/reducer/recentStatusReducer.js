import React from 'react';
import {
    GET_RECENT_STATUS_ERROR,
    GET_RECENT_STATUS_SUCCESS,
    GET_RECENT_STATUS_LOADING
} from '../../constants/actions';

const initState = {
    recent_status_list:[]
}

const recentStatusReducer = (state = initState, action) =>{
    switch(action.type){
        case GET_RECENT_STATUS_SUCCESS:
            return {...state, recent_status_list: action.payload};
        case GET_RECENT_STATUS_ERROR:
            return {...state, ...action.payload};
        case GET_RECENT_STATUS_LOADING:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default recentStatusReducer;