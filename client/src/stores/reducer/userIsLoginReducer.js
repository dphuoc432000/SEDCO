import React from "react";
import axios from 'axios';
import {
    USER_IS_LOGINED_ERROR,
    USER_IS_LOGINED_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from "../../constants/actions";

const initState = {
    account:{},
    user:{}
};

const userIsLoginReducer = (state, action) =>{
    state = initState;
    switch(action.type){
        case USER_IS_LOGINED_SUCCESS:
            const account = action.payload.account;
            const user = action.payload.user;
            return {...state, account, user};
        case USER_IS_LOGINED_ERROR:
            return {...state, payload: action.payload};
        case UPDATE_USER_SUCCESS:
            console.log(action.payload)
            return {...state, user: action.payload};
        case UPDATE_USER_ERROR:
            return {...state, payload:action.payload}
        default:
            return state
    }
}
export default userIsLoginReducer;