import React from "react";
import axios from "axios";
import {
  
  SENDER_FORM_CREATE_SUCCESS,
  SENDER_FORM_CREATE_ERROR,
  
} from "../../constants/actions";

const initState = {}

const senderFormReducer = (state = initState , action) => {
  
  switch (action.type) {
    
    case SENDER_FORM_CREATE_SUCCESS:
      console.log("create form receiver success", action);
      let sendertatus = {};
      return { ...state, sendertatus };
    case SENDER_FORM_CREATE_ERROR:
      console.log("create form receiver error");
      return { ...state };
    default:
      return state;
  }
  
}

export default senderFormReducer;
