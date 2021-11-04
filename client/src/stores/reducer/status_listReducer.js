import React from 'react';
import axios from 'axios';
import {
    STATUS_LIST_NO_COMPLETE_SUCCESS,
    STATUS_LIST_NO_COMPLETE_LOADING,
    STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';

const initState ={
    status_list: []
}

const statusListReducer = (state = initState, action) =>{
    switch(action.type){
        case STATUS_LIST_NO_COMPLETE_SUCCESS:
            return {...state,status_list: action.payload.status_list};
        case STATUS_LIST_NO_COMPLETE_ERROR:
            return {...state,error: action.payload};
        case STATUS_LIST_NO_COMPLETE_LOADING:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default statusListReducer;