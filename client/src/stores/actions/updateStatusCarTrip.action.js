import React from "react";
import { API_URL } from "../../constants/api";
import {
  UPDATE_STATUS_CARTRIP_LOADING,
  UPDATE_STATUS_CARTRIP_SUCCESS,
  UPDATE_STATUS_CARTRIP_ERROR
} from "../../constants/actions";
import axios from "axios";

const updateCartripStatus = async(cartrip_status_id, cartrip_status_data) =>{
  const action = {
    type: UPDATE_STATUS_CARTRIP_LOADING,
    payload: {}
  }
  
 

  await axios.post(`${API_URL}/api/car_trip/${cartrip_status_id}/update`, cartrip_status_data,{
    headers : {
        'Content-Type': 'multipart/form-data'
    }
  })
    .then(res =>{
      action.type = UPDATE_STATUS_CARTRIP_SUCCESS;
      action.payload = res.data
    })
    .catch(err =>{
      console.log(err);
      action.type= UPDATE_STATUS_CARTRIP_ERROR
      action.payload = {
        description:'API loi',
        message: err.response.message,
        errdata: err
      }
    })
    console.log(action)
  return action;
}

export {updateCartripStatus}