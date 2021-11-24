import React from "react";
import {
    SENDER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    SENDER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_LOADING,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_SUCCESS,
    RECEIVER_STATUS_LIST_CAR_REGIS_0_2_ERROR,
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
    REGISTER_SENDER_STATUS_OF_CAR_LOADING,
    REGISTER_SENDER_STATUS_OF_CAR_SUCCESS,
    REGISTER_SENDER_STATUS_OF_CAR_ERROR,
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
    return action;
}
const confirm_sender_status_of_car_action = async(car_status_id, sender_status_id, object) =>{
    const action = {
        type: CONFIRM_SENDER_STATUS_OF_CAR_LOADING,
        payload: {}
    };
    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/${sender_status_id}/confirm/sender/car`, object)
        .then(res =>{
            action.type = CONFIRM_SENDER_STATUS_OF_CAR_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = CONFIRM_SENDER_STATUS_OF_CAR_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response.data.errors.description,
                errdata: err
            }
        })
    return action
}

const confirm_receiver_status_of_car_action = async(car_status_id, receiver_status_id, object) =>{
    const action = {
        type: CONFIRM_RECEIVER_STATUS_OF_CAR_LOADING,
        payload: {}
    };
    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/${receiver_status_id}/confirm/receiver/car`, object)
        .then(res =>{
            action.type = CONFIRM_RECEIVER_STATUS_OF_CAR_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = CONFIRM_RECEIVER_STATUS_OF_CAR_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response.data.errors.description,
                errdata: err
            }
        })
    return action
}
const cancle_register_sender_action = async(car_status_id, sender_status_id) =>{
    const action = {
        type: CANCEL_REGISTER_SENDER_FOR_CAR_LOADING,
        payload: {}
    };
    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/${sender_status_id}/register/sender/cancle`)
        .then(res =>{
            action.type = CANCEL_REGISTER_SENDER_FOR_CAR_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = CANCEL_REGISTER_SENDER_FOR_CAR_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response,
                errdata: err
            }
        })
    return action
}

const cancle_register_receiver_action = async(car_status_id, receiver_status_id) =>{
    const action = {
        type: CANCEL_REGISTER_RECEIVER_FOR_CAR_LOADING,
        payload: {}
    };
    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/${receiver_status_id}/register/receiver/cancle`)
        .then(res =>{
            action.type = CANCEL_REGISTER_RECEIVER_FOR_CAR_SUCCESS;
            action.payload = res.data;
        })
        .catch(err =>{
            action.type = CANCEL_REGISTER_RECEIVER_FOR_CAR_ERROR;
            action.payload = {
                description: 'API loi',
                message: err.response,
                errdata: err
            }
        })
    return action;
}
const register_sender_status_of_car = async(car_status_id , sender_status_id) => {
    const action = {
        type: REGISTER_SENDER_STATUS_OF_CAR_LOADING,
        payload: {}
    };
    await axios.post(`${API_URL}/api/car_trip/${car_status_id}/${sender_status_id}/register/sender`)
    .then(res => {
        action.type = REGISTER_SENDER_STATUS_OF_CAR_SUCCESS ;
        action.payload = res.data;
    })
    .catch(err => {
        action.type = REGISTER_SENDER_STATUS_OF_CAR_ERROR ;
        action.payload = {
            description: 'API loi',
            message : err.response,
            errdata : err
        }

    })
    return action;
}
export {
    get_sender_status_list_no_complete,
    get_receiver_status_list_no_complete, 
    confirm_sender_status_of_car_action, 
    confirm_receiver_status_of_car_action,
    cancle_register_sender_action,
    cancle_register_receiver_action,
    register_sender_status_of_car,
}