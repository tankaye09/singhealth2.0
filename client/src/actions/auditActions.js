import { getAllByPlaceholderText } from "@testing-library/dom";
import axios from "axios";

export const submit = (data) => {
  console.log(data);
  axios.post("/api/audits/add", data).catch((error) => {
    console.log(error);
  });
};

export const display = (onDataReceived) => {
  axios
    .get("/api/audits")
    .then((response) => {
      const data = response.data;
      // console.log(data);
      // console.log(data.length);
      onDataReceived(data);
    })
    .catch(() => {
      alert("Error");
    });
};

export const updateAudit = (data) => {
  console.log(data);
  axios.put("/api/audits/add", data).catch((error) => {
    console.log(error);
  });
};