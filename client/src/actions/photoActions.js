import axios from "axios";

export const uploadPhoto = (info) => {
  // console.log(info);
  // console.log(info.image);
  axios.post("/api/photos/add", info);
};

export const photoList = () => {
  axios
    .get("/api/photos")
    .then((response) => {
      const data = response.data;
      console.log(data);
      console.log(data.length);
    })
    .catch((err) => {
      console.log(err);
    });
};
