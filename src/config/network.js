import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http:///35.193.99.200:8080/api/v1/";
  // axios.defaults.baseURL = "http://146.148.107.161:8080/api/";
  const res = await axios({
    url,
    method,
    data: body,
  });

  return res;
};
