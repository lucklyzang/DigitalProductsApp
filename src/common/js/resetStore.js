// 登录信息store的初始值
export function getDefaultLoginState() {
    return {
        userInfo: null, //用户信息
        isLogin: false, //是否登录
        token: null //请求token
    }
};
// 产品信息store的初始值
export function getDefaultProductsState() {
    return {
        productsId: '', //作品id
        collectionId: '', //藏品id
        orderId: '', //订单id
        isPaying: false, //是否支付中
        donationProductDetails: null //赠送商品详情
    }
};