import request from '@/utils/request'

// 查询商品列表
export function listMerchandise(query) {
  return request({
    url: '/order/merchandise/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getMerchandise(merchandiseId) {
  return request({
    url: '/order/merchandise/' + merchandiseId,
    method: 'get'
  })
}

// 新增商品
export function addMerchandise(data) {
  return request({
    url: '/order/merchandise',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateMerchandise(data) {
  return request({
    url: '/order/merchandise',
    method: 'put',
    data: data
  })
}

// 删除商品
export function delMerchandise(merchandiseId) {
  return request({
    url: '/order/merchandise/' + merchandiseId,
    method: 'delete'
  })
}
