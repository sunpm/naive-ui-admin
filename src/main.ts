import {createApp} from 'vue'
import 'virtual:windi.css'
import pinia from '@/store'
import App from './App.vue'

const app = createApp(App)

app
  .use(pinia)
  .mount('#app')
