import request from '@/utils/request'

// 查询支付信息列表
export function listPay_info(query) {
  return request({
    url: '/pay/pay_info/list',
    method: 'get',
    params: query
  })
}

// 查询支付信息详细
export function getPay_info(id) {
  return request({
    url: '/pay/pay_info/' + id,
    method: 'get'
  })
}

// 新增支付信息
export function addPay_info(data) {
  return request({
    url: '/pay/pay_info',
    method: 'post',
    data: data
  })
}

// 修改支付信息
export function updatePay_info(data) {
  return request({
    url: '/pay/pay_info',
    method: 'put',
    data: data
  })
}

// 删除支付信息
export function delPay_info(id) {
  return request({
    url: '/pay/pay_info/' + id,
    method: 'delete'
  })
}
