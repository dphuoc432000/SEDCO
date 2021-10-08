import React from "react";
import {LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS} from "../../constants/actions";

const initState = {
    users: [
        {id: 1, name: 'Erc'}
    ]
}

const rootReducer = (state, action)=>{
    state = initState;
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log('success')
            return {...action.payload}
        case LOGIN_ERROR:
            console.log('error')
            return {...action.payload};
        default:
            return state;
    }
}

export default rootReducer;