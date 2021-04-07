import axios from "axios";
import {
  GET_ERRORS,
  GET_MESSAGE,
  SET_CURRENT_USER,
  USER_LOADING,
} from "./types";

// Get Tenants
export const getTenants = (onDataReceived) => (dispatch) => {
  console.log("before axios");
  axios
    .get("/api/tenants")
    .then((response) => {
      // console.log("response is:", response.data);
      onDataReceived(response.data);
    })
    .catch(
      (err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      // console.log("err")
    );
};
