import { setStore, getStore } from '@/common/js/utils'
import { getDefaultLoginState } from '@/common/js/resetStore'
export default {
    state: getDefaultLoginState(),

    getters: {
        userInfo: (state) => {
            state.userInfo = JSON.parse(getStore('userInfo')) ? JSON.parse(getStore('userInfo')) : null;
            return state.userInfo
        },

        token: (state) => {
            state.token = getStore('token') ? getStore('token') : null;
            return state.token
        },

        isLogin: (state) => {
            state.isLogin = getStore('isLogin') ? getStore('isLogin') === 'false' ? false : true : false;
            return state.isLogin
        },

        isShowLoginHint: (state) => {
            state.isShowLoginHint = getStore('isShowLoginHint') ? getStore('isShowLoginHint') === 'false' ? false : true : true;
            return state.isShowLoginHint
        },

        isShowNameAuthHint: (state) => {
            state.isShowNameAuthHint = getStore('isShowNameAuthHint') ? getStore('isShowNameAuthHint') === 'false' ? false : true : true;
            return state.isShowNameAuthHint
        }
    },

    mutations: {

        // 保存用户信息
        storeUserInfo(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('userInfo', playLoad);
                state.userInfo = playLoad
            }
        },

        // 保存token
        changeToken(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('token', playLoad);
                state.token = playLoad
            }
        },

        // 保存用户登录状态
        changeIsLogin(state, playLoad) {
            if (playLoad != 'null') {
                setStore('isLogin', playLoad);
                state.isLogin = playLoad
            }
        },

        //重置login的store
        resetState(state) {
            Object.assign(state, getDefaultLoginState())
        },

        // 保存登录提示框的状态isShowNameAuthHint
        changeIsShowLoginHint(state, playLoad) {
            if (playLoad != 'null') {
                setStore('isShowLoginHint', playLoad);
                state.isShowLoginHint = playLoad
            }
        },

         // 保存实名认证提示框的状态
         changeIsShowNameAuthHint(state, playLoad) {
            if (playLoad != 'null') {
                setStore('isShowNameAuthHint', playLoad);
                state.isShowNameAuthHint = playLoad
            }
        }
    },

    actions: {
        resetLoginState({ commit }) {
            commit('resetState')
        }
    }
}