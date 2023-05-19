import axiosClient from "./axios.client";

const userApi = {
  signIn: (body) => {
    const url = "/Users/SignIn";
    return axiosClient.post(url, body);
  },
  resetPassword: (body) => {
    const url = "/Users/ResetPassword";
    return axiosClient.post(url, body);
  },
  signUp: (body) => {
    const url = "/Users/SignUp";
    return axiosClient.post(url, body);
  },
  updateinfo: (body) => {
    const url = "/Users/UpdateInfo";
    return axiosClient.post(url, body);
  },
  
};

export default userApi;
