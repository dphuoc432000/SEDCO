import React from 'react';
import {

    CONFIRM_DRIVER_CENSORSHIP_SUCCESS,
    CONFIRM_DRIVER_CENSORSHIP_ERROR,
    CONFIRM_DRIVER_CENSORSHIP_LOADING,
    CANCLE_DRIVER_CENSORSHIP_SUCCESS,
    CANCLE_DRIVER_CENSORSHIP_ERROR,
    CANCLE_DRIVER_CENSORSHIP_LOADING,
    GET_LIST_ROLE_IS_CARTRIP_LOADING,
    GET_LIST_ROLE_IS_CARTRIP_SUCCESS,
    GET_LIST_ROLE_IS_CARTRIP_ERROR ,
    COMPLETE_CAR_STATUS_SUCCESS,
    COMPLETE_CAR_STATUS_ERROR,
    COMPLETE_CAR_STATUS_LOADING,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_SUCCESS,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_ERROR,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_LOADING,
    GET_LIST_HISTORY_CARTRIP_LOADING,
    GET_LIST_HISTORY_CARTRIP_SUCCESS,
    GET_LIST_HISTORY_CARTRIP_ERROR, 
} from '../../constants/actions';

const initState = {
    list_info_role_is_cartrip : [],
    pagination_list_info_role_is_cartrip : {},
    list_people_cartrip_registed : {},
};

const carTripReducer = (state = initState, action) =>{

    switch(action.type){
        case CONFIRM_DRIVER_CENSORSHIP_SUCCESS:
            return {...state, ...action.payload};
        case CONFIRM_DRIVER_CENSORSHIP_ERROR:
            return {...state, err: action.payload};
        case CONFIRM_DRIVER_CENSORSHIP_LOADING:
            return {...state};
        case CANCLE_DRIVER_CENSORSHIP_SUCCESS:
            return {...state, ...action.payload};
        case CANCLE_DRIVER_CENSORSHIP_ERROR:
            return {...state, err: action.payload};
        case CANCLE_DRIVER_CENSORSHIP_LOADING:
            return {...state};

        // list role is CARTRIP
        case GET_LIST_ROLE_IS_CARTRIP_SUCCESS:
            state.list_info_role_is_cartrip = action.payload;
            // state.pagination_list_info_role_is_cartrip = action.payload;
            return {...state};
        case GET_LIST_ROLE_IS_CARTRIP_ERROR:
            return {...state , err: action.payload};
        case GET_LIST_ROLE_IS_CARTRIP_LOADING:
            return {...state};

        case COMPLETE_CAR_STATUS_SUCCESS:
            return {...state};
        case COMPLETE_CAR_STATUS_ERROR:
            return {...state , err: action.payload};
        case COMPLETE_CAR_STATUS_LOADING:
            return {...state};

        case GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_SUCCESS:
            state.list_people_cartrip_registed = action.payload;
            return {...state};
        case GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_ERROR:
            return{...state, err: action.payload};
        case GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_LOADING:
            return {...state};

        default: 
            return {...state}
    }
}

export default carTripReducer;