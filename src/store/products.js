import { setStore, getStore } from '@/common/js/utils'
import { getDefaultProductsState } from '@/common/js/resetStore'
export default {
    state: getDefaultProductsState(),

    getters: {
        productsId: (state) => {
            state.productsId = getStore('productsId') ? JSON.parse(getStore('productsId')) : null;
            return state.productsId
        },

        swipeItemDetails: (state) => {
            state.swipeItemDetails = getStore('swipeItemDetails') ? JSON.parse(getStore('swipeItemDetails')) : null;
            return state.swipeItemDetails
        },

        inviteMessage: (state) => {
            state.inviteMessage = getStore('inviteMessage') ? JSON.parse(getStore('inviteMessage')) : null;
            return state.inviteMessage
        },
        
        orderId: (state) => {
            state.orderId = getStore('orderId') ? getStore('orderId') : '';
            return state.orderId
        },

        systemMessageId: (state) => {
            state.systemMessageId = getStore('systemMessageId') ? getStore('systemMessageId') : '';
            return state.systemMessageId
        },

        isPaying: (state)  => { 
            state.isPaying = getStore('isPaying') ? getStore('isPaying') === 'false' ? false : true : false
            return state.isPaying
        },

        isIosPaySuccess: (state)  => { 
            state.isIosPaySuccess = getStore('isIosPaySuccess') ? getStore('isIosPaySuccess') === 'false' ? false : true : false
            return state.isIosPaySuccess
        },

        isRefreshHomePage: (state) => {
            state.isRefreshHomePage = getStore('isRefreshHomePage') ? getStore('isRefreshHomePage') === 'false' ? false : true : false
            return state.isRefreshHomePage
        },

        isCanSendPhoneCode: (state)  => {
            state.isCanSendPhoneCode = getStore('isCanSendPhoneCode') ? getStore('isCanSendPhoneCode') === 'false' ? false : true : true
            return state.isCanSendPhoneCode
        },

        collectionId: (state)  => {
            state.collectionId = getStore('collectionId') ? JSON.parse(getStore('collectionId')) : null
            return state.collectionId
        },

        myObjects: (state)  => {
            state.myObjects = getStore('myObjects') ? JSON.parse(getStore('myObjects')) : []
            return state.myObjects
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

        isEnterDonationFriendPage: (state)  => {
            state.isPaying = getStore('isEnterDonationFriendPage') ? getStore('isEnterDonationFriendPage') === 'false' ? false : true : false
            return state.isEnterDonationFriendPage
        },

        isEnterCollectionsRecordsDetailsPage: (state)  => {
            state.isPaying = getStore('isEnterCollectionsRecordsDetailsPage') ? getStore('isEnterCollectionsRecordsDetailsPage') === 'false' ? false : true : false
            return state.isEnterCollectionsRecordsDetailsPage
        },

        isEnterLoginPageSource: (state)  => {
            state.isEnterLoginPageSource = getStore('isEnterLoginPageSource') ? getStore('isEnterLoginPageSource') : ''
            return state.isEnterLoginPageSource
        },

        isEnterMyObjectDetailsPageSource: (state)  => {
            state.isEnterMyObjectDetailsSource = getStore('isEnterMyObjectDetailsPageSource') ? getStore('isEnterMyObjectDetailsPageSource') : ''
            return state.isEnterMyObjectDetailsPageSource
        },

        isEnterCollectionsRecordsDetailsPageSource: (state)  => {
            state.isEnterCollectionsRecordsDetailsPageSource = getStore('isEnterCollectionsRecordsDetailsPageSource') ? getStore('isEnterCollectionsRecordsDetailsPageSource') : ''
            return state.isEnterCollectionsRecordsDetailsPageSource
        },

        collectTransferCodeMessage: (state)  => {
            state.collectTransferCodeMessage = getStore('collectTransferCodeMessage') ? JSON.parse(getStore('collectTransferCodeMessage')) : []
            return state.collectTransferCodeMessage
        },
        hallMessage: (state)  => {
            state.hallMessage = getStore('hallMessage') ? JSON.parse(getStore('hallMessage')) : {
                hallType: '',
                hallTemplate: '',
                hallExhibitsList: [],
                hallTheme: '',
                hallThemePath: '',
                hallIntroduce: ''
            };
            return state.hallMessage
        },
        queryHallMessage: (state) => {
            state.queryHallMessage = getStore('queryHallMessage') ? JSON.parse(getStore('queryHallMessage')) : null
            return state.queryHallMessage
        }
    },

    mutations: {
        // ????????????id
        changeProductsId(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('productsId', playLoad);
                state.productsId = playLoad
            }
        },

        // ????????????id
        changeOrderId(state, playLoad) {
            if (playLoad && playLoad != 'null') {
                setStore('orderId', playLoad);
                state.orderId = playLoad
            }
        },

        // ?????????????????????????????????
        changeIsRefreshHomePage (state, playLoad) {
            setStore('isRefreshHomePage', playLoad);
            state.isRefreshHomePage = playLoad
        },

        // ??????????????????????????????
        changeInviteMessage (state,playLoad) {
            setStore('inviteMessage', playLoad);
            state.inviteMessage = playLoad
        },

        // ??????????????????
        changeIsPaying(state, playLoad) {
            setStore('isPaying', playLoad);
            state.isPaying = playLoad
        },

        // ????????????????????????????????????
        changeIsIosPaySuccess(state, playLoad) {
            setStore('isIosPaySuccess', playLoad);
            state.isIosPaySuccess = playLoad
        },

        // ??????????????????id
        changeSystemMessageId(state, playLoad) {
            setStore('systemMessageId', playLoad);
            state.systemMessageId = playLoad
        },

        // ????????????id??????
        changeCollectionId(state, playLoad) {
            setStore('collectionId', playLoad);
            state.collectionId = playLoad
        },

        // ????????????????????????
        changeMyObjects(state, playLoad) {
            setStore('myObjects', playLoad);
            state.myObjects = playLoad
        },

        // ???????????????????????????
        changeDonationProductDetails(state, playLoad) {
            setStore('donationProductDetails', playLoad);
            state.donationProductDetails = playLoad
        },

        // ????????????????????????????????????????????????
        changeIsCanSendPhoneCode(state, playLoad) {
            setStore('isCanSendPhoneCode', playLoad);
            state.isCanSendPhoneCode = playLoad
        },

        // ???????????????????????????
        changeCountdownTime(state, playLoad) {
            setStore('countdownTime', playLoad);
            state.countdownTime = playLoad
        },

        // ?????????????????????????????????????????????
        changeIsEnterVerificationCodePage(state, playLoad) {
            setStore('isEnterVerificationCodePage', playLoad);
            state.isEnterVerificationCodePage = playLoad
        },

         // ???????????????????????????????????????
         changeIsEnterLoginPageSource(state, playLoad) {
            setStore('isEnterLoginPageSource', playLoad);
            state.isEnterLoginPageSource = playLoad
        },
        
        //?????????????????????????????????????????????
        changeIsEnterDonationFriendPage(state, playLoad) {
            setStore('isEnterDonationFriendPage', playLoad);
            state.isEnterDonationFriendPage = playLoad
        },

        //?????????????????????????????????????????????
        changeIsEnterCollectionsRecordsDetailsPage (state, playLoad) {
            setStore('isEnterCollectionsRecordsDetailsPage', playLoad);
            state.isEnterCollectionsRecordsDetailsPage = playLoad
        },
        
        // ????????????????????????????????????????????????
        changeIsEnterCollectionsRecordsDetailsPageSource(state, playLoad) {
            setStore('isEnterCollectionsRecordsDetailsPageSource', playLoad);
            state.isEnterCollectionsRecordsDetailsPageSource = playLoad
        },

        // ??????????????????????????????????????????
        changeIsEnterMyObjectDetailsPageSource (state, playLoad) {
            setStore('isEnterMyObjectDetailsPageSource', playLoad);
            state.isEnterMyObjectDetailsPageSource = playLoad
        },

        // ????????????????????????????????????????????????60s?????????
        changeCollectTransferCodeMessage(state, playLoad) {
            setStore('collectTransferCodeMessage', playLoad);
            state.collectTransferCodeMessage = playLoad
        }, 

        // ?????????????????????
        changeHallMessage(state, playLoad) {
            setStore('hallMessage', playLoad);
            state.hallMessage = playLoad
        },

        //???????????????????????????
        changeQueryHallMessage(state, playLoad) {
            setStore('queryHallMessage', playLoad);
            state.queryHallMessage = playLoad
        },

        // ?????????????????????
        changeSwipeItemDetails(state, playLoad) {
            setStore('swipeItemDetails', playLoad);
            state.swipeItemDetails = playLoad
        },

        //?????????????????????
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