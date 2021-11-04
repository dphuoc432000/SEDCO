import React from "react";
import { API_URL } from "../../constants/api";
import {
  UPDATE_STATUS_SENDER_LOADING,
  UPDATE_STATUS_SENDER_SUCCESS,
  UPDATE_STATUS_SENDER_ERROR
} from "../../constants/actions";
import axios from "axios";

const updateSenderStatus = async(sender_status_id, sender_status_data) =>{
  const action = {
    type: UPDATE_STATUS_SENDER_LOADING,
    payload: {}
  }
  const essentialsConvert = Object.keys(sender_status_data.essentials).map(key => {
    return sender_status_data.essentials[key]
    
  }) 
  const object = {
    note : sender_status_data.note,
    weight_essential : parseInt(sender_status_data.weight_essential),
    essentials : essentialsConvert,
  };

  await axios.post(`${API_URL}/api/sender/${sender_status_id}/update`, object)
    .then(res =>{
      action.type = UPDATE_STATUS_SENDER_SUCCESS;
      action.payload = res.data
    })
    .catch(err =>{
      console.log(err);
      action.type= UPDATE_STATUS_SENDER_ERROR
      action.payload = {
        description:'API loi',
        message: err.response.message,
        errdata: err
      }
    })
  return action;
}

export {updateSenderStatus}