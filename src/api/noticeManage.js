import request from '@/utils/request'

// 获取公告列表
export function getNoticeData(parameter, paging) {
  return request({
    url: `/api/v1/smoke/noticeInfos/pageNoticeInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 新增公告
export function addNotice(parameter) {
  return request({
    url: '/api/v1/smoke/noticeInfos/add',
    method: 'post',
    data: parameter
  })
}

// 编辑公告
export function editNotice(parameter) {
  return request({
    url: '/api/v1/smoke/noticeInfos/edit',
    method: 'post',
    data: parameter
  })
}
// 公告详情
export function getNoticeDetails(id) {
  return request({
    url: `api/v1/smoke/noticeInfos/detail/${id}`,
    method: 'post',
    data: parameter
  })
}

// 删除公告
export function removeNotice(id) {
  return request({
    url: `/api/v1/smoke/noticeInfos/delete/${id}`,
    method: 'post'
  })
}
