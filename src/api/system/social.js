import request from '@/utils/request'

// 查询社会化关系列表
export function listSocial(query) {
  return request({
    url: '/system/social/list',
    method: 'get',
    params: query
  })
}

// 查询社会化关系详细
export function getSocial(id) {
  return request({
    url: '/system/social/' + id,
    method: 'get'
  })
}

// 新增社会化关系
export function addSocial(data) {
  return request({
    url: '/system/social',
    method: 'post',
    data: data
  })
}

// 修改社会化关系
export function updateSocial(data) {
  return request({
    url: '/system/social',
    method: 'put',
    data: data
  })
}

// 删除社会化关系
export function delSocial(id) {
  return request({
    url: '/system/social/' + id,
    method: 'delete'
  })
}
