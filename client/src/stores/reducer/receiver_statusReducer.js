import React from "react";
import axios from "axios";
import {
  
   
    GET_NOTIFICATION_REGISTER_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_REGISTER_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_REGISTER_OF_RECEIVER_ERROR,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_ERROR,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_LOADING,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_ERROR,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_ERROR,
} from "../../constants/actions";

const initState = {
    
    //RECEIVER
    notification_cartrip_regis_list_receiver : [],
    pagination_notification_cartrip_regis_list_receiver : {},
    
    notification_cartrip_not_confirm_list_receiver : [],
    pagination_notification_cartrip_not_confirm_receiver : {},

    notification_both_confirm_of_receiver : [],
    pagination_notification_both_confirm_of_receiver : {},
}

const receiver_statusReducer = (state = initState , action) => {
  
  switch (action.type) {
   
    //RECEIVER
    case GET_NOTIFICATION_REGISTER_OF_RECEIVER_SUCCESS:
      state.notification_cartrip_regis_list_receiver = action.payload.history_receiver_list;
      state.pagination_notification_cartrip_regis_list_receiver = action.payload.pagination;
      return { ...state};
    case GET_NOTIFICATION_REGISTER_OF_RECEIVER_ERROR:
      return { ...state , err: action.payload};
    case GET_NOTIFICATION_REGISTER_OF_RECEIVER_LOADING:
      return { ...state };

    case GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_SUCCESS:
        state.notification_cartrip_not_confirm_list_receiver = action.payload.history_receiver_list;
        state.pagination_notification_cartrip_not_confirm_receiver = action.payload.pagination;
        return { ...state};
    case GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_ERROR:
        return { ...state , err: action.payload};
    case GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_LOADING:
        return {...state};
    
    case CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS:
        return {...state};
    case CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_ERROR:
        return { ...state , err: action.payload};
    case CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_LOADING:
        return {...state};

    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_SUCCESS:
        state.notification_both_confirm_of_receiver = action.payload.history_receiver_list;
        state.pagination_notification_both_confirm_of_receiver = action.payload.pagination;
        return {...state};
    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_ERROR:
        return {...state, err: action.payload};
    case GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_LOADING:
        return {...state};
    default:
      return state;
  }
  
}

export default receiver_statusReducer;