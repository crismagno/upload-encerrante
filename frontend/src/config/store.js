import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        templateInvisible: false,
        isMenuVisible: false,
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
        visibleMenu(state, isMenuVisible){
            state.isMenuVisible = !state.isMenuVisible
        },

        showTemplate(state, show) {
            state.templateInvisible = show
        }
    }
})
