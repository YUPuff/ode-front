import request from '@/utils/request'

export function getOrders(params) {
  return request({
    url: '/order/get',
    method: 'get',
    params
  })
}

export function getOrderById(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params
  })
}

export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}

export function cancelOrder(param) {
  return request({
    url: '/order/cancel/' + param,
    method: 'get'
  })
}

export function getHotDishes() {
  return request({
    url: '/orderDish/getTop5Dishes',
    method: 'get'
  })
}
