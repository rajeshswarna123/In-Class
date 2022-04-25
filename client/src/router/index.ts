import { createRouter, createWebHashHistory, createWebHistory, Router, RouteRecord, RouteRecordRaw } from "vue-router"

import Home from '../pages/Home.vue'
// import Messages from '../pages/Messages.vue'
import Generic from "../pages/Generic.vue"
import Login from "../pages/Login.vue"
import {useSession} from "../models/session";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: Generic, props: { title: 'About Page!' } },
  { path: '/contact', component: Generic, props: { title: 'Contact Page!' } },
  { path: '/login', component: Login },
  { path: '/signup', component: Generic, props: { title: 'Signup Page!' } },
  { path: '/wall/:handle?', component: () => import('../pages/Wall.vue') },
  { path: '/hidden', component: Generic, props: { title: 'You reached the hidden Page!' } },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router : Router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  linkActiveClass: "is-active",
})

router.beforeEach((to, form) =>{
    const session = useSession();

    if(session.destinationUrl == null && to.path != '/login') {
        session.destinationUrl = to.path;
    }
    console.log({ to });
    const protectedUrls = ['/messages', '/wall', '/feed', '/hidden'];
    console.log({ protectedUrls });

    if (protectedUrls.includes(to.path.toLowerCase())) { // list of paths that require login
      console.log('requires login');
        if (!session.user) {
            return '/login';
        }
    }
})

export default router;
