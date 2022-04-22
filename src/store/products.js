import { setStore, getStore} from '@/common/js/utils'
export default {
  state:{
    productsId: '', //作品id
    orderId: '', //订单id
  },

  getters:{
    productsId : (state) => {
      state.productsId = getStore('productsId');
      return state.productsId
    },

    orderId : (state) => {
      state.orderId = getStore('orderId');
      return state.orderId
    }
  },

  mutations:{
    // 保存作品id
    changeProductsId (state, playLoad) {
      if (playLoad && playLoad != 'null') {
        setStore('productsId',playLoad);
        state.productsId = playLoad
      }
    },

    // 保存订单id
    changeOrderId (state, playLoad) {
      if (playLoad && playLoad != 'null') {
        setStore('orderId',playLoad);
        state.orderId = playLoad
      }
    }
  },

  actions:{}
}