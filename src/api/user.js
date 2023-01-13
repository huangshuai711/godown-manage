import request from '@/utils/request'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_API
// 登录
export function login(parameter) {
  return axios({
    url: '/api/user/login',
    method: 'post',
    data: parameter
  })
}
// 注册
export function signUp(parameter) {
  return axios({
    url: '/api/user/register',
    method: 'post',
    data: parameter
  })
}

// 获取用户信息
export function getUserInfoByToken(parameter) {
  return request({
    url: '/api/user/getUserInfoByToken',
    method: 'GET',
    data: parameter
  })
}

// 编辑用户信息
export function eidtPassword(parameter) {
  return request({
    url: `/api/user/modifyPassword/${parameter.newPassword}/${parameter.oldPassword}`,
    method: 'PUT'
  })
}

// 获取菜单
export function getUserMenuTree(parameter) {
  return request({
    url: '/api/menu/menuTree',
    method: 'GET',
    data: parameter
  })
}
