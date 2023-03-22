import request from '@/utils/request'

export function getDishes(data) {
  return request({
    url: '/dish/get',
    method: 'post',
    data
  })
}