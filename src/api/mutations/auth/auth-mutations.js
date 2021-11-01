import axios from "../../../http";

export const signUp = async (payload) => {
  return axios.post("/auth/signup", payload);
};

export const signIn = async (payload) => {
  return axios.post("/auth/signin", payload);
};
