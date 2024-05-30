import axios from "axios";

export const api = async (url, method, body) => {
  // axios.defaults.baseURL = "/api/v1/";
  // axios.defaults.baseURL = "http:///34.173.197.218:8080/api/v1/";
  // axios.defaults.baseURL = "http://146.148.107.161:8080/api/";
  // asd
  const res = await axios({
    url,
    method,
    data: body,
  });

  return res;
};
