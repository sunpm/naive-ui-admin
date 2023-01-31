import { createPinia } from 'pinia';
import { useAuthStore } from '@/store/modules'


const store = createPinia();

export function setupStore(app) {
  app.use(store);

  initStoreState();
}

export function initStoreState() {
  // 初始化用户信息
  useAuthStore().initUserInfo()
}

export { store };
