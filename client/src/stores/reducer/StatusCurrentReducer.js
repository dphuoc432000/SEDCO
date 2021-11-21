import React from "react";
import jwt from 'jsonwebtoken';
import {serect} from '../../constants/token';
import {API_URL} from '../../constants/api';
import axios from "axios";
import {
    STATUS_CURRENT_LOADING,
    STATUS_CURRENT_SUCCESS,
    STATUS_CURRENT_ERROR,
  } from "../../constants/actions";
const initState = {
    
};

// import {ROLE_USER, ROLE_USER_ERROR} from '../../constants/actions';
// const get_status_detail_by_account_id  = async (account_id) =>{
//     return await axios.get(`${API_URL}/api/status/account_id/${account_id}/detail`)
//         .then(response => response.data)
//         .catch(err => err);
// }
// const statusCurrentReducer = async (state, action)=>{
//     state = initState;
//     // console.log("page load serect: ", action.payload)
//     let data;
//     try {
//         data = jwt.verify(localStorage.getItem("accessToken"), serect);
//         const account_id = data._id;
//         const status_current_data = await get_status_detail_by_account_id(account_id).then(data=>data);
//         state = status_current_data;
//     } catch (error) {
//         state.error={
//             err:error,
//             message: error.message
//         }
//     }
//     return state;
// }
const statusCurrentReducer = (state = initState, action) => {
    switch(action.type){
        case  STATUS_CURRENT_LOADING : 
            return {
                ...state,
                ...action.payload,
            }
        case STATUS_CURRENT_SUCCESS : 
            return {
                ...state,
                ...action.payload,
            }
        case STATUS_CURRENT_ERROR : 
            return {
                ...state,
                ...action.payload,
            }
        default :
            return {
                ...state
            }
      
    }
}
export default statusCurrentReducer;