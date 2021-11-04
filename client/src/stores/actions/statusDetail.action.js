import React from "react";

import { API_URL } from "../../constants/api";
import {
  STATUS_DETAIL_LOADING,
  STATUS_DETAIL_SUCCESS,
  STATUS_DETAIL_ERROR,
} from "../../constants/actions";
import axios from "axios";

const getStatusDetail = async (status_id) => {
  const action = {
    type: STATUS_DETAIL_LOADING,
    payload: {},
  };

  await axios
    .get(`${API_URL}/api/status/${status_id}/detail`)
    .then((data) => {
      action.type = STATUS_DETAIL_SUCCESS;
      action.payload = data.data;
    })
    .catch((err) => {
      action.type = STATUS_DETAIL_ERROR;
      action.payload = {
        description: "GET API ERROR",
        message: err.message,
      };
    });
  return action;
};

export default getStatusDetail;
