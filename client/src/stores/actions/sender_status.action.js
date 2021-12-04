import React from "react";
import { API_URL } from "../../constants/api";
import {
    GET_NOTIFICATION_REGISTER_OF_SENDER_LOADING,
    GET_NOTIFICATION_REGISTER_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_REGISTER_OF_SENDER_ERROR,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_LOADING,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_ERROR,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_LOADING,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_SUCCESS,
    CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_ERROR,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_LOADING,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_SUCCESS,
    GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_ERROR,

} from "../../constants/actions";
import axios from "axios";

const get_notification_register_of_sender = async (sender_status_id) => {
  const action = {
    type: GET_NOTIFICATION_REGISTER_OF_SENDER_LOADING,
    payload: {},
  };
  
  await axios
    .get(`${API_URL}/api/sender/${sender_status_id}/history/no_confirm/list`)
    .then((data) => {
      action.type = GET_NOTIFICATION_REGISTER_OF_SENDER_SUCCESS;
      action.payload = data.data;
      console.log("check: ", action.payload);
    })
    .catch((err) => {
      action.type = GET_NOTIFICATION_REGISTER_OF_SENDER_ERROR;
      console.log("check: ", err.response.data);
    });

  return action;
};


const get_notification_not_confirm_of_sender = async ( sender_status_id) =>{
    const action = {
        type: GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_LOADING,
        payload: {},
      };
    await axios
    .get(`${API_URL}/api/sender/${sender_status_id}/history/no_confirm/car_confirm/list`)
    .then((data) => {
        action.type = GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_SUCCESS;
        action.payload = data.data;
        console.log("check: ", action.payload);
      })
      .catch((err) => {
        action.type = GET_NOTIFICATION_NOT_CONFIRM_OF_SENDER_ERROR;
        console.log("check: ", err.response.data);
      });
  
    return action;
}


const confirm_notification_send_to_cartrip_of_sender = async(car_status_id , sender_status_id) => {
    const action = {
        type : CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_LOADING ,
        payload : {}
    }
    await axios
    .post(`${API_URL}/api/sender/${car_status_id}/${sender_status_id}/confirm/sender/sender`)
    .then((data) => {
        action.type = CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_SUCCESS;
        action.payload = data.data;
        console.log("check: ", action.payload);
      })
      .catch((err) => {
        action.type = CONFIRM_NOTIFICATION_CARTRIP_OF_SENDER_ERROR;
        console.log("check: ", err.response.data);
      });
    return action;
}

const get_notications_both_confirm_transaction_of_sender = async (sender_status_id) =>{
    const action = {
        type : GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_LOADING ,
        payload : {}
    }
    await axios
    .get(`${API_URL}/api/sender/${sender_status_id}/history/confirm/list`)
    .then((data) => {
        action.type = GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_SUCCESS;
        action.payload = data.data;
        console.log("check: ", action.payload);
      })
    .catch((err) => {
        action.type = GET_NOTIFICATION_BOTH_CONFIRM_TRANSACTION_OF_SENDER_ERROR;
        console.log("check: ", err.response.data);
        });
    console.log(action);
    return action;
} 

export  {get_notification_register_of_sender , get_notification_not_confirm_of_sender , confirm_notification_send_to_cartrip_of_sender ,get_notications_both_confirm_transaction_of_sender};