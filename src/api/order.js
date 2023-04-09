import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getOrders(params) {
  return request({
    headers: { 'token': token },
    url: '/order/get',
    method: 'get',
    params
  })
}

export function getOrderById(params) {
  return request({
    headers: { 'token': token },
    url: '/order/detail',
    method: 'get',
    params
  })
}

export function cancelOrder(param) {
  return request({
    headers: { 'token': token },
    url: '/order/cancel/' + param,
    method: 'get'
  })
}

export function getHotDishes() {
  return request({
    headers: { 'token': token },
    url: '/orderDish/getTop5Dishes',
    method: 'get'
  })
}
