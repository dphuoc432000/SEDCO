import React from "react";
import {
    SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
} from '../../constants/actions';

const initState = {
    sender_status_car_regis_list: [],
    receiver_status_car_regis_list: []
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
        default :
            return {...state};
    }
}

export default carRegisStatusReducer;