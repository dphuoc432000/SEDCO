import React from "react";
import {
    ROLE_USER,
    GET_ROLE_BY_ACCOUNT_ID_SUCCESS,
    GET_ROLE_BY_ACCOUNT_ID_ERROR,
    GET_ROLE_BY_ACCOUNT_ID_LOADING,
} from "../../constants/actions";
// import {API_URL} from '../../constants/api';
import roles from '../../constants/role';
// import axios from "axios";



// const getRoleAll = async() =>{
//     return await axios.get(`${API_URL}/api/role/list`)
//         .then(response => response.data)
//         .catch(err =>err);
// }

// getRoleAll().then((data) =>{console.log( data)})

const initState = {
    roles: roles,
    role_user:{
        role_id: '',
        role_name: '',
    },
    role_conversation:{}
}

const roleReducer = (state, action)=>{
    state = initState
    switch(action.type) {
        case ROLE_USER: 
            const role_user = {
                role_id: action.payload._id,
                role_name: action.payload.role_name,
            }
            return {...state, role_user}
        case GET_ROLE_BY_ACCOUNT_ID_SUCCESS: 
            return {...state, role_conversation: action.payload};
        case GET_ROLE_BY_ACCOUNT_ID_ERROR: 
            return {...state, error: action.payload};
        case GET_ROLE_BY_ACCOUNT_ID_LOADING: 
            return {...state};
        default:
            return state;
    }
}

export default roleReducer;