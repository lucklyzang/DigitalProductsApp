import request from '@/utils/request'

// 查询用户信息
export function inquareUserInfo() {
    return request({
      url: 'app/purchaser/info',
      method: 'get'
    })
};

// 修改昵称
export function changeNickname(data) {
    return request({
      url: 'app/purchaser/nickName',
      method: 'put',
      params: data
    })
};

// 修改签名
export function changeSignature(data) {
  return request({
    url: 'app/purchaser/signTxt',
    method: 'put',
    params: data
  })
};

// 修改头像
export function changeAvatar(data) {
    return request({
      url: 'app/purchaser/avatar',
      method: 'post',
      data
    })
};

// 实名认证
export function realNameArenhzneuthentication(data) {
    return request({
      url: 'app/purchaser/authentication',
      method: 'post',
      data
    })
};

// 查询首页作品列表
export function inquareProductList(data) {
    return request({
      url: 'app/index',
      method: 'get',
      params: data
    })
};

// 作品访问记录
export function productVisitRecord(id) {
  return request({
    url: `app/visit/${id}`,
    method: 'get'
  })
};

// 查询作品详情
export function inquareProductDetails(id) {
    return request({
      url: `app/one/${id}`,
      method: 'get'
    })
};

// 查询发售日厉
export function inquareSellCalendar() {
    return request({
      url: 'app/sale',
      method: 'get'
    })
};

// 作品访问记录
export function productsAccessRecord(id) {
  debugger;
  return request({
    url: `app/visit/${id}`,
    method: 'get'
  })
};

// 购买商品
export function purchaseCommodity(commId) {
  return request({
    url: `app/order/${commId}`,
    method: 'post'
  })
};

// 创建支付订单
export function createPaymentOrder(data) {
  return request({
    url: 'app/pay',
    method: 'post',
    data
  })
};

// 取消订单
export function cancelOrder(orderId) {
  return request({
    url: `app/cancel/${orderId}`,
    method: 'post'
  })
};

// 查询支付结果
export function queryPaymentResult(orderId) {
  return request({
    url: `/app/pay/${orderId}`,
    method: 'get'
  })
};

// 查询订单列表
export function queryOrderList() {
  return request({
    url: 'app/orders',
    method: 'get'
  })
};

// 查询订单详情
export function queryOrderDetails(id) {
  return request({
    url: `app/order/${id}`,
    method: 'get'
  })
};

// 查询藏品记录
export function queryObjectRecord(data) {
  return request({
    url: 'app/record',
    method: 'get',
    params: data
  })
};