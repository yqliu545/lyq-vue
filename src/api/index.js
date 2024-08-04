import request from '@/utils/request'

// 登录方法
export function buyjoker(data) {
  return request({
    url: '/pay/alipay/makeOrder',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}
