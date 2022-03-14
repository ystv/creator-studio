import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Token } from "./auth";

const refreshAccess = async (failedRequest: AxiosError): Promise<void> => {
  try {
    const { token } = await Token.getToken();
    failedRequest.response!.config.headers["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("token", token);
    return Promise.resolve();
  } catch (error) {
    // The user is likely to have no JWT, so send them to login
    window.location.href = `${process.env.REACT_APP_SECURITY_BASEURL}/login?callback=${window.location.href}`;
    return Promise.reject(error);
  }
};

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info("[request]", config);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error("[request error]", error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info("[response]", response);
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.error("[response error]", error);
  return Promise.reject(error);
};

export const setupInterceptorsTo = (instance: AxiosInstance): AxiosInstance => {
  createAuthRefreshInterceptor(instance, refreshAccess, {
    statusCodes: [400, 401, 403],
  });

  instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token && config) {
        if (!config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers = {};
        }
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  if (process.env.REACT_APP_DEBUG) {
    instance.interceptors.request.use(onRequest, onRequestError);
    instance.interceptors.response.use(onResponse, onResponseError);
  }
  return instance;
};
