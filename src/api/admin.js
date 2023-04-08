import request from '@/utils/request'

export function getAdmins(params) {
  return request({
    url: '/admin/get',
    method: 'get',
    params
  })
}

export function getAdminById(param) {
  return request({
    url: '/admin/detail/' + param,
    method: 'get'
  })
}

export function updateAdmin(data) {
  return request({
    url: '/admin/upd',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/admin/del',
    method: 'post',
    data
  })
}

export function getStatistics() {
  return request({
    url: '/admin/statistics',
    method: 'get'
  })
}

export function getDays(param) {
  return request({
    url: '/admin/index/' + param,
    method: 'get'
  })
}
