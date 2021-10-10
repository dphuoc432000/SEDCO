import React from "react";
import {ROLE_USER} from "../../constants/actions";
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
    }
}

const roleReducer = (state, action)=>{
    state = initState
    switch(action.type) {
        case ROLE_USER: 
            console.log('ROLE_USER success');
            const role_user = {
                role_id: action.payload._id,
                role_name: action.payload.role_name,
            }
            return {...state, role_user}
        default:
            return state;
    }
}

export default roleReducer;