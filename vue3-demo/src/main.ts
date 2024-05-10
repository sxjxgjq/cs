import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'

highcharts3d(highcharts)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#vue3')
