import request from '@/utils/request'

// 登录方法
export function buyjoker(data) {
  return request({
    url: '/pay/alipay/makeOrder',
    method: 'post',
    data: data
  })
}
