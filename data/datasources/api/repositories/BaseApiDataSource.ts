import axios, { AxiosError, AxiosResponse } from 'axios'

const axiosInstace = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 10000,
})

axiosInstace.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const token = localStorage.getItem('autherziedToken')
      if (token) {
        return new Promise((resolve) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(axios(originalRequest))
        })
      }
    }
    return Promise.reject(error)
  }
)

const initAxios = () => {}

const setAxiosToken = () => {}

const removeAxiosToken = () => {}

const processError = <T>(error: AxiosError): T => {
  console.error(`StatusCode: ${error.code} - ${error.message}`)

  return error.response as any
}

const responseBody = <T>(res: AxiosResponse<any>): T => res.data as T

const BaseApiDataSource = {
  get: <T>(url: string, params?: Object) =>
    axiosInstace
      .get(url, { params })
      .then((response) => responseBody<T>(response))
      .catch((error) => processError<T>(error)),
  post: <T>(url: string, data: any) =>
    axiosInstace
      .post(url, data)
      .then((response) => responseBody<T>(response))
      .catch((error) => processError<T>(error)),
  put: <T>(url: string, data: any) =>
    axiosInstace
      .put(url, data)
      .then((response) => responseBody<T>(response))
      .catch((error) => processError<T>(error)),
  delete: <T>(url: string) =>
    axiosInstace
      .delete(url)
      .then((response) => responseBody<T>(response))
      .catch((error) => processError<T>(error)),
  postWithFile: <T>(url: string, data: any) =>
    axiosInstace
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => responseBody<T>(response))
      .catch((error) => processError<T>(error)),
}

export { initAxios, removeAxiosToken, setAxiosToken }

export default BaseApiDataSource
