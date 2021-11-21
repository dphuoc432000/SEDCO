import React from "react";
import {
  STATUS_CURRENT_LOADING,
  STATUS_CURRENT_SUCCESS,
  STATUS_CURRENT_ERROR,
} from "../../constants/actions";
import { API_URL } from "../../constants/api";
import axios from "axios";

const get_status_current_action = async (account_id) => {
  const action = {
    type: STATUS_CURRENT_LOADING,
    payload: {},
  };
  await axios
    .get(`${API_URL}/api/status/account_id/${account_id}/detail`)
    .then((response) => {
      action.type = STATUS_CURRENT_SUCCESS;
      action.payload = response.data;
    })
    .catch((err) => {
      action.type = STATUS_CURRENT_ERROR;
      action.payload = {
        description: "GET API ERROR",
        message: err.message,
      };
    });
  return action;
};
export { get_status_current_action };
