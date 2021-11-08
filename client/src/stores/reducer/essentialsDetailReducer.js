import React from "react";
import {
  ESSENTIALS_DETAIL_SUCCESS,
  ESSENTIALS_DETAIL_ERROR,
} from "../../constants/actions";

const initialState = {
};
const essentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ESSENTIALS_DETAIL_SUCCESS:
      // console.log(action.payload)
      return { ...state,...action.payload };
    case ESSENTIALS_DETAIL_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default essentialsReducer;
