import axios from "axios";

export const submit = (data) => {
    axios
        .post("/api/audits/add", data)
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