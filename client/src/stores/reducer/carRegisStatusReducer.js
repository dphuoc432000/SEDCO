import React from "react";
import {
    SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
    REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_SENDER_LIST,
    REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_RECEIVER_LIST,
    CONFIRM_SENDER_STATUS_OF_CAR_SUCCESS,
    CONFIRM_SENDER_STATUS_OF_CAR_ERROR,
    CONFIRM_SENDER_STATUS_OF_CAR_LOADING,
    CONFIRM_RECEIVER_STATUS_OF_CAR_SUCCESS,
    CONFIRM_RECEIVER_STATUS_OF_CAR_ERROR,
    CONFIRM_RECEIVER_STATUS_OF_CAR_LOADING,
    CANCEL_REGISTER_SENDER_FOR_CAR_SUCCESS,
    CANCEL_REGISTER_SENDER_FOR_CAR_ERROR,
    CANCEL_REGISTER_SENDER_FOR_CAR_LOADING,
    CANCEL_REGISTER_RECEIVER_FOR_CAR_SUCCESS,
    CANCEL_REGISTER_RECEIVER_FOR_CAR_ERROR,
    CANCEL_REGISTER_RECEIVER_FOR_CAR_LOADING,
} from '../../constants/actions';

const initState = {
    sender_status_car_regis_list: [],
    receiver_status_car_regis_list: [],
    status_old_before_update: {}
}
const remove_status_after_corfirm_or_cancle_sender_list = (sender_status_car_regis_list,status_id) =>{
    return sender_status_car_regis_list.filter(status =>{
        return status._id !== status_id
    })
}
const remove_status_after_corfirm_or_cancle_receiver_list = (receiver_status_car_regis_list,status_id) =>{
    return receiver_status_car_regis_list.filter(status =>{
        return status._id !== status_id
    })
}
const carRegisStatusReducer = (state = initState, action)=>{
    switch(action.type){
        case SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS:
            return {...state, sender_status_car_regis_list: action.payload};
        case SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR:
            return {...state, err: action.payload};
        case SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING:
            return {...state, sender_status_car_regis_list: action.payload};
        case RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS:
            return {...state, receiver_status_car_regis_list: action.payload};
        case RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR:
            return {...state, err: action.payload};
        case RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING:
            return {...state, receiver_status_car_regis_list: action.payload};
        case CONFIRM_SENDER_STATUS_OF_CAR_SUCCESS:
            return {...state,status_old_before_update: action.payload};
        case CONFIRM_SENDER_STATUS_OF_CAR_ERROR:
            return {...state, err: action.payload};
        case CONFIRM_SENDER_STATUS_OF_CAR_LOADING:
            return {...state}
        case CONFIRM_RECEIVER_STATUS_OF_CAR_SUCCESS:
            return {...state, status_old_before_update: action.payload};
        case CONFIRM_RECEIVER_STATUS_OF_CAR_ERROR:
            return {...state,  err: action.payload};
        case CONFIRM_RECEIVER_STATUS_OF_CAR_LOADING:
            return {...state}
        case REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_SENDER_LIST:
            //action.payload -> status_id
            state.sender_status_car_regis_list = remove_status_after_corfirm_or_cancle_sender_list(state.sender_status_car_regis_list, action.payload);
            return{ ...state}
        case REMOVE_STATUS_AFTER_CONFIRM_OR_CANCLE_RECEIVER_LIST:
            //action.payload -> status_id
            state.receiver_status_car_regis_list = remove_status_after_corfirm_or_cancle_receiver_list(state.receiver_status_car_regis_list, action.payload);
            return{ ...state};
        case CANCEL_REGISTER_SENDER_FOR_CAR_SUCCESS:
            return {...state};
        case CANCEL_REGISTER_SENDER_FOR_CAR_ERROR:
            return {...state, err: action.payload};
        case CANCEL_REGISTER_SENDER_FOR_CAR_LOADING:
            return {...state};
        case CANCEL_REGISTER_RECEIVER_FOR_CAR_SUCCESS:
            return {...state};
        case CANCEL_REGISTER_RECEIVER_FOR_CAR_ERROR:
            return {...state, err: action.payload};
        case CANCEL_REGISTER_RECEIVER_FOR_CAR_LOADING:
            return {...state}
        default :
            return {...state};
    }
}

export default carRegisStatusReducer;