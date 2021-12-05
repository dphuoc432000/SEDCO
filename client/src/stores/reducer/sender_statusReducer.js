import React from "react";
import axios from "axios";
import {
  
    GET_NOTIFICATION_REGISTER_OF_SENDER_LOADING,
    GET_NOTIFICATION_REGISTER_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_REGISTER_OF_SENDER_ERROR,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_LOADING,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_ERROR,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_LOADING,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_SUCCESS,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_ERROR,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_LOADING,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_ERROR,
    COMPLETE_SENDER_STATUS_SUCCESS,
    COMPLETE_SENDER_STATUS_ERROR,
    COMPLETE_SENDER_STATUS_LOADING,
} from "../../constants/actions";

const initState = {
    //SENDER
    notification_cartrip_regis_list: [],
    pagination_notification_cartrip_regis_list : {},
    
    notification_cartrip_not_confirm_list: [],
    pagination_notification_cartrip_not_confirm : {},

    notification_both_confirm_of_sender : [],
    pagination_notification_both_confirm_of_sender : {},

}

const sender_statusReducer = (state = initState , action) => {
  
  switch (action.type) {
    // SENDER
    case GET_NOTIFICATION_REGISTER_OF_SENDER_SUCCESS:
      state.notification_cartrip_regis_list = action.payload.history_sender_list;
      state.pagination_notification_cartrip_regis_list = action.payload.pagination;
      return { ...state};
    case GET_NOTIFICATION_REGISTER_OF_SENDER_ERROR:
      return { ...state , err: action.payload};
    case GET_NOTIFICATION_REGISTER_OF_SENDER_LOADING:
      return { ...state };

    case GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_SUCCESS:
        state.notification_cartrip_not_confirm_list = action.payload.history_sender_list;
        state.pagination_notification_cartrip_not_confirm = action.payload.pagination;
        return { ...state};
    case GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_ERROR:
        return { ...state , err: action.payload};
    case GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_LOADING:
        return {...state};
    
    case CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_SUCCESS:
        return {...state};
    case CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_ERROR:
        return { ...state , err: action.payload};
    case CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_LOADING:
        return {...state};

    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_SUCCESS:
        state.notification_both_confirm_of_sender = action.payload.history_sender_list;
        state.pagination_notification_both_confirm_of_sender = action.payload.pagination;
        return {...state};
    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_ERROR:
        return {...state, err: action.payload};
    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_LOADING:
        return {...state};

    case COMPLETE_SENDER_STATUS_SUCCESS:
        return {...state};
    case COMPLETE_SENDER_STATUS_ERROR:
        return {...state , err: action.payload};
    case COMPLETE_SENDER_STATUS_LOADING:
        return {...state};
    default:
      return state;
  }
  
}

export default sender_statusReducer;