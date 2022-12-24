import request from '@/utils/request'
import axios from 'axios'

// 获取所有菜单树
export function getSllMenuTree(parameter) {
  return request({
    url: `/api/menu/allMenuTree`,
    method: 'GET',
    data: parameter
  })
}

// 新增编辑菜单
export function saveOrUpdateMenu(parameter) {
  return request({
    url: '/api/menu/saveOrUpdateMenu',
    method: 'post',
    data: parameter
  })
}

// 删除菜单
export function removeMenu(parameter) {
  return request({
    url: '/api/menu/removeMenu',
    method: 'post',
    data: parameter
  })
}

// 获取用户列表
export function getUserList(parameter, paging) {
  return request({
    url: `/api/userInfo/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出用户信息
export function exports(parameter) {
  return request({
    url: '/api/userInfo/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
// 编辑用户信息
export function editUserInfo(parameter) {
  return request({
    url: '/api/userInfo/updateInfo',
    method: 'put',
    data: parameter
  })
}
// 改变用户状态（启用禁用）
export function changeUserState(id) {
  return request({
    url: `/api/userInfo/updateStatus/${id}`,
    method: 'PUT'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/userInfo/deleteUser/${id}`,
    method: 'DELETE'
  })
}

// 获取角色列表
export function getRoleList(parameter, paging) {
  return request({
    url: `/api/roles/pageRole/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出角色信息
export function exportRole(parameter) {
  return request({
    url: '/api/roles/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 改变角色状态（启用禁用）
export function changeRoleState(id) {
  return request({
    url: `/api/roles/updateStatus/${id}`,
    method: 'PUT'
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/api/roles/deleteRole/${id}`,
    method: 'DELETE'
  })
}

// 新增编辑
export function addEditRole(parameter) {
  return request({
    url: `/api/roles/saveOrUpdateRole`,
    method: 'POST',
    data: parameter
  })
}
// 获取日志列表
export function getLogs(parameter, paging) {
  return request({
    url: `/api/loginLogs/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出日志信息
export function exportLogs(parameter) {
  return request({
    url: '/api/loginLogs/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 删除日志
export function deleteLog(id) {
  return request({
    url: `/api/loginLogs/deleteLogs/${id}`,
    method: 'DELETE'
  })
}

///
// 获取分类树
export function getTypeTree(parameter) {
  return request({
    url: `/api/singleProductType/tree`,
    method: 'GET',
    data: parameteruserRole
  })
}

// 角色授权
export function userRole(parameter) {
  return request({
    url: `/api/userInfo/userRole`,
    method: 'POST',
    data: parameter
  })
}
