import React from "react";
import { API_URL } from "../../constants/api";
import {
  UPDATE_STATUS_RECEIVER_LOADING,
  UPDATE_STATUS_RECEIVER_SUCCESS,
  UPDATE_STATUS_RECEIVER_ERROR
} from "../../constants/actions";
import axios from "axios";

const updateReceiverStatus = async(receiver_status_id, receiver_status_data) =>{
  const action = {
    type: UPDATE_STATUS_RECEIVER_LOADING,
    payload: {}
  }
  const essentialsConvert = Object.keys(receiver_status_data.essentials).map(key => {
    return receiver_status_data.essentials[key]
    
  }) 
  const object = {
    note : receiver_status_data.note,
    number_per_of_family : parseInt(receiver_status_data.number_per_of_family),
    essentials : essentialsConvert,
  };

  await axios.post(`${API_URL}/api/receiver/${receiver_status_id}/update`, object)
    .then(res =>{
      action.type = UPDATE_STATUS_RECEIVER_SUCCESS;
      action.payload = res.data
    })
    .catch(err =>{
      console.log(err);
      action.type= UPDATE_STATUS_RECEIVER_ERROR
      action.payload = {
        description:'API loi',
        message: err.response.message,
        errdata: err
      }
    })
  return action;
}

export {updateReceiverStatus}