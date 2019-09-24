<template>
    <div id="content">
        <router-view></router-view>
    </div>
</template>

<script>

import axios from "axios";
export default {
    name: 'Conteudo',
    created() {
        this.$router.push({ path: "Encerrantes" });
    }
}
</script>

<style>

#content {
    grid-area: content;
    padding: 10px;
}

</style>