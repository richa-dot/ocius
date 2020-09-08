import Router from "vue-router";

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Routes = new Router({
    mode: "history",
    fallback: true,
    routes: [
        {
            path: "/",
            name: "users",
            component: () => import(/* webpackChunkName: "user-list" */ "@/components/UserList.vue"),
            meta: { requiresAuth: false }
        },
        {
            path: "/updateUser",
            name: "users",
            component: () => import(/* webpackChunkName: "user-list" */ "@/components/updateUser/UpdateUser.vue"),
            meta: { requiresAuth: false }
        }
    ]
});



export default Routes;