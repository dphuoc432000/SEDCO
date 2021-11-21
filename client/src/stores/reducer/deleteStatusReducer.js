import React from "react";
import {
  DELETE_STATUS__SUCCESS,
  DELETE_STATUS__ERROR,
} from "../../constants/actions";

const initialState = {};
const essentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_STATUS__SUCCESS:
      console.log("DELETE STATUS SUCCESS", action);
      let deleteStatus = {};
      return { ...state, deleteStatus };
    case DELETE_STATUS__ERROR:
      console.log("DELETE STATUS SUCCESS");
      return { ...state };
    default:
      return state;
  }
};

export default essentialsReducer;
