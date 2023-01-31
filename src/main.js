import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import { setupStore } from '@/store';

import router, {setupRouter} from "@/router";
import { setupNaiveDiscreteApi } from '@/plugins/index.js'


async function bootstrap() {
  const app = createApp(App)

  // 挂载状态管理
  setupStore(app);

  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi();

  // 挂载路由
  setupRouter(app);



  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();

  app.mount('#app')
}


void bootstrap()
