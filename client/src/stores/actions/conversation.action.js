import React from "react";
import {
    GET_CONVERSATION_LIST_ERROR,
    GET_CONVERSATION_LIST_LOADING,
    GET_CONVERSATION_LIST_SUCCESS,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_ERROR,
    CREATE_CONVERSATION_LOADING,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_ERROR,
    GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_LOADING,
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
//{sender_id, receiver_id}
const create_conversation_action = async(object) =>{
    const action ={
        type: CREATE_CONVERSATION_LOADING,
        payload: {}
    }
    await axios.post(`${API_URL}/api/conversation/create`, object)
        .then(res =>{
            action.type = CREATE_CONVERSATION_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = CREATE_CONVERSATION_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            }
        })
        // console.log(action)
    return action;
}

//lấy conversation của mình và người dùng khác
const get_conversation_by_account_id_receiver_id_action = async(account_id, receiver_id) =>{
    const action ={
        type: GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_LOADING,
        payload: {}
    }
    // console.log(account_id, receiver_id)
    await axios.get(`${API_URL}/api/conversation/${account_id}/${receiver_id}/get`)
        .then(res =>{
            action.type = GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            }
        })
        // console.log(action)
    return action;
}


export {get_conversation_list_action, create_conversation_action, get_conversation_by_account_id_receiver_id_action};