import VueRouter from "vue-router";

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import TodosPage from '../pages/TodoPage'
import Settings from '../pages/Settings'
import Vue from "vue";


Vue.use(VueRouter);

//Paths
const routes = [
    {
        path: '/',
        component: HomePage,
        meta: {requiredAuth: true}
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/todos',
        component: TodosPage,
        meta: {requiredAuth: true},
    },
    {
        path: '/settings',
        component: Settings,
        meta: {requiredAuth: true}
    },
    {
        path: '*',
        redirect: '/',
    }
];


export const router = new VueRouter({
    routes,
});

router.beforeResolve((to, from, next) => {
    if (to.meta.requiredAuth) {
        if (window.localStorage.getItem('access_token'))
            next();
        else
            next('login')
    } else
        next()
});


