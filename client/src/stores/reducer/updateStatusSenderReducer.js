import React from "react";
import {
  UPDATE_STATUS_SENDER_SUCCESS,
  UPDATE_STATUS_SENDER_ERROR,
} from "../../constants/actions";

const initState = {}

const updateStatusSenderReducer = (state = initState , action) => {
  console.log(action)
  switch (action.type) {
    
    case UPDATE_STATUS_SENDER_SUCCESS:
      console.log("UPDATE SENDER SUCCESS", action);
      let senderstatus = {};
      return { ...state, senderstatus };
    case UPDATE_STATUS_SENDER_ERROR:
      console.log("UPDATE SENDER ERROR");
      return { ...state };
    default:
      return state;
  }
  
}

export default updateStatusSenderReducer;
