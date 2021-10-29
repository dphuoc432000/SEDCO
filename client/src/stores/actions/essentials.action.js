import React from "react";

import { API_URL } from "../../constants/api";
import {
  ESSENTIALS_LOADING,
  ESSENTIALS_SUCCESS,
  ESSENTIALS_ERROR,
} from "../../constants/actions";
import axios from "axios";


const getEssentials = async () => {
  const action = {
    type: ESSENTIALS_LOADING,
    payload: {},
  };

  await axios
    .get(`${API_URL}/api/essential/list`)
    .then((data) => {
      action.type = ESSENTIALS_SUCCESS;
      action.payload = data.data;
    })
    .catch((err) => {
      action.type = ESSENTIALS_ERROR;
      action.payload = {
        description: "GET API ERROR",
        message: err.message,
      };
    });
  return action;
};

export default getEssentials;