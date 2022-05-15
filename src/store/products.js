import { setStore, getStore } from '@/common/js/utils'
import { getDefaultProductsState } from '@/common/js/resetStore'
export default {
    state: getDefaultProductsState(),

    getters: {
        productsId: (state) => {
            state.productsId = getStore('productsId') ? JSON.parse(getStore('productsId')) : null;
            return state.productsId
        },

        orderId: (state) => {
            state.orderId = getStore('orderId') ? getStore('orderId') : '';
            return state.orderId
        },

        isPaying: (state)  => { 
            state.isPaying = getStore('isPaying') ? getStore('isPaying') === 'false' ? false : true : false
            return state.isPaying
        },

        isCanSendPhoneCode: (state)  => {
            state.isCanSendPhoneCode = getStore('isCanSendPhoneCode') ? getStore('isCanSendPhoneCode') === 'false' ? false : true : true
            return state.isCanSendPhoneCode
        },

        collectionId: (state)  => {
            state.collectionId = getStore('collectionId') ? JSON.parse(getStore('collectionId')) : null
            return state.collectionId
        },

        countdownTime: (state)  => {
            state.countdownTime = getStore('countdownTime') ? getStore('countdownTime') : 0
            return state.countdownTime
        },

        donationProductDetails: (state)  => {
            state.donationProductDetails = getStore('donationProductDetails') ? JSON.parse(getStore('donationProductDetails')) : null
            return state.donationProductDetails
        },

        isEnterVerificationCodePage: (state)  => {
            state.isPaying = getStore('isEnterVerificationCodePage') ? getStore('isEnterVerificationCodePage') === 'false' ? false : true : false
            return state.isEnterVerificationCodePage
        },

        isEnterLoginPageSource: (state)  => {
            state.isEnterLoginPageSource = getStore('isEnterLoginPageSource') ? getStore('isEnterLoginPageSource') : ''
            return state.isEnterLoginPageSource
        },
        collectTransferCodeMessage: (state)  => {
            state.collectTransferCodeMessage = getStore('collectTransferCodeMessage') ? JSON.parse(getStore('collectTransferCodeMessage')) : []
            return state.collectTransferCodeMessage
        }
    },

    mutations: {
        // 保存作品id
        changeProductsId(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('productsId', playLoad);
                state.productsId = playLoad
            }
        },

        // 保存订单id
        changeOrderId(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('orderId', playLoad);
                state.orderId = playLoad
            }
        },

        // 保存支付状态
        changeIsPaying(state, playLoad) {
            setStore('isPaying', playLoad);
            state.isPaying = playLoad
        },

        // 保存藏品id状态
        changeCollectionId(state, playLoad) {
            setStore('collectionId', playLoad);
            state.collectionId = playLoad
        },

        // 保存赠送产品的信息
        changeDonationProductDetails(state, playLoad) {
            setStore('donationProductDetails', playLoad);
            state.donationProductDetails = playLoad
        },

        // 保存是否可以发送手机验证码的状态
        changeIsCanSendPhoneCode(state, playLoad) {
            setStore('isCanSendPhoneCode', playLoad);
            state.isCanSendPhoneCode = playLoad
        },

        // 存储倒计时过期时间
        changeCountdownTime(state, playLoad) {
            setStore('countdownTime', playLoad);
            state.countdownTime = playLoad
        },

        // 保存是否进入手机验证码页的状态
        changeIsEnterVerificationCodePage(state, playLoad) {
            setStore('isEnterVerificationCodePage', playLoad);
            state.isEnterVerificationCodePage = playLoad
        }, 

        // 保存进入登录页的来源页路径
        changeIsEnterLoginPageSource(state, playLoad) {
            setStore('isEnterLoginPageSource', playLoad);
            state.isEnterLoginPageSource = playLoad
        }, 

        // 保存藏品赠送发送的验证码是否超过60s的状态
        changeCollectTransferCodeMessage(state, playLoad) {
            setStore('collectTransferCodeMessage', playLoad);
            state.collectTransferCodeMessage = playLoad
        }, 

        //重置产品的状态
        resetProductsState(state) {
            Object.assign(state, getDefaultProductsState())
        }
    },

    actions: {
        resetFabricState({ commit }) {
            commit('resetProductsState')
        }
    }
}