import React from 'react';
import {
    GET_USER_LIST_NO_CENSORSHIP_ERROR,
    GET_USER_LIST_NO_CENSORSHIP_SUCCESS,
    GET_USER_LIST_NO_CENSORSHIP_LOADING
} from '../../constants/actions';

const initState = {
    user_driver_no_censorship: [],
    pagination:{}
}
const user_list_no_censorshipReducer = (state = initState, action) =>{
    switch(action.type){
        case GET_USER_LIST_NO_CENSORSHIP_SUCCESS:
            return {...state, user_driver_no_censorship: action.payload.user_driver_no_censorship, pagination: action.payload.pagination, };
        case GET_USER_LIST_NO_CENSORSHIP_ERROR:
            return {...state,error: action.payload};
        case GET_USER_LIST_NO_CENSORSHIP_LOADING:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default user_list_no_censorshipReducer;
