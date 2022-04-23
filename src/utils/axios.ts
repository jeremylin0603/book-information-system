/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import type { AxiosRequestConfig } from 'axios'

const CORS_SKIP_URL = 'https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/'
const API_DOMAIN = 'https://demo.api-platform.com'
const TIME_OUT_SEC = 20

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: CORS_SKIP_URL + API_DOMAIN,
  timeout: TIME_OUT_SEC * 1000
}

const service = axios.create(axiosRequestConfig)

// 請求攔截
service.interceptors.request.use(
  request => {
    return request
  },
  err => {
    Promise.reject(err)
  }
)

// 回應攔截
service.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err.toString())
  }
)

export default {
  get(url: string, params?: BaseObj) {
    return service({
      method: 'get',
      url,
      params
    })
  },

  post(url: string, data: BaseObj) {
    return service({
      method: 'post',
      url,
      data
    })
  },

  put(url: string, data: BaseObj) {
    return service({
      method: 'put',
      url,
      data
    })
  },

  patch(url: string, data: BaseObj) {
    return service({
      method: 'PATCH',
      url,
      data
    })
  },

  delete(url: string) {
    return service({
      method: 'delete',
      url
    })
  }
}
