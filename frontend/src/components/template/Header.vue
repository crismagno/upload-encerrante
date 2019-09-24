<template>
    <div id="header">
        <a class="barras" href @click.prevent="desabilitarMenu" >
            <i class="fa fa-angle-left" :class="icon"></i>
        </a>
        <h3>Encerrantes</h3>
        <a class="barras"  href @click.prevent="">
            <i class="fa fa-angle-down"></i>
        </a>
    </div>
</template>

<script>

export default {
    name: 'Header',
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? 'fa fa-angle-down' : 'fa fa-angle-left'
        }
    },
    methods: {
        desabilitarMenu() {
            this.$store.commit('visibleMenu')
        }
    }
}
</script>

<style>

#header {
    grid-area: header;
    background-color: #546e7a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    /* padding: 0px 10px; */
}

.barras {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: #fff;
    font-size: 25px;
    width: 50px;
}

.barras:hover {
    color: #fff;
    text-decoration: none;
    background-color: #0003;
}

</style>
