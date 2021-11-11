import React from "react";
import {
  UPDATE_STATUS_RECEIVER_SUCCESS,
  UPDATE_STATUS_RECEIVER_ERROR,
} from "../../constants/actions";

const initState = {}

const updateStatusReceiverReducer = (state = initState , action) => {
  // console.log(action)
  switch (action.type) {
    
    case UPDATE_STATUS_RECEIVER_SUCCESS:
      console.log("UPDATE RECEIVER SUCCESS", action);
      let receiverstatus = {};
      return { ...state, receiverstatus };
    case UPDATE_STATUS_RECEIVER_ERROR:
      console.log("UPDATE RECEIVER ERROR");
      return { ...state };
    default:
      return state;
  }
  
}

export default updateStatusReceiverReducer;
