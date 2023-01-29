import {createApp} from 'vue'
import 'virtual:windi.css'
import pinia from '@/store'
import App from './App.vue'

import router, {setupRouter} from "./router";


async function bootstrap() {
  const app = createApp(App)

  // 挂载路由
  setupRouter(app);

  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();

  app
    .use(pinia)
    .mount('#app')
}


void bootstrap();
