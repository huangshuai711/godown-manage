import request from '@/utils/request'
import axios from 'axios'

// 获取订单列表
export function getOrderData(parameter, paging) {
  return request({
    url: `/api/orders/pageUser/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出订单
export function exportOrder(parameter) {
  return request({
    url: '/api/orders/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}

// 获取订单详情
export function getOrderDetail(id) {
  return request({
    url: `/api/orders/detail/${id}`,
    method: 'put'
  })
}
// /api/orders/updateStatus/

// 修改订单状态订单详情
export function changeOrderState(parameter) {
  return request({
    url: `/api/orders/updateStatus/${parameter.id}/${parameter.state}`,
    method: 'put'
  })
}
