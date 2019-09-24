import Vue from 'vue';
import VueRouter from 'vue-router';

import Encerrantes from "@/components/encerrante/Encerrantes";
import Dashboard from "@/components/dashboard/Dashboard";

Vue.use(VueRouter)

const routes = [{
    name: 'Encerrantes',
    path: '/Encerrantes',
    component: Encerrantes
}, {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
}]

export default new VueRouter({
    mode: 'history',
    routes //ou -> routes: routes 
})
