import React from "react";
import axios from "axios";
import {
 
  CARTRIP_FORM_CREATE_SUCCESS,
  CARTRIP_FORM_CREATE_ERROR,
  
} from "../../constants/actions";

const initState = {}

const cartripFormReducer = (state = initState , action) => {
  
  switch (action.type) {
    
    case CARTRIP_FORM_CREATE_SUCCESS:
      console.log("CARTRIP FORM CREATE SUCCESS", action);
      let cartripstatus = {};
      return { ...state, cartripstatus };
    case CARTRIP_FORM_CREATE_ERROR:
      console.log(" CARTRIP FORM CREATE ERROR");
      return { ...state };
    default:
      return state;
  }
  
}

export default cartripFormReducer;
