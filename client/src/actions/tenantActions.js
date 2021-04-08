import axios from "axios";
import { GET_ERRORS, SET_SELECTED_TENANT } from "./types";

// Get Tenants
export const getTenants = (onDataReceived) => (dispatch) => {
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

// Update tenantInfo in store with the row selected tenantInfo
export const setSelectedTenant = (data) => {
  return {
    type: SET_SELECTED_TENANT,
    payload: data,
  };
};

export const auditInfo = (data) => {
  return {
    type: SET_SELECTED_TENANT,
    payload: data,
  };
};
