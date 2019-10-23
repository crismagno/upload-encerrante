import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null, //guarda os dados do usuário
        templateInvisible: false, //habilita ou desabilita o template 
        isMenuVisible: false, // habilitar ou desabilitar o menu
        titleHeader: '', // insere o titulo do header do template
        nameHeaderModal: '', //insere o header do modal do dashboard
        chartEscolha: 'Total'
    },

    mutations: {
        setUser(state, user){
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        },
        toggleMenu(state, isVisible){
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },

        showTemplate(state, show) {
            state.templateInvisible = show
        },

        changeTitle(state, title) {
            state.titleHeader = title
        }
    }
})
