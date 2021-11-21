import React from "react";
import {
    GET_ACCOUNT_LIST_SUCCESS,
    GET_ACCOUNT_LIST_ERROR,
    GET_ACCOUNT_LIST_LOADING
} from "../../constants/actions";

const initState = {
    account_list: [],
    pagination:{}
}

const accountReducer = (state=initState, action) =>{
    switch(action.type){
        case GET_ACCOUNT_LIST_SUCCESS:
            state.account_list = action.payload.account_list;
            state.pagination = action.payload.pagination;
            return {...state}
        case GET_ACCOUNT_LIST_ERROR:
            return {...state, ...action.payload}
        case GET_ACCOUNT_LIST_LOADING:
            return {...state, ...action.payload}   
        default :
            return state;
    }
}

export default accountReducer;
