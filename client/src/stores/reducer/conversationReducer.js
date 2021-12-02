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

const initState = {
    conversation_list: [],
    pagination_conversation_list: {},
    conversation_account_receiver:{}
}

const conversationReducer = (state = initState, action) =>{
    switch(action.type){
        case GET_CONVERSATION_LIST_SUCCESS:
            return {...state, conversation_list: action.payload.conversation_list, pagination_conversation_list: action.payload.pagination};
        case GET_CONVERSATION_LIST_ERROR:
            return {...state, error: action.payload};
        case GET_CONVERSATION_LIST_LOADING:
            return {...state};
        case CREATE_CONVERSATION_SUCCESS:
            return {...state, conversation_account_receiver: action.payload};
        case CREATE_CONVERSATION_ERROR:
            return {...state, error: action.payload};
        case CREATE_CONVERSATION_LOADING:
            return {...state};
        case GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_SUCCESS:
            return {...state, conversation_account_receiver: action.payload};
        case GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_ERROR:
            return {...state, error: action.payload, conversation_account_receiver:{}};
        case GET_CONVERSATION_BY_ACCOUNT_ID_RECEIVER_ID_LOADING:
            return {...state};
        default:
            return {...state};
    }
}

export default conversationReducer;