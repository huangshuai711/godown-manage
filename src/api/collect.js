import request from '@/utils/request'
import axios from 'axios'

// 获取收藏列表
export function getCollectData(parameter, paging) {
  return request({
    url: `/api/collectComments/pageCollectComment/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}
// 导出收藏
export function exportCollect(parameter) {
  return request({
    url: '/api/collectComments/export',
    method: 'post',
    responseType: 'blob',
    data: parameter
  })
}
// 删除收藏
export function deleteCollect(parameter) {
  return request({
    url: `/api/userHomes/collectComment/${parameter.id}/${parameter.type}`,
    method: 'GET'
  })
}
