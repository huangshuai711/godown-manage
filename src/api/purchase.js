import request from '@/utils/request'

// 进货
export function okpurchases(parameter) {
  return request({
    url: '/api/purchases/stockInStorage',
    method: 'POST',
    data: parameter
  })
}

// 退货
export function okstockOut(parameter) {
  return request({
    url: '/api/purchases/stockOutStorage',
    method: 'POST',
    data: parameter
  })
}

// 获取单据列表
export function getPurchasesList(parameter, paging) {
  return request({
    url: `/api/purchases/pageStockInStorage/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导出单据信息
export function exportPurchases(parameter) {
  return request({
    url: '/api/purchases/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
// 销售出库
export function saleIssue(parameter) {
  return request({
    url: '/api/purchases/saleOutWarehouse',
    method: 'POST',
    data: parameter
  })
}

// 获取客户退货列表
export function getSaleInWareList(parameter, paging) {
  return request({
    url: `/api/purchases/pageSaleInWarehouse/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 获取单据详情
export function getdjDetails(id) {
  return request({
    url: `/api/purchases/getDocumentInfo/${id}`,
    method: 'GET'
  })
}
