import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  GET_MESSAGE,
  SET_CURRENT_USER,
  USER_LOADING,
} from "./types";

// Register User

/* Get Staff Key */
export const getStaffKey = (onDataReceived) => {
  axios
    .get("/api/staffkey")
    .then((response) => {
      // console.log("response is:", response.data[0].staffkey);
      onDataReceived(response.data[0].staffkey);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      dispatch({
        type: GET_MESSAGE,
        payload: "User Created",
      });
      history.push("/login");
    }) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // console.log("decoded is: ", decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticaed to false
  dispatch(setCurrentUser({}));
};

/* Tenant */
// Register Tenant
export const registerTenant = (userData, history) => (dispatch) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post("/api/users/createtenant", userData)
      .then((res) => {
        dispatch({
          type: GET_MESSAGE,
          payload: "Tenant Created",
        });
        history.push("/auditlist");
        resolve(userData);
      }) // TODO: set up ViewTenants{AuditorName} or sth
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        reject("Tenant Creation Failed");
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

export const deleteTenant = (data) => {
  console.log(data);
  return axios.post("/api/users/deletetenant", data).catch((err) => {
    console.log(err);
  });
};

export const resetPassword = (data) => (dispatch) => {
  console.log("resetpassword");
  axios
    .put("/api/users/resetpassword", data)
    .then((res) => {
      console.log("axios called");
      sendEmailPasswordReset(res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: "Password Resetted if email is valid",
      });
    })
    .catch((err) => {
      console.log("axios called but error");
      console.log(err);
      dispatch({
        type: GET_MESSAGE,
        payload: "Password Resetted if email is valid",
      });
    });
};

export const sendEmailPasswordReset = (data) => {
  console.log("In send email");
  axios
    .post("/api/sendemail/reset", data)
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

export const sendEmail = (data) => {
  console.log("In send email");
  axios
    .post("/api/sendemail/create", data)
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
