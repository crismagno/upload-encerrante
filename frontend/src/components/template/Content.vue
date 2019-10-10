<template>
    <div id="content">
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import { URL_ROOT, userKey } from '@/config/global'

export default {
    name: 'Conteudo',
    methods: {
        async validateToken() {
            this.validatingToken = true;

            const json = localStorage.getItem(userKey);
            const userData = JSON.parse(json);
            this.$store.commit("setUser", null);

            if (!userData) {
                this.validatingToken = false;
                this.$router.push({ name: "auth" });
                return;
            }
            if (userData) {
                this.$store.commit("showTemplate", true);
            }

            const res = await axios.post(`${URL_ROOT}/validateToken`, userData);

            if (res.data) {
                this.$store.commit("setUser", userData);
            } else {
                localStorage.removeItem(userKey);
                this.$router.push({ name: "auth" });
            }

            this.validatingToken = false;
        },
    }, 

    created() {
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.validateToken()
    }
}
</script>

<style>

#content {
    grid-area: content;
}

</style>