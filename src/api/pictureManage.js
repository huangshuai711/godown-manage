import request from '@/utils/request'

// 获取轮播图集
export function getPictures() {
  return request({
    url: `/api/slideshowInfo/detail`,
    method: 'get'
  })
}

// 添加图片
export function addPicture(parameter) {
  return request({
    url: '/api/slideshowInfo/addSlideshowInfo',
    method: 'POST',
    data: parameter
  })
}

// 删除图片
export function deleteImg(id) {
  return request({
    url: `/api/slideshowInfo/delete/${id}`,
    method: 'PUT'
  })
}
