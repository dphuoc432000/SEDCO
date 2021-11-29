import React from "react";
import {
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS,
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_LOADING,
    GET_MESSAGE_LIST_BY_CONVERSATION_ID_ERROR,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_LOADING,
    ADD_MESSAGE_ERROR,
} from '../../constants/actions';

const initState = {
    message_list: [],
    pagination_message_list: {}
}

const messageReducer = (state = initState, action) =>{
    switch(action.type){
        case GET_MESSAGE_LIST_BY_CONVERSATION_ID_SUCCESS:
            return {...state, message_list: action.payload.message_list, pagination_message_list: action.payload.pagination};
        case GET_MESSAGE_LIST_BY_CONVERSATION_ID_ERROR:
            return {...state, error: action.payload};
        case GET_MESSAGE_LIST_BY_CONVERSATION_ID_LOADING:
            return {...state};
        case ADD_MESSAGE_SUCCESS:
            return {...state};
        case ADD_MESSAGE_ERROR:
            return {...state, error: action.payload};
        case ADD_MESSAGE_LOADING:
            return {...state};
        default:
            return {...state};
    }
}

export default messageReducer;