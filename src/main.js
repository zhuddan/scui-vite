/* eslint-disable perfectionist/sort-imports */
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales'
import router from './router'
import scui from './scui'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.use(scui)

// 挂载app
app.mount('#app')
