import request from '@/utils/request'

// 获取档案列表
export function getGradeData(parameter, paging) {
  return request({
    url: `/api/v1/smoke/levelReads/listLevelRead`,
    method: 'post',
    data: parameter
  })
}

// 导入档案
export function importStrtegy(parameter = {}, type = 1) {
  return request({
    url: `/api/v1/smoke/strategyInfos/strategyImport/${type}`,
    method: 'post',
    data: parameter
  })
}
