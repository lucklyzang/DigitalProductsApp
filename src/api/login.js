import request from '@/utils/request'

// 发送手机验证码
export function sendPhoneAuthCode(mobile) {
    return request({
        url: `app/verify/${mobile}`,
        method: 'post'
    })
};

// 手机验证码登录
export function phoneAuthCodeLogin(data) {
    return request({
        url: 'app/login',
        method: 'post',
        data
    })
};

// 退出登录
export function logout(data) {
    return request({
        url: 'app/logout',
        method: 'post',
        data
    })
};

// 用户注销
export function cancellatio() {
    return request({
        url: '/app/cancellation',
        method: 'post'
    })
};