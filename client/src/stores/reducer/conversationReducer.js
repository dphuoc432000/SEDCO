import React from "react";
import {
    GET_CONVERSATION_LIST_ERROR,
    GET_CONVERSATION_LIST_LOADING,
    GET_CONVERSATION_LIST_SUCCESS
} from '../../constants/actions';

const initState = {
    conversation_list: [],
    pagination_conversation_list: {}
}

const conversationReducer = (state = initState, action) =>{
    switch(action.type){
        case GET_CONVERSATION_LIST_SUCCESS:
            return {...state, conversation_list: action.payload.conversation_list, pagination_conversation_list: action.payload.pagination};
        case GET_CONVERSATION_LIST_ERROR:
            return {...state, error: action.payload};
        case GET_CONVERSATION_LIST_LOADING:
            return {...state};
        default:
            return {...state};
    }
}

export default conversationReducer;