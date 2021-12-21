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
    GET_LIST_ROLE_IS_CARTRIP_ERROR,
    COMPLETE_CAR_STATUS_SUCCESS,
    COMPLETE_CAR_STATUS_ERROR,
    COMPLETE_CAR_STATUS_LOADING,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_SUCCESS,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_ERROR,
    GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_LOADING,
    GET_LIST_HISTORY_CARTRIP_LOADING,
    GET_LIST_HISTORY_CARTRIP_SUCCESS,
    GET_LIST_HISTORY_CARTRIP_ERROR
} from '../../constants/actions';
import axios from 'axios';
import { API_URL } from '../../constants/api';

const confirm_driver_censorship_action = async (car_status_id_pr) => {
    const action = {
        type: CONFIRM_DRIVER_CENSORSHIP_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/car_trip/${car_status_id_pr}/censorship`)
        .then(res => {
            action.type = CONFIRM_DRIVER_CENSORSHIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = CONFIRM_DRIVER_CENSORSHIP_ERROR;

            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    return action;
}

const cancle_driver_censorship_action = async (status_id) => {
    const action = {
        type: CANCLE_DRIVER_CENSORSHIP_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/status/${status_id}/delete`)
        .then(res => {
            action.type = CANCLE_DRIVER_CENSORSHIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = CANCLE_DRIVER_CENSORSHIP_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    return action;
}
const get_list_role_is_cartrip = async (limit, page) => {
    const action = {
        type: GET_LIST_ROLE_IS_CARTRIP_LOADING,
        payload: {},
    }

    await axios.get(`${API_URL}/api/status/CAR_TRIP/list`)
        .then(res => {
            action.type = GET_LIST_ROLE_IS_CARTRIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = GET_LIST_ROLE_IS_CARTRIP_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    console.log(action);
    return action;
}
const complete_car_status_action = async (car_status_id) => {
    const action = {
        type: COMPLETE_CAR_STATUS_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/complete`)
        .then(res => {
            action.type = COMPLETE_CAR_STATUS_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = COMPLETE_CAR_STATUS_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    return action;
    
}
const get_number_of_people_cartrip_registed = async (car_status_id) => {
    const action = {
        type: GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_LOADING,
        payload: {},
    }

    await axios.get(`${API_URL}/api/car_trip/${car_status_id}/count/status/regis`)
        .then(res => {
            action.type = GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = GET_NUMBER_OF_PEOPLE_CAR_TRIP_REGISTERD_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    console.log(action);
    return action;
}
const get_list_history_cartrip = async (car_status_id) => {
    const action = {
        type: GET_LIST_HISTORY_CARTRIP_LOADING,
        payload: {},
    }

    await axios.get(`${API_URL}/api/car_trip/${car_status_id}/transaction/history`)
        .then(res => {
            action.type = GET_LIST_HISTORY_CARTRIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = GET_LIST_HISTORY_CARTRIP_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    console.log(action);
    return action;
}
export { confirm_driver_censorship_action, cancle_driver_censorship_action, get_list_role_is_cartrip, complete_car_status_action, get_number_of_people_cartrip_registed, get_list_history_cartrip };
