import request from '@/utils/request'
import axios from 'axios'

// 上传文件
export function uploadFiles(parameter) {
  return request({
    url: `/api/sysFiles/fileUpload`,
    method: 'post',
    data: parameter
  })
}
