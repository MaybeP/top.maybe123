import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Axios from 'axios'
//import '@/my_theme/index.less'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueLazyLoad, {error: 'http://www.maybe123.top:888/image/self/err.jpg', loading: 'http://www.maybe123.top:888/image/self/loading.gif'})
// Vue.use(axios)
debugger;
Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach(function (to, from, next) {
  if (to.name === 'tex') {
    next()
    window.scrollTo(0, 0)
  } else if (to.name === 'back') {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (flag) {
      if (from.name === 'tex') { next() } else { next({name: 'shouye'}) }
    } else {
      next({name: 'shouye'})
    }
  } else if (to.name === 'zuoze') {
    if (sessionStorage.getItem('u_name') !== undefined) {
      next()
    } else {
      this.$Message.error('请先登录！')
    }
  }
  next()
})
