import React from "react";
import {
  ESSENTIALS_LOADING,
  ESSENTIALS_SUCCESS,
  ESSENTIALS_ERROR,
} from "../../constants/actions";

const initialState = {
  essentials : []
};
const essentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ESSENTIALS_SUCCESS:
      return { ...state,essentials: [...action.payload] };
    case ESSENTIALS_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default essentialsReducer;
