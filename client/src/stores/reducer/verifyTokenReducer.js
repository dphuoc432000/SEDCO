import React from "react";
import jwt from 'jsonwebtoken';
import {serect} from '../../constants/token'
const initState = {
    account_id: '',
    role_id:''
}
// import {ROLE_USER, ROLE_USER_ERROR} from '../../constants/actions';

const verifyTokenReducer = (state, action)=>{
    state = initState;
    // console.log("page load serect: ", action.payload)
    let data;
    try {
        data = jwt.verify(localStorage.getItem("accessToken"), serect);
        state.account_id = data._id;
        state.role_id = data.role_id;
    } catch (error) {
        console.log(error.message)
    }
    return state;
}

export default verifyTokenReducer;