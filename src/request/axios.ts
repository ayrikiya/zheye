/*
 * @Author: 王荣
 * @Date: 2022-06-02 14:36:51
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-02 15:34:04
 * @Description: 填写简介
 */
import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

export default axios;