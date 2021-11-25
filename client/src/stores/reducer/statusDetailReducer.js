import React from 'react';
import axios from 'axios';
import {
    STATUS_DETAIL_LOADING,
    STATUS_DETAIL_SUCCESS,
    STATUS_DETAIL_ERROR,
} from "../../constants/actions";

const initState ={
    status:{}
}

const statusDetailReducer = (state = initState, action) =>{
    switch(action.type){
        case STATUS_DETAIL_SUCCESS:
            return {...state,status: action.payload};
        case STATUS_DETAIL_ERROR:
            return {...state,error: action.payload};
        case STATUS_DETAIL_LOADING:
            return {...state};
        default:
            return state;
    }
}

export default statusDetailReducer;