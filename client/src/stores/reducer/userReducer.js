import React from "react";
import {
    USER_DETAIL_ERROR,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_LOADING,
    GET_USER_BY_ACCOUNT_ID_SUCCESS,
    GET_USER_BY_ACCOUNT_ID_LOADING,
    GET_USER_BY_ACCOUNT_ID_ERROR,
} from "../../constants/actions";

const initState = {
    user: {}
}

const userReducer = (state=initState, action) =>{
    switch(action.type){
        case USER_DETAIL_SUCCESS:
            state.user = action.payload;
            return {...state}
        case USER_DETAIL_ERROR:
            return {...state, ...action.payload}
        case USER_DETAIL_LOADING:
            return {...state, ...action.payload}   
        case GET_USER_BY_ACCOUNT_ID_SUCCESS:
            state.user = action.payload;
            return {...state}
        case GET_USER_BY_ACCOUNT_ID_ERROR:
            return {...state, ...action.payload}
        case GET_USER_BY_ACCOUNT_ID_LOADING:
            return {...state, ...action.payload}   
        default :
            return state;
    }
}

export default userReducer;