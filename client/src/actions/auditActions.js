import { getAllByPlaceholderText } from "@testing-library/dom";
import axios from "axios";
import { GET_ERRORS, GET_MESSAGE } from "./types";

export const submit = (data) => (dispatch) => {
  console.log("submit", data);
  let promise = new Promise((resolve, reject) => {
    axios
      .post("/api/audits/add", data)
      .then(() => {
        dispatch({
          type: GET_MESSAGE,
          payload: "Audit Created",
        });
        resolve(data);
      })
      .catch((error) => {
        console.log("in the error");
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        reject("Audit Submission Failed");
      });
  });

  promise
    .then((message) => {
      sendEmail(message);
    })
    .catch((message) => {
      console.log(message);
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
  console.log("Update audit: ", data);
  let promise = new Promise((resolve, reject) => {
    axios
      .put("/api/audits/update", data)
      .then(() => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject("Update Audit failed");
      });
  });

  // send email notification
  promise
    .then((message) => {
      sendEmailAuditUpdate(message);
    })
    .catch((message) => {
      console.log(message);
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
  return axios.post("/api/audits", data).catch((error) => {
    console.log(error);
  });
};

export const sendEmail = (data) => {
  console.log("In send email");
  axios
    .post("/api/sendemail/audit", data)
    .then((res) => {
      console.log("email sent success");
      // dispatch({
      //   type: GET_MESSAGE,
      //   payload: "Email Sent to Tenant",
      // });
    })
    .catch((err) => {
      console.log("email sent failed, err: ", err);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Email Sent Failed",
      // });
    });
};

export const sendEmailAuditUpdate = (data) => {
  console.log("In send email");
  axios
    .post("/api/sendemail/auditupdate", data)
    .then((res) => {
      console.log("email sent success");
      // dispatch({
      //   type: GET_MESSAGE,
      //   payload: "Email Sent to Tenant",
      // });
    })
    .catch((err) => {
      console.log("email sent failed, err: ", err);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Email Sent Failed",
      // });
    });
};

export const sendEmailReminder = (data) => {
  console.log("In send email");
  axios
    .post("/api/sendemail/reminder", data)
    .then((res) => {
      console.log("email sent success");
      // dispatch({
      //   type: GET_MESSAGE,
      //   payload: "Email Sent to Tenant",
      // });
    })
    .catch((err) => {
      console.log("email sent failed, err: ", err);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Email Sent Failed",
      // });
    });
};
