import request from '@/utils/request'

// 获取商品列表
export function getCommodityList(parameter, paging) {
  return request({
    url: `/api/sysProductInfos/pageSysProductInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出商品信息
export function exportCommodity(parameter) {
  return request({
    url: '/api/sysProductInfos/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 新增商品
export function addCommodity(parameter) {
  return request({
    url: '/api/sysProductInfos/saveSysProductInfo',
    method: 'post',
    data: parameter
  })
}

// 编辑
export function editCommodity(parameter) {
  return request({
    url: '/api/sysProductInfos/updateInfo',
    method: 'PUT',
    data: parameter
  })
}

// 获取客户列表
export function getClientList(parameter, paging) {
  return request({
    url: `/api/clients/pageClient/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出客户信息
export function exportClient(parameter) {
  return request({
    url: '/api/clients/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 改变客户状态（启用禁用）
export function changeClientState(id) {
  return request({
    url: `/api/clients/updateStatus/${id}`,
    method: 'PUT'
  })
}

// 新增客户
export function addClient(parameter) {
  return request({
    url: '/api/clients/saveClient',
    method: 'post',
    data: parameter
  })
}

// 编辑客户
export function editClient(parameter) {
  return request({
    url: '/api/clients/updateInfo',
    method: 'PUT',
    data: parameter
  })
}

// 获取供应商列表
export function getSuppliersList(parameter, paging) {
  return request({
    url: `/api/suppliers/pageSupplier/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出供应商信息
export function exportSuppliers(parameter) {
  return request({
    url: '/api/clients/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 改变供应商状态（启用禁用）
export function changeSuppliersState(id) {
  return request({
    url: `/api/suppliers/updateStatus/${id}`,
    method: 'PUT'
  })
}

// 新增客户
export function addSupplier(parameter) {
  return request({
    url: '/api/suppliers/saveSupplier',
    method: 'post',
    data: parameter
  })
}

// 编辑客户
export function editSupplier(parameter) {
  return request({
    url: '/api/suppliers/updateInfo',
    method: 'PUT',
    data: parameter
  })
}

// 导出商品期初库存
export function exportStock(parameter) {
  return request({
    url: '/api/sysProductInfos/exportInventory',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 获取预警列表
export function getWarningList(parameter = {}) {
  return request({
    url: `/api/clients/inventoryWarning`,
    method: 'post',
    data: parameter
  })
}

// 获取采购统计列表
export function getPurchaseList(parameter = {}) {
  return request({
    url: `/api/clients/productPurchase`,
    method: 'post',
    data: parameter
  })
}

// 获取销售统计列表
export function getSellList(parameter = {}) {
  return request({
    url: `/api/clients/productSelling`,
    method: 'post',
    data: parameter
  })
}
// 获取按日统计列表
export function getDayList(parameter = {}) {
  return request({
    url: `/api/clients/dayStatistics`,
    method: 'post',
    data: parameter
  })
}

// 获取按月统计列表
export function getMonthList(parameter = {}) {
  return request({
    url: `/api/clients/monthStatistics`,
    method: 'post',
    data: parameter
  })
}
