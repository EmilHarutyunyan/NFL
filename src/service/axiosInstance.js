import axios from "axios";
import { API_ENDPOINT } from "../config/config";
import TokenService from "./token.service";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let authTokens = TokenService.getUser() || "";
    if (authTokens) {
      config.headers["Authorization"] = `Bearer ${authTokens?.tokens?.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== `${API_ENDPOINT}Account/Authorize` &&
      err.response
    ) {
      // Access Token was expired
      if (
        (err.response.status === 401 || err.response.status === 403) &&
        !originalConfig._retry
      ) {
        debugger
        originalConfig._retry = true;
        let authTokens = TokenService.getUser() || "";

        try {
          const response = await axiosInstance.post(
            `${API_ENDPOINT}token/refresh/`,
            {
              refresh: authTokens.tokens.refresh,
            }
          );

          TokenService.updateLocalAccessToken(response.data?.access);

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
