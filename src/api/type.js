import request from '@/utils/request'

export function getTypes(params) {
  return request({
    url: '/type/get',
    method: 'get',
    params
  })
}
