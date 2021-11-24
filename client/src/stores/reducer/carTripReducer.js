import React from 'react';
import {
    CONFIRM_DRIVER_CENSORSHIP_SUCCESS,
    CONFIRM_DRIVER_CENSORSHIP_ERROR,
    CONFIRM_DRIVER_CENSORSHIP_LOADING,
    CANCLE_DRIVER_CENSORSHIP_SUCCESS,
    CANCLE_DRIVER_CENSORSHIP_ERROR,
    CANCLE_DRIVER_CENSORSHIP_LOADING
} from '../../constants/actions';

const initState = {};

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
        default: 
            return {...state}
    }
}

export default carTripReducer;