import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function upload(data) {
  return request({
    headers: { 'token': token, 'Content-Type': 'multipart/form-data' },
    url: '/dish/upload',
    method: 'post',
    data
  })
}
