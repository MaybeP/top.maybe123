import Vue from 'vue'
import Router from 'vue-router'
import shouye from '@/components/shouye'
import fenlei from '@/components/fenlei'
import tex from '@/components/tex'
import back from '@/components/back'
import zhuce from '@/components/zhuce'
import geren from '@/components/geren'
import tupian from '@/components/tupian'
import zuoze from '@/components/zuoze'
import write from '@/components/write'
import texttp from '@/components/texttp'
import shenhe from '@/components/shenhe'
import notfound from '@/components/notfound'
import result from '@/components/result_zuoze'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shouye',
      component: shouye,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/fenlei',
      name: 'fenlei',
      component: fenlei,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }},
    {
      path: '/tex',
      name: 'tex',
      component: tex,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/back',
      name: 'back',
      component: back,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/zhuce',
      name: 'zhuce',
      component: zhuce,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test,
    //   meta: {
    //     keepAlive: true, // 此组件需要被缓存
    //     isBack: false // 用于判断上一个页面是哪个
    //   }
    // },
    {
      path: '/geren',
      name: 'geren',
      component: geren,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/tupian',
      name: 'tupian',
      component: tupian,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/zuoze',
      name: 'zuoze',
      component: zuoze,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/write',
      name: 'write',
      component: write,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/texttp',
      name: 'texttp',
      component: texttp,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/shenhe',
      name: 'shenhe',
      component: shenhe,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: notfound,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack: false // 用于判断上一个页面是哪个
      }
    }

  ]
})
