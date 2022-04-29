import Vue from 'vue'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Vant from 'vant';
import 'vant/lib/index.css';
import moment from 'moment'
import { setStore, getStore, IsPC } from '@/common/js/utils.js'
import echarts, { init } from 'echarts'
if (process.env.NODE_ENV == 'development') {
    Vue.config.devtools = true;
} else {
    Vue.config.devtools = false;
};
Vue.prototype.$echarts = echarts
Vue.prototype.Base64 = require('js-base64').Base64;
// 全局挂载时间格式化方法
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});
Vue.prototype.$moment = moment;
// 全局挂载监听设备物理返回按键的方法
function gotoURL(callback) {
    window.onpopstate = null;
    window.onpopstate = function() {
        callback()
    }
}
Vue.prototype.gotoURL = gotoURL;
//初始化样式
import './common/stylus/index.less'
//移动端适配
import 'lib-flexible/flexible.js'
import App from './App'
let options = {
    fullscreenEl: false
};
// vue剪切板功能
Vue.use(VueClipboard);
Vue.use(Vant);
Vue.config.productionTip = false;
if (IsPC()) {
    // Vue.use(new VueSocketIO({
    //    debug: true,
    //    connection: 'http://localhost:10001'
    // }))
};

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    created() {},
    template: '<App/>'
});