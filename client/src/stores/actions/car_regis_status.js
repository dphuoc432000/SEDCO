import React from "react";
import {
    SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
} from '../../constants/actions';
import axios from 'axios';
import {API_URL} from '../../constants/api';

const get_sender_status_list_no_complete = async(car_status_id) =>{
    const action = {
        type: SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
        payload: {},
    }

    await axios.get(`${API_URL}/api/car_trip/${car_status_id}/register/sender/02/list`)
        .then(res =>{
            action.type = SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS;
            // console.log(res.data)
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response.message,
                errdata: err
            }
        })
    return action
}

const get_receiver_status_list_no_complete = async(car_status_id) =>{
    const action = {
        type: RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
        payload: {},
    }
    await axios.get(`${API_URL}/api/car_trip/${car_status_id}/register/receiver/02/list`)
        .then(res =>{
            action.type = RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response.message,
                errdata: err
            }
        })
    return action
}

export {get_sender_status_list_no_complete, get_receiver_status_list_no_complete}