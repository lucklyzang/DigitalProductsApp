import { setStore, getStore} from '@/common/js/utils'
export default {
 
  getDefaultState: () => {
    return {
      userInfo: null, //用户信息
      isLogin: false, //是否登录
      token: null //请求token
    }
  },

  state:{
    userInfo: null, //用户信息
    isLogin: false, //是否登录
    token: null //请求token
  },

  getters:{
    userInfo : (state) => {
      state.userInfo = JSON.parse(getStore('userInfo'));
      return state.userInfo
    },

    token : (state) => {
      state.token = getStore('token');
      return state.token
    },

    isLogin: (state) => {
      state.isLogin = getStore('isLogin') === 'false' ? false : true;
      return state.isLogin
    }
  },

  mutations:{

    // 保存用户信息
    storeUserInfo (state, playLoad) {
      if (playLoad && playLoad != 'null') {
        setStore('userInfo',playLoad);
        state.userInfo = playLoad
      }  
    },

    // 保存token
    changeToken (state, playLoad) {
      if (playLoad && playLoad != 'null') {
        setStore('token',playLoad);
        state.token = playLoad
      }
    },

    // 保存用户登录状态
    changeIsLogin (state, playLoad) {
      if (playLoad != 'null') {
        setStore('isLogin',playLoad);
        state.isLogin = playLoad
      }
    }
  },

  actions:{}
}