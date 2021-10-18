import React from "react";
import {LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_ACCOUNT} from "../../constants/actions";


const initState = {
    account:{
        account_id: '',
        role_id: '',
        accessToken:''    
    },
    isLogined: false,
    user:{
        name: "phuoc"
    }
}

const loginReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log('success');
            const account ={
                account_id: action.payload._id,
                role_id: action.payload.role_id,
                accessToken: action.payload.accessToken
            }
            const isLogined = true;
            return {...state, account, isLogined}
        case LOGIN_ERROR:
            console.log('error')
            return {...action.payload};
        case LOGOUT_ACCOUNT:
            return initState;
        default:
            return state;
    }
}

export default loginReducer;