// 登录信息store的初始值
export function getDefaultLoginState() {
    return {
        userInfo: null, //用户信息
        isLogin: false, //是否登录
        token: null, //请求token
        isShowLoginHint: true, //是否展示登录提示框状态
        isShowNameAuthHint: true //是否展示实名认证提示框状态
    }
};
// 产品信息store的初始值
export function getDefaultProductsState() {
    return {
        productsId: '', //作品id
        collectionId: '', //藏品id
        orderId: '', //订单id
        isPaying: false, //是否支付中
        donationProductDetails: null, //赠送商品详情
        isCanSendPhoneCode: true, //是否能发送验证码
        countdownTime: 0 //过期时间
    }
};