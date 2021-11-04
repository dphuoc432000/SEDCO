import React from 'react';
import axios from 'axios';
import {
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_SUCCESS,
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_LOADING,
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';

const initState ={
    status_list: []
}

const car_tripStatusListReducer = (state = initState, action) =>{
    switch(action.type){
        case CAR_TRIP_STATUS_LIST_NO_COMPLETE_SUCCESS:
            return {...state,car_trip_status_list: action.payload.car_trip_status_list};
        case CAR_TRIP_STATUS_LIST_NO_COMPLETE_ERROR:
            return {...state,error: action.payload};
        case CAR_TRIP_STATUS_LIST_NO_COMPLETE_LOADING:
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default car_tripStatusListReducer;