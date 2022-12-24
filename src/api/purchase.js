import request from '@/utils/request'

// 进货
export function okpurchases(parameter) {
  return request({
    url: '/api/purchases/stockInStorage',
    method: 'POST',
    data: parameter
  })
}

// 进货
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
