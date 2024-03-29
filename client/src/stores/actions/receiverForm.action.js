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
  await axios
    .post(`${API_URL}/api/receiver/${account_id}/create`, receiver_status_data,{
        headers : {
          'Content-Type': 'multipart/form-data',
        }
    })
    .then((data) => {
      action.type = RECEIVER_FORM_CREATE_SUCCESS;
      action.payload = data.data;
      console.log("check: ", action.payload);
    })
    .catch(err => {
      action.type = RECEIVER_FORM_CREATE_ERROR;
      console.log("check: ", err.response.data)
    });

  return action;
};
export default receiverFormCreate;
