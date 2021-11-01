import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
  (request) => {
    return {
      ...request,
      headers: {
        ...request.headers,
        authorization: localStorage.getItem("token"),
      },
    };
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default instance;
