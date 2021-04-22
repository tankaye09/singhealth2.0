/* eslint-disable import/no-anonymous-default-export */
import { SET_SELECTED_TENANT } from "../actions/types";

const initialState = {};

// anonymous function
export default function (state = initialState, action) {
  console.log("in reducer");
  switch (action.type) {
    case SET_SELECTED_TENANT:
      return { ...state }, action.payload;
    default:
      return state;
  }
}
