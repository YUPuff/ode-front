import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getSEComment() {
  return request({
    headers: { 'token': token },
    url: '/comment/se',
    method: 'get'
  })
}

export function getCommentDetail(params) {
  return request({
    headers: { 'token': token },
    url: '/comment/detail',
    method: 'get',
    params
  })
}
