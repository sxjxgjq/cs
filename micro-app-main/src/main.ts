import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import microApp from '@micro-zoe/micro-app'

// SDK
const MAPS_ARR_SDK = [
  // 百度MAP_SDK
  '//api.map.baidu.com'
]

// JSONP
const MAPS_ARR_JSONP = [
  // 百度MAP
  'map.baidu.com',
  'dlswbr.baidu.com',
  'hm.baidu.com',
  'maponline0.bdimg.com'
]

/**
 * 如果函数返回 `true` 则忽略 script 和 link 标签的创建
 * @param {string} url
 * @returns boolean
 */
function MapExcludeCheckerHandler(url: string): boolean {
  return MAPS_ARR_SDK.some((item) => url.includes(item))
}

/**
 * 如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染
 * @param {string} url
 * @returns boolean
 */
function MapIgnoreCheckerHandler(url: string): boolean {
  return [...MAPS_ARR_SDK, ...MAPS_ARR_JSONP].some((item) => url.includes(item))
}

const microPluginMap = {
  // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建
  excludeChecker: MapExcludeCheckerHandler,
  // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染
  ignoreChecker: MapIgnoreCheckerHandler
}
// 设置为全局插件，作用于所有子应用
microApp.start({
  lifeCycles: {
    created(e, appName) {
      // console.log(`子应用${appName}被创建`)
    },
    beforemount(e, appName) {
      // console.log(`子应用${appName}即将渲染`)
    },
    mounted(e, appName) {
      // console.log(`子应用${appName}已经渲染完成`)
    },
    unmount(e, appName) {
      // console.log(`子应用${appName}已经卸载`)
    },
    error(e, appName) {
      // console.log(`子应用${appName}加载出错`)
    }
  },
  plugins: {
    global: [microPluginMap]
  }
})

microApp.preFetch([
  { name: 'vue3', url: 'http://localhost:3000/dialog', iframe: true },
  { name: 'vue3', url: 'http://localhost:3000', iframe: true }
])

// 或者设置为某个子应用的插件，只作用于当前子应用
// microApp.start({
//   plugins: {
//     modules: {
//       appName: [microPluginMap]
//     }
//   }
// })

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
