import request from '@/utils/request'

export function getSEComment() {
  return request({
    url: '/comment/se',
    method: 'get'
  })
}

export function getCommentDetail(params) {
  return request({
    url: '/comment/detail',
    method: 'get',
    params
  })
}
