import React from "react";
import { API_URL } from "../../constants/api";
import {

    GET_NOTIFICATION_REGISTER_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_REGISTER_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_REGISTER_OF_RECEIVER_ERROR,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_ERROR,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_LOADING,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS,
    CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_ERROR,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_LOADING,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_SUCCESS,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_ERROR,
    COMPLETE_RECEIVER_STATUS_SUCCESS,
    COMPLETE_RECEIVER_STATUS_ERROR,
    COMPLETE_RECEIVER_STATUS_LOADING,
} from "../../constants/actions";
import axios from "axios";


const get_notification_register_of_receiver = async (receiver_status_id) => {
    const action = {
        type: GET_NOTIFICATION_REGISTER_OF_RECEIVER_LOADING,
        payload: {},
    };

    await axios
        .get(`${API_URL}/api/receiver/${receiver_status_id}/history/no_confirm/list`)
        .then((data) => {
            action.type = GET_NOTIFICATION_REGISTER_OF_RECEIVER_SUCCESS;
            action.payload = data.data;
            console.log("check: ", action.payload);
        })
        .catch((err) => {
            action.type = GET_NOTIFICATION_REGISTER_OF_RECEIVER_ERROR;
            console.log("check: ", err.response.data);
        });

    return action;
};


const get_notification_not_confirm_of_receiver = async (receiver_status_id) => {
    const action = {
        type: GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_LOADING,
        payload: {},
    };
    await axios
        .get(`${API_URL}/api/receiver/${receiver_status_id}/history/no_confirm/car_confirm/list`)
        .then((data) => {
            action.type = GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_SUCCESS;
            action.payload = data.data;
            console.log("check: ", action.payload);
        })
        .catch((err) => {
            action.type = GET_NOTIFICATION_NOT_CONFIRM_OF_RECEIVER_ERROR;
            console.log("check: ", err.response.data);
        });

    return action;
}



const confirm_notification_send_to_cartrip_of_receiver = async (car_status_id, receiver_status_id) => {
    const action = {
        type: CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_LOADING,
        payload: {}
    }
    await axios
        .post(`${API_URL}/api/receiver/${car_status_id}/${receiver_status_id}/confirm/receiver/receiver`)
        .then((data) => {
            action.type = CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_SUCCESS;
            action.payload = data.data;
            console.log("check: ", action.payload);
        })
        .catch((err) => {
            action.type = CONFIRM_NOTIFICATION_CARTRIP_OF_RECEIVER_ERROR;
            console.log("check: ", err.response.data);
        });
    return action;
}
const get_notications_both_confirm_transaction_of_receiver = async (receiver_status_id) => {
    const action = {
        type: GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_LOADING,
        payload: {}
    }
    await axios
        .get(`${API_URL}/api/receiver/${receiver_status_id}/history/confirm/list`)
        .then((data) => {
            action.type = GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_SUCCESS;
            action.payload = data.data;
            console.log("check: ", action.payload);
        })
        .catch((err) => {
            action.type = GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_RECEIVER_ERROR;
            console.log("check: ", err.response.data);
        });
    console.log(action);
    return action;
}
const complete_receiver_action = async (receiver_status_id) => {
    const action = {
        type: COMPLETE_RECEIVER_STATUS_LOADING,
        payload: {},
    }

    await axios.post(`${API_URL}/api/receiver/${receiver_status_id}/complete`)
        .then(res => {
            action.type = COMPLETE_RECEIVER_STATUS_SUCCESS;
            action.payload = res.data;
        })
        .catch(err => {
            action.type = COMPLETE_RECEIVER_STATUS_ERROR;
            action.payload = {
                description: "API Loi!",
                message: err.message,
                errdata: err.response.data
            };
        });
    return action;
}
export {
    get_notification_register_of_receiver,
    get_notification_not_confirm_of_receiver,
    confirm_notification_send_to_cartrip_of_receiver,
    get_notications_both_confirm_transaction_of_receiver,
    complete_receiver_action
};