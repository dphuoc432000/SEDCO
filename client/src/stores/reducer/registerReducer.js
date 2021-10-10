import React from "react";
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_LOADING
} from "../../constants/actions";

const initState = {
    account:{
        account_id: '',
        role_id: '',
        accessToken:''    
    }
}

const registerReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case REGISTER_SUCCESS:
            console.log('register success')
            const account ={
                ...action.payload
            }
            console.log(account)
            return {...state, account}
        case REGISTER_ERROR:
            console.log('error')
            return {...action.payload};
        default:
            return state;
    }
}

export default registerReducer;