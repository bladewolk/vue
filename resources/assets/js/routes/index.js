import VueRouter from "vue-router";

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import TodosPage from '../pages/TodoPage'

//Paths
const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/todos', component: TodosPage},
    {path: '*', redirect: '/'}
]


export const router = new VueRouter({
    routes,
})


