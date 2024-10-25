import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import { storeToRefs } from 'pinia';
import routes from './routes';
import { useAuthStore } from '../stores/auth-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // eslint-disable-next-line consistent-return
  Router.beforeEach((to) => {
    const authStore = useAuthStore();
    const { getUser } = storeToRefs(authStore);
    const isLoggedIn = () => !!getUser.value;

    if ((to.path === '/login' || to.path === '/') && isLoggedIn()) return { name: 'me' };

    if (
      !isLoggedIn()
      && to.meta.requiresAuth
      && !Object.keys(to.query).includes('fromEmail')
    ) return { name: 'login' };
  });

  return Router;
});
