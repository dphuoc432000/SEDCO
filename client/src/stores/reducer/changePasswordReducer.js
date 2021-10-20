import React from "react";
import {
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
} from "../../constants/actions";

const initState = {
    user:{},
    message: ''
}

const changePasswordReducer = (state, action) =>{
    state = initState;
    switch(action.type){
        case CHANGE_PASSWORD_SUCCESS:
            // console.log('send email success');
            return {...state}
        case CHANGE_PASSWORD_ERROR:
            // console.log('send email error')
            return {...action.payload};
        default:
            return state;
    }
}
export default changePasswordReducer;