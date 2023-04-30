import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function signup(data) {
  return request({
    url: '/admin/signup',
    method: 'post',
    data
  })
}

export function getKeys() {
  return request({
    url: '/admin/getKeys',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    headers: { 'token': token },
    url: '/admin/logout',
    method: 'post'
  })
}
