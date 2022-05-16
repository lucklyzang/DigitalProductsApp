// 登录信息store的初始值
export function getDefaultLoginState() {
    return {
        userInfo: null, //用户信息
        isLogin: false, //是否登录
        token: null, //请求token
        isShowLoginHint: true, //是否展示登录提示框状态
        isShowNameAuthHint: true, //是否展示实名认证提示框状态
        isTokenExpired: '' // token是否过期
    }
};
// 产品信息store的初始值
export function getDefaultProductsState() {
    return {
        productsId: null, //作品id
        isRefreshHomePage: false, //是否刷新首页
        collectTransferCodeMessage: [], //藏品转增手机验证码是否能重发的信息
        collectionId: null, //藏品id
        orderId: '', //订单id
        isEnterVerificationCodePage: false, //是否进入过手机验证码页
        isEnterLoginPageSource: '', // 从哪个页面进入的登录页
        isPaying: false, //是否支付中
        donationProductDetails: null, //赠送商品详情
        isCanSendPhoneCode: true, //是否能发送验证码
        countdownTime: 0 //过期时间
    }
};