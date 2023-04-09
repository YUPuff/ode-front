import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getTypes(params) {
  return request({
    headers: { 'token': token },
    url: '/type/get',
    method: 'get',
    params
  })
}

export function getTypeById(param) {
  return request({
    headers: { 'token': token },
    url: '/type/detail/' + param,
    method: 'get'
  })
}

export function addType(data) {
  return request({
    headers: { 'token': token },
    url: '/type/add',
    method: 'post',
    data
  })
}

export function updateType(data) {
  return request({
    headers: { 'token': token },
    url: '/type/upd',
    method: 'post',
    data
  })
}

export function deleteType(param) {
  return request({
    headers: { 'token': token },
    url: '/type/del/' + param,
    method: 'get'
  })
}
