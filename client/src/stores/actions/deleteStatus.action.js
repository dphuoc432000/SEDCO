import React from "react";

import { API_URL } from "../../constants/api";
import {
  DELETE_STATUS__LOADING,
  DELETE_STATUS__SUCCESS,
  DELETE_STATUS__ERROR,
} from "../../constants/actions";

import axios from "axios";

const deleteStatus = async (status_id) => {
  const action = {
    type: DELETE_STATUS__LOADING,
    payload: {},
  };
  
  await axios
    .post(`${API_URL}/api/status/${status_id}/delete`)
    .then((data) => {
      action.type = DELETE_STATUS__SUCCESS;
      action.payload = data.data;
      
    })
    
    .catch((err) => {
      action.type = DELETE_STATUS__ERROR;
      action.payload = {
        description: "POST API ERROR",
        message: err.message,
        err : err ,
      };
    });
    console.log(action)
  return action;
  
};

export default deleteStatus;
