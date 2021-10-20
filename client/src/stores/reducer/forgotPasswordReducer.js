import React from "react";
import {
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
} from "../../constants/actions";

const initState = {
    message: ''
}

const forgotPasswordReducer = (state, action) =>{
    state = initState;
    switch(action.type){
        case FORGOT_PASSWORD_SUCCESS:
            console.log('send email success');
            return {...state}
        case FORGOT_PASSWORD_ERROR:
            console.log('send email error')
            return {...action.payload};
        default:
            return state;
    }
}
export default forgotPasswordReducer;