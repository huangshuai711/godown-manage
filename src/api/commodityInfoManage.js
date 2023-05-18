import request from '@/utils/request'

// 获取商品列表
export function getCommodityData(parameter, paging) {
  return request({
    url: `/api/v1/smoke/productInfos/pageProductInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 新增商品
export function addCommodity(parameter) {
  return request({
    url: '/api/v1/smoke/productInfos/noSmokeSave·+',
    method: 'post',
    data: parameter
  })
}

// 编辑商品
export function editCommodity(parameter) {
  return request({
    url: '/api/v1/smoke/productInfos/updateEntity',
    method: 'post',
    data: parameter
  })
}
// 商品详情
export function getCommodityDetails(id) {
  return request({
    url: `api/v1/smoke/productInfos/detail/${id}`,
    method: 'post'
  })
}

// 删除商品
export function removeCommodity(id) {
  return request({
    url: `/api/v1/smoke/productInfos/delete/${id}`,
    method: 'post'
  })
}

// 导入商品
export function importCommodity(parameter = {}, type = 1) {
  return request({
    url: `/api/v1/smoke/productInfos/productImport/${type}`,
    method: 'post',
    data: parameter
  })
}
