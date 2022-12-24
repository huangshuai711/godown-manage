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
