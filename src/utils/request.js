import axios from 'axios'
import {message} from 'antd'
import {HashRouter} from 'react-router-dom'
import store from './../store'
import {actionCreators} from './../store/modules/app'
import {getToken} from './index'

const Router = new HashRouter()

const instance = axios.create({
  timeout: 7000,
  baseURL: '/manage'
})

instance.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = token
      }
      store.dispatch(actionCreators.toggleLoading(true))
      return config
    },
    err => {
      return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response => {
      store.dispatch(actionCreators.toggleLoading(false))
      const statusCode = Number(response.data.code)
      if (statusCode === 2002) {
        message.error('请先登录！')
        Router.history.push('/login')
      }
      if (statusCode === 1006) {
        message.error(response.data.message)
        Router.history.push('/login')
      }
      return response
    },
    err => {
      store.dispatch(actionCreators.toggleLoading(false))
      return Promise.reject(err)
    }
)

export default instance
