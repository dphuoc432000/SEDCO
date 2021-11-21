import React from "react";

import { API_URL } from "../../constants/api";
import {
  SENDER_FORM_CREATE_SUCCESS,
  SENDER_FORM_CREATE_ERROR,
  SENDER_FORM_CREATE_LOADING,
} from "../../constants/actions";

import axios from "axios";

const senderFormCreate = async (account_id, sender_status_data) => {
  const action = {
    type: SENDER_FORM_CREATE_LOADING,
    payload: {},
  };
  
  await axios
    .post(`${API_URL}/api/sender/${account_id}/create`, sender_status_data ,{
        headers : {
          'Content-Type': 'multipart/form-data',
        }
    })
    .then((data) => {
      action.type = SENDER_FORM_CREATE_SUCCESS;
      action.payload = data.data;
      console.log("check: ", action.payload);
    })
    .catch((err) => {
      action.type = SENDER_FORM_CREATE_ERROR;
      console.log("check: ", err.response.data);
    });

  return action;
};
export default senderFormCreate;
