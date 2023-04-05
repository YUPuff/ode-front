import request from '@/utils/request'

export function getEntireComment(params) {
  return request({
    url: '/comment/entire',
    method: 'get',
    params
  })
}

