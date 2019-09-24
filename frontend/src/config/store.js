import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
    },

    mutations: {
        visibleMenu(state, isMenuVisible){
            state.isMenuVisible = !state.isMenuVisible
        },
    }
})
