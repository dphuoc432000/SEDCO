import React from "react";
import jwt from 'jsonwebtoken';
import {serect} from '../../constants/token';
import {API_URL} from '../../constants/api';
import axios from "axios";

const initState = {
    account_id: '',
    role_id:''
};

// import {ROLE_USER, ROLE_USER_ERROR} from '../../constants/actions';
const get_account_by_id  = async (id) =>{
    return await axios.get(`${API_URL}/api/account/${id}/detail`)
        .then(response => response.data)
        .catch(err => err);
}
const verifyTokenReducer = async (state, action)=>{
    state = initState;
    // console.log("page load serect: ", action.payload)
    let data;
    try {
        data = jwt.verify(localStorage.getItem("accessToken"), serect);
        state.account_id = data._id;
        const account_data = await get_account_by_id(state.account_id).then(data=>data);
        state.role_id = account_data.role_id;
    } catch (error) {
        state.error={
            err:error,
            message: error.message
        }
    }
    return state;
}

export default verifyTokenReducer;