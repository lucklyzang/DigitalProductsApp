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
const CollectionRecordsDetails = () =>
    import ('@/pages/collectionsRecordsDetails/CollectionsRecordsDetails')
const SystemSet = () =>
    import ('@/pages/systemSet/SystemSet')
const WorkRoom = () =>
    import ('@/pages/workRoom/WorkRoom')
const CancelAccount = () =>
    import ('@/pages/cancelAccount/CancelAccount')
const AboutUs = () =>
    import ('@/pages/aboutUs/AboutUs')    
const MyOrderForm = () =>
    import ('@/pages/myOrderForm/MyOrderForm')
const CollectionDetails = () =>
    import ('@/pages/digitalCollection/DigitalCollectionDetails')
const OrderFormDetails = () =>
    import ('@/pages/myOrderForm/OrderFormDetails')
const BlockchainAddress = () =>
    import ('@/pages/blockchainAddress/BlockchainAddress')
const SystemMessage = () =>
    import ('@/pages/systemMessage/SystemMessage')
const DonationFriend = () =>
    import ('@/pages/donationFriend/DonationFriend')
const OrderFormToPaid = () =>
    import ('@/pages/myOrderForm/OrderFormToPaid')
const IndividualitySignature = () =>
    import ('@/pages/individualitySignature/IndividualitySignature')
const ChangeNickname = () =>
    import ('@/pages/changeNickname/ChangeNickname')
Vue.use(Router)
let baseRoute = [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            index: 0
        }
    },
    {
        path: '/',
        redirect: '/home',
        meta: {
            index: 0
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            index: 0
        }
    },
    {
        path: '/myInfo',
        name: 'myInfo',
        component: MyInfo,
        meta: {
            index: 0
        }
    },
    {
        path: '/verificationCode',
        name: 'verificationCode',
        component: VerificationCode,
        meta: {
            index: 1
        }
    },
    {
        path: '/collectionDetails',
        name: 'collectionDetails',
        component: CollectionDetails,
        meta: {
            index: 1
        }
    },
    {
        path: '/weixinLogin',
        name: 'weixinLogin',
        component: WeixinLogin,
        meta: {
            index: 1
        }
    },
    {
        path: '/accountSecurity',
        name: 'accountSecurity',
        component: AccountSecurity,
        meta: {
            index: 1
        }
    },
    
    {
        path: '/myOrderForm',
        name: 'myOrderForm',
        component: MyOrderForm,
        meta: {
            index: 1
        }
    },
    {
        path: '/realNameAuthentication',
        name: 'realNameAuthentication',
        component: RealNameAuthentication,
        meta: {
            index: 2
        }
    },
    {
        path: '/realNameAythenticationCertified',
        name: 'realNameAythenticationCertified',
        component: RealNameAythenticationCertified,
        meta: {
            index: 2
        }
    },
    {
        path: '/collectionRecords',
        name: 'collectionRecords',
        component: CollectionRecords,
        meta: {
            index: 1
        }
    },
    {
        path: '/donationFriend',
        name: 'donationFriend',
        component: DonationFriend,
        meta: {
            index: 3
        }
    },
    {
        path: '/cancelAccount',
        name: 'cancelAccount',
        component: CancelAccount,
        meta: {
            index: 3
        }
    },
    {
        path: '/collectionRecordDetails',
        name: 'collectionRecordDetails',
        component: CollectionRecordsDetails,
        meta: {
            index: 2
        }
    },
    {
        path: '/systemSet',
        name: 'systemSet',
        component: SystemSet,
        meta: {
            index: 1
        }
    },
    {
        path: '/systemMessage',
        name: 'systemMessage',
        component: SystemMessage,
        meta: {
            index: 1
        }
    },
    {
        path: '/individualitySignature',
        name: 'individualitySignature',
        component: IndividualitySignature,
        meta: {
            index: 2
        }
    },
    {
        path: '/changeNickname',
        name: 'changeNickname',
        component: ChangeNickname,
        meta: {
            index: 2
        }
    },
    {
        path: '/orderFormDetails',
        name: 'orderFormDetails',
        component: OrderFormDetails,
        meta: {
            index: 2
        }
    },
    {
        path: '/blockchainAddress',
        name: 'blockchainAddress',
        component: BlockchainAddress,
        meta: {
            index: 1
        }
    },
    {
        path: '/orderFormToPaid',
        name: 'orderFormToPaid',
        component: OrderFormToPaid,
        meta: {
            index: 3
        }
    },
    {
        path: '/workRoom',
        name: 'WorkRoom',
        component: WorkRoom,
        meta: {
            index: 2
        }
    },
    {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs,
        meta: {
            index: 1
        }
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
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
};
export default router