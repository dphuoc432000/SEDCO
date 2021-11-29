import React from "react";
import {
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS,
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_LOADING,
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_ERROR,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_LOADING,
    ADD_MESSAGE_ERROR,
} from '../../constants/actions';
import axios from 'axios';
import {API_URL} from '../../constants/api';

const get_message_list_action = async(conversation_id,_limit,_page) =>{
    const action ={
        type: GET_MESSAGE_LIST_BY_CONVERSATION_ID_LOADING,
        payload: {}
    }
    await axios.get(`${API_URL}/api/message/${conversation_id}/list?_limit=${_limit}&_page=${_page}`)
        .then(res =>{
            action.type = GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = GET_MESSAGE_LIST_BY_CONVERSATION_ID_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            }
        })
        // console.log(action)
    return action;
}
//
//object =>{conversation_id, account_id, text}
const add_message_action = async(object) =>{
    const action ={
        type: ADD_MESSAGE_LOADING,
        payload: {}
    }
    await axios.post(`${API_URL}/api/message/create`, object)
        .then(res =>{
            action.type = ADD_MESSAGE_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = ADD_MESSAGE_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            }
        })
        console.log(action)
    return action;
}
export {get_message_list_action, add_message_action};