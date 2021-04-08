/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_MESSAGES, GET_MESSAGE } from "../actions/types";

const initialState = {};

// anonymous function
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        message: action.payload,
      };
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
