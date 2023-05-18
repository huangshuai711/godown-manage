import request from '@/utils/request'

// 获取策略列表
export function getStrategyData(parameter, paging) {
  return request({
    url: `/api/v1/smoke/strategyInfos/pageStrategyInfo/${paging.pageNum}/${paging.pageSize}`,
    method: 'post',
    data: parameter
  })
}

// 导入策略
export function importStrtegy(parameter = {}, type = 1) {
  return request({
    url: `/api/v1/smoke/strategyInfos/strategyImport/${type}`,
    method: 'post',
    data: parameter
  })
}
