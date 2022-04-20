import Vue from 'vue'
import Router from 'vue-router'
import { setStore, getStore } from '@/common/js/utils.js'
import store from '@/store'
const Home = () =>
    import ('@/pages/Home')
const Login = () =>
    import ('@/pages/Login')
const WeixinLogin = () =>
    import ('@/pages/weixinLogin/WeixinLogin')
const MyInfo = () =>
    import ('@/pages/MyInfo')
const RealNameAuthentication = () =>
    import ('@/pages/realNameAuthentication/RealNameAuthentication')
const RealNameAythenticationCertified = () =>
    import ('@/pages/realNameAuthentication/RealNameAythenticationCertified')
const AccountSecurity = () =>
    import ('@/pages/accountSecurity/AccountSecurity')
const VerificationCode = () =>
    import ('@/pages/verification/VerificationCode')
const CollectionRecords = () =>
    import ('@/pages/collectionsRecords/CollectionRecords')
const SystemSet = () =>
    import ('@/pages/systemSet/SystemSet')
const WorkRoom = () =>
    import ('@/pages/workRoom/WorkRoom')    
const MyOrderForm = () =>
    import ('@/pages/myOrderForm/MyOrderForm')
const CollectionDetails = () =>
    import ('@/pages/digitalCollection/DigitalCollectionDetails')
const OrderFormDetails = () =>
    import ('@/pages/myOrderForm/OrderFormDetails')
const SystemMessage = () =>
    import ('@/pages/systemMessage/SystemMessage')
const OrderFormToPaid = () =>
    import ('@/pages/myOrderForm/OrderFormToPaid')    
const IndividualitySignature = () =>
    import ('@/pages/individualitySignature/IndividualitySignature')
const ChangeNickname = () =>
    import ('@/pages/changeNickname/ChangeNickname')    
Vue.use(Router)
let baseRoute = [{
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/myInfo',
        name: 'myInfo',
        component: MyInfo
    },
    {
        path: '/verificationCode',
        name: 'verificationCode',
        component: VerificationCode
    },
    {
        path: '/collectionDetails',
        name: 'collectionDetails',
        component: CollectionDetails
    },
    {
        path: '/weixinLogin',
        name: 'weixinLogin',
        component: WeixinLogin
    },
    {
        path: '/accountSecurity',
        name: 'accountSecurity',
        component: AccountSecurity
    },
    {
        path: '/myOrderForm',
        name: 'myOrderForm',
        component: MyOrderForm
    },
    {
        path: '/realNameAuthentication',
        name: 'realNameAuthentication',
        component: RealNameAuthentication
    },
    {
        path: '/realNameAythenticationCertified',
        name: 'realNameAythenticationCertified',
        component: RealNameAythenticationCertified
    },
    {
        path: '/collectionRecords',
        name: 'collectionRecords',
        component: CollectionRecords
    },
    {
        path: '/systemSet',
        name: 'systemSet',
        component: SystemSet
    },
    {
        path: '/systemMessage',
        name: 'systemMessage',
        component: SystemMessage
    },
    {
        path: '/individualitySignature',
        name: 'individualitySignature',
        component: IndividualitySignature
    },
    {
        path: '/changeNickname',
        name: 'changeNickname',
        component: ChangeNickname
    },
    {
        path: '/orderFormDetails',
        name: 'orderFormDetails',
        component: OrderFormDetails
    },
    {
        path: '/orderFormToPaid',
        name: 'orderFormToPaid',
        component: OrderFormToPaid
    },
    {
        path: '/workRoom',
        name: 'WorkRoom',
        component: WorkRoom
    }
];
let router = new Router({
    routes: baseRoute,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// router.beforeEach((to, from, next) => {
//     let login = getStore('isLogin');
//     let name = to.name;
//     if (name === 'login') {
//         if (login) {
//             next({ path: '/home' })
//         } else {
//             next()
//         }
//     } else {
//         if (login) {
//             next()
//         } else {
//             next({ path: '/' })
//         }
//     }
// });
export default router