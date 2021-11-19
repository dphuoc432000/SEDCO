import React from "react";
import {
    USER_DETAIL_ERROR,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_LOADING
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
        default :
            return state;
    }
}

export default userReducer;