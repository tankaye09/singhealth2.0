import { getAllByPlaceholderText } from "@testing-library/dom";
import axios from "axios";
import { GET_ERRORS, GET_MESSAGE } from "./types";

export const submit = (data) => (dispatch) => {
  console.log("submit", data);
  axios
    .post("/api/audits/add", data)
    .then(() =>
      dispatch({
        type: GET_MESSAGE,
        payload: "Audit Created",
      })
    )
    .catch((error) => {
      console.log("in the error");
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const display = (onDataReceived) => (dispatch) => {
  axios
    .get("/api/audits")
    .then((response) => {
      const data = response.data;
      // console.log(data);
      // console.log(data.length);
      onDataReceived(data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const updateAudit = (data) => {
  console.log(data);
  axios.put("/api/audits/update", data).catch((error) => {
    console.log(error);
  });
};

export const updateAuditImage = (data) => {
  console.log(data);
  axios.put("/api/audits/updateImage", data).catch((error) => {
    console.log(error);
  });
};

export const deleteAudit = (data) => {
  console.log(data);
  axios.post("/api/audits", data).catch((error) => {
    console.log(error);
  });
};
