/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const corsSkipUrl = 'https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/'
const domain = 'https://demo.api-platform.com'
const service = axios.create({
  baseURL: corsSkipUrl + domain,
  timeout: 20 * 1000
})

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
  get(url: string, params: BaseObj) {
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
