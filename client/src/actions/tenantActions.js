import axios from "axios";
import { GET_ERRORS, SET_SELECTED_TENANT, GET_MESSAGE } from "./types";

// Get Tenants
export const getTenants = (onDataReceived) => (dispatch) => {
  console.log("arrived");
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

export const getTenant = (onDataReceived) => {
  axios
    .get("/api/tenants")
    .then((response) => {
      // console.log("response is:", response.data);
      onDataReceived(response.data);
    })
    .catch(() => {
      alert("Error");
    });
};

export const delTenant = (data) => (dispatch) => {
  axios
    .delete("/api/tenants/delete", data)
    .then(() =>
      dispatch({
        type: GET_MESSAGE,
        payload: "Tenant Deleted",
      })
    )
    .catch((error) => {
      console.log("in the error");
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
}

// Update tenantInfo in store with the row selected tenantInfo
export const setSelectedTenant = (data) => {
  return {
    type: SET_SELECTED_TENANT,
    payload: data,
  };
};
