import React from "react";

import { API_URL } from "../../constants/api";
import {
  RECEIVER_FORM_CREATE_SUCCESS,
  RECEIVER_FORM_CREATE_ERROR,
  
} from "../../constants/actions";
import axios from "axios";


const receiverFormCreate = async (account_id , receiver_status_data) => {
  const action = {
    type: "RECEIVER_FORM_CREATE_LOADING",
    payload: {},
  };
  console.log(receiver_status_data)
  const essentialsConvert = Object.keys(receiver_status_data.essentials).map(key => {
    return receiver_status_data.essentials[key]
    
  }) 
  const object = {
    note : receiver_status_data.note,
    number_per_of_family : receiver_status_data.number_per_family,
    essentials : essentialsConvert,
  };
  await axios
    .post(`${API_URL}/api/receiver/${account_id}/create`, object)
    .then((data) => {
      action.type = RECEIVER_FORM_CREATE_SUCCESS;
      action.payload = data.data;
      console.log("check: ", action.payload);
    });

  return action;
};
export default receiverFormCreate;
