import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { instance } from "./api";
import { Token } from "./auth";

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
  if (
    error.response?.status === 400 &&
    error.response.data.message === "missing or malformed jwt"
  ) {
    await Token.getToken().then((res) => {
      return instance(error.config);
    });
  }
  return Promise.reject(error);
};

const onResponseErrorRetry = async (error: AxiosError): Promise<AxiosError> => {
  if (
    error.response?.status === 400 &&
    error.response.data.message === "missing or malformed jwt"
  ) {
    await Token.getToken().then((res) => {
      return instance(error.config);
    });
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  if (process.env.REACT_APP_DEBUG) {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
  } else {
    axiosInstance.interceptors.response.use(undefined, onResponseErrorRetry);
  }
  return axiosInstance;
}
