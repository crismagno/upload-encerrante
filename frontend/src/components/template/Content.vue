<template>
    <div id="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Conteudo',
    created() {
        this.$router.push({ path: "Dashboard" });
    }
}
</script>

<style>

#content {
    grid-area: content;
}

</style>