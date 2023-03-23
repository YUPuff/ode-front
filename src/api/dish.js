import request from '@/utils/request'

export function getDishes(params) {
  return request({
    url: '/dish/get',
    method: 'get',
    params
  })
}

export function getDishById(param) {
  return request({
    url: '/dish/detail/' + param,
    method: 'get'
  })
}

export function addDish(data) {
  return request({
    url: '/dish/add',
    method: 'post',
    data
  })
}

export function updateDish(data) {
  return request({
    url: '/dish/upd',
    method: 'post',
    data
  })
}

export function deleteDish(data) {
  return request({
    url: '/dish/del',
    method: 'post',
    data
  })
}

