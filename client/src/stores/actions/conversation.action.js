import React from "react";
import {
    GET_CONVERSATION_LIST_ERROR,
    GET_CONVERSATION_LIST_LOADING,
    GET_CONVERSATION_LIST_SUCCESS
} from '../../constants/actions';
import axios from 'axios';
import {API_URL} from '../../constants/api';

const get_conversation_list_action = async(account_id) =>{
    const action ={
        type: GET_CONVERSATION_LIST_LOADING,
        payload: {}
    }
    await axios.get(`${API_URL}/api/conversation/${account_id}/list`)
        .then(res =>{
            action.type = GET_CONVERSATION_LIST_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = GET_CONVERSATION_LIST_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            }
        })
        // console.log(action)
    return action;
}
export {get_conversation_list_action};