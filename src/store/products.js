import { setStore, getStore } from '@/common/js/utils'
import { getDefaultProductsState } from '@/common/js/resetStore'
export default {
    state: getDefaultProductsState(),

    getters: {
        productsId: (state) => {
            state.productsId = getStore('productsId') ? getStore('productsId') : '';
            return state.productsId
        },

        orderId: (state) => {
            state.orderId = getStore('orderId') ? getStore('orderId') : '';
            return state.orderId
        },

        isPaying: (state)  => {
            state.isPaying = getStore('isPaying') ? getStore('isPaying') === 'false' ? false : true : false
            return state.isPaying
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

        //重置产品的store
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