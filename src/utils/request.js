import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, gettimeToken } from '@/utils/auth'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(config)
    if (store.getters.token) {
      console.log(gettimeToken())
      const newtime = Date.now() - gettimeToken()
      // console.log(newtime)
      if (newtime > 3600000) {
        // console.log('token失效')
        return Promise.reject(new Error('登录过期，请重新登录'))
      } else {
        config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['X-Token'] = getToken()
      }
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const { data } = response
    if (data.success) {
      return data
    } else {
      Message.error(data.message || '请求失败')
      return Promise.reject(data)
    }
  },
  error => {
    console.log(error)
    if (error.response.data.code === 1002) {
      return Promise.reject(new Error('登录过期，请重新登录'))
    }
    Message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default service
