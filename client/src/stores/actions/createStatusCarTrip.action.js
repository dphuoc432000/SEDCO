import React from "react";

import { API_URL } from "../../constants/api";
import {
  CARTRIP_FORM_CREATE_LOADING,
  CARTRIP_FORM_CREATE_SUCCESS,
  CARTRIP_FORM_CREATE_ERROR,
} from "../../constants/actions";
import axios from "axios";

const cartripFormCreate = async (account_id, cartrip_status_data) => {
  const action = {
    type: CARTRIP_FORM_CREATE_LOADING,
    payload: {}, 
  };
 
//   console.log(account_id, cartrip_status_data)
  await axios
    .post(`${API_URL}/api/car_trip/${account_id}/create`, cartrip_status_data,{
        headers : {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((data) => {
      action.type = CARTRIP_FORM_CREATE_SUCCESS;
      action.payload = data.data;
      console.log("check: ", action.payload);
    })
    .catch((err) => {
      action.type = CARTRIP_FORM_CREATE_ERROR;
      console.log("check: ", err.response.data);
    });

  return action;
};
export default cartripFormCreate;
