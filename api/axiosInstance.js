import axios from "axios";

const api = axios.create({
  baseURL: "https://mock.apidog.com/m1/1143662-1136076-default",
  //https://mock.apidog.com/m1/1143662-1136076-default
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
