import React from "react";

import { API_URL } from "../../constants/api";
import {
  ESSENTIALS_DETAIL_LOADING,
  ESSENTIALS_DETAIL_SUCCESS,
  ESSENTIALS_DETAIL_ERROR,
} from "../../constants/actions";
import axios from "axios";


const getEssentialsDetail = async (essential_id) => {
  const action = {
    type: ESSENTIALS_DETAIL_LOADING,
    payload: {},
  };

  await axios
    .get(`${API_URL}/api/essential/${essential_id}/detail`)
    .then((data) => {
      action.type = ESSENTIALS_DETAIL_SUCCESS;
      action.payload = data.data;
    })
    .catch((err) => {
      action.type = ESSENTIALS_DETAIL_ERROR;
      action.payload = {
        description: "GET API ERROR",
        message: err.message,
      };
    });
  return action;
};

export default getEssentialsDetail;