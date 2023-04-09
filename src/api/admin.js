import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getAdmins(params) {
  return request({
    headers: { 'token': token },
    url: '/admin/get',
    method: 'get',
    params
  })
}

export function getAdminById(param) {
  return request({
    headers: { 'token': token },
    url: '/admin/detail/' + param,
    method: 'get'
  })
}

export function updateAdmin(data) {
  return request({
    headers: { 'token': token },
    url: '/admin/upd',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    headers: { 'token': token },
    url: '/admin/del',
    method: 'post',
    data
  })
}

export function getStatistics() {
  return request({
    headers: { 'token': token },
    url: '/admin/statistics',
    method: 'get'
  })
}

export function getDays(param) {
  return request({
    headers: { 'token': token },
    url: '/admin/index/' + param,
    method: 'get'
  })
}
