import request from '@/utils/request'

export function getTypes(params) {
  return request({
    url: '/type/get',
    method: 'get',
    params
  })
}

export function getTypeById(param) {
  return request({
    url: '/type/detail/' + param,
    method: 'get'
  })
}

export function addType(data) {
  return request({
    url: '/type/add',
    method: 'post',
    data
  })
}

export function updateType(data) {
  return request({
    url: '/type/upd',
    method: 'post',
    data
  })
}

export function deleteType(param) {
  return request({
    url: '/type/del/' + param,
    method: 'get'
  })
}
