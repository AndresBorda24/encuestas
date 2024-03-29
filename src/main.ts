import '@/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import formConfig from '../formkit.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, formConfig)

app.mount('#app')
