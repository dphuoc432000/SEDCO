import React from "react";
import {
  UPDATE_STATUS_CARTRIP_SUCCESS,
  UPDATE_STATUS_CARTRIP_ERROR,
} from "../../constants/actions";

const initState = {}

const updateStatusCartripReducer = (state = initState , action) => {
  switch (action.type) {
    case UPDATE_STATUS_CARTRIP_SUCCESS:
      console.log("UPDATE CARTRIP SUCCESS", action);
      let CARTRIPstatus = {};
      return { ...state, CARTRIPstatus };
    case UPDATE_STATUS_CARTRIP_ERROR:
      console.log("UPDATE CARTRIP ERROR");
      return { ...state };
    default:
      return state;
  }
  
}

export default updateStatusCartripReducer;
