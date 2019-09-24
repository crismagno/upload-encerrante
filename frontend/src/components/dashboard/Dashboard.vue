<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div v-for="(encerrante, i) in encerrantes" :key="i">
            <BoxValue :value="encerrante.INICIO_JORNADAS.HORARIO" />
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import { URL_ROOT } from "@/config/global";

import BoxValue from "@/components/widget/boxValue";

export default {
    name: 'Dashboard',
    components: { BoxValue },
    data() {
        return {
            encerrantes: []
        }
    },

    methods: {
        getEncerrantes() {
            const search = this.searchEncerrante ? `name=${this.searchEncerrante}` : ''
            axios.get(`${URL_ROOT}/upload?${search}`)
                .then(res => {
                    this.encerrantes = res.data
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response}))
        },
    },

    created() {
        this.getEncerrantes()
        console.log(this.encerrantes)
    }
}
</script>

<style>

</style>
