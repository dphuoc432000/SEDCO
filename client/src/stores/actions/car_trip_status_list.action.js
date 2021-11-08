import React from 'react';
import axios from 'axios';
import {
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_SUCCESS,
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_LOADING,
    CAR_TRIP_STATUS_LIST_NO_COMPLETE_ERROR
} from '../../constants/actions';
import {API_URL} from '../../constants/api';

const get_car_trip_status_list_no_complete = async () =>{
    const action = {
        type:  CAR_TRIP_STATUS_LIST_NO_COMPLETE_LOADING,
        payload: {}
    }

    await axios.get(`${API_URL}/api/status/CAR_TRIP/no_completed/list`)
        .then(response =>{
            action.type =  CAR_TRIP_STATUS_LIST_NO_COMPLETE_SUCCESS;
            action.payload.car_trip_status_list = response.data;
        })
        .catch(err =>{
            action.type =  CAR_TRIP_STATUS_LIST_NO_COMPLETE_ERROR;
            action.payload = {
                description: "Lỗi API",
                message: err.message,
                errdata: err.response.data
            };
        })

    return action
}



export {get_car_trip_status_list_no_complete};
