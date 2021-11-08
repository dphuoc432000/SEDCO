import React from "react";
import axios from "axios";
import {
  RECEIVER_FORM_CREATE_SUCCESS,
  RECEIVER_FORM_CREATE_ERROR,
  
} from "../../constants/actions";

const initState = {}

const receiverFormReducer = (state = initState , action) => {
  
  switch (action.type) {
    
    case RECEIVER_FORM_CREATE_SUCCESS:
      console.log("create form receiver success", action);
      let receiverstatus = {};
      return { ...state, receiverstatus };
    case RECEIVER_FORM_CREATE_ERROR:
      console.log("create form receiver error");
      return { ...state };
    default:
      return state;
  }
  
}

export default receiverFormReducer;
