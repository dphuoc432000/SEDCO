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

} from '../../constants/actions';
import axios from 'axios';
import {API_URL} from '../../constants/api';

const confirm_driver_censorship_action = async (car_status_id_pr) =>{
    const action = {
        type: CONFIRM_DRIVER_CENSORSHIP_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/car_trip/${car_status_id_pr}/censorship`)
        .then(res =>{
            action.type = CONFIRM_DRIVER_CENSORSHIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = CONFIRM_DRIVER_CENSORSHIP_ERROR;

            action.payload = {
                description: "API Loi!",
                message:err.message,
                errdata: err.response.data
            };
        });
    return action;
}

const cancle_driver_censorship_action = async (status_id) =>{
    const action = {
        type: CANCLE_DRIVER_CENSORSHIP_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/status/${status_id}/delete`)
        .then(res =>{
            action.type = CANCLE_DRIVER_CENSORSHIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = CANCLE_DRIVER_CENSORSHIP_ERROR;
            action.payload = {
                description: "API Loi!",
                message:err.message,
                errdata: err.response.data
            };
        });
    return action;
}
const get_list_role_is_cartrip = async( limit , page) => {
    const action = {
        type: GET_LIST_ROLE_IS_CARTRIP_LOADING,
        payload: {},
    }

    await axios.get(`${API_URL}/api/status/CAR_TRIP/list`)
        .then(res =>{
            action.type = GET_LIST_ROLE_IS_CARTRIP_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = GET_LIST_ROLE_IS_CARTRIP_ERROR;
            action.payload = {
                description: "API Loi!",
                message:err.message,
                errdata: err.response.data
            };
        });
    console.log(action);
    return action;
}
export {confirm_driver_censorship_action , cancle_driver_censorship_action, get_list_role_is_cartrip};
