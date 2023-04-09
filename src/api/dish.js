import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getDishes(params) {
  return request({
    headers: { 'token': token },
    url: '/dish/get',
    method: 'get',
    params
  })
}

export function getDishById(param) {
  return request({
    headers: { 'token': token },
    url: '/dish/detail/' + param,
    method: 'get'
  })
}

export function addDish(data) {
  return request({
    headers: { 'token': token },
    url: '/dish/add',
    method: 'post',
    data
  })
}

export function updateDish(data) {
  return request({
    headers: { 'token': token },
    url: '/dish/upd',
    method: 'post',
    data
  })
}

export function deleteDish(data) {
  return request({
    headers: { 'token': token },
    url: '/dish/del',
    method: 'post',
    data
  })
}

export function cancelDish(param) {
  return request({
    headers: { 'token': token },
    url: '/orderDish/cancel/' + param,
    method: 'get'
  })
}

export function getToDoDish() {
  return request({
    headers: { 'token': token },
    url: '/orderDish/getToDo'
  })
}

export function updateDishStatus(id) {
  return request({
    headers: { 'token': token },
    url: '/orderDish/upd/' + id
  })
}
