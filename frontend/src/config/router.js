import Vue from 'vue';
import VueRouter from 'vue-router';

import Encerrantes from "@/components/encerrante/Encerrantes";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardTeste from "@/components/dashboard/Dashboard.1";
import Auth from "@/components/user/Auth";

Vue.use(VueRouter)

const routes = [{
    name: 'Encerrantes',
    path: '/Encerrantes',
    component: Encerrantes
}, {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
}, {
    name: 'auth',
    path: '/',
    component: Auth
}, {
    name: 'DashboardTeste',
    path: '/DashboardTeste',
    component: DashboardTeste
}]

export default new VueRouter({
    mode: 'history',
    routes //ou -> routes: routes 
})
