import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/dish/upload',
    method: 'post',
    data
  })
}
