<template>
    <header id="header" >
        <a class="barras" href @click.prevent="toggleMenu()" >
            <i class="fa fa-angle-left" :class="icon"></i>
        </a>
        <h3>{{this.$store.state.titleHeader}}</h3>
        <a class="barras"  href @click.prevent="showHideDiv()" @mouseenter="showHideDiv()">
            <i class="fa fa-sign-out"></i>
        </a>
        <!-- abaixo a div sair de position: absolute -->
        <div class="config-sair"  v-if="showSair" @mouseleave="showHideDiv()">
            <a style="width: 100%" class="barras"  href @click.prevent="sair()">
                <span style="font-size: 17px">sair</span>
            </a>
        </div>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            showSair: false,
        }
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? 'fa fa-angle-down' : 'fa fa-angle-left'
        }
    },
    methods: {
        showHideDiv(){
            this.showSair = this.showSair ? false : true
        },

        toggleMenu() {
            this.$store.commit('toggleMenu')
        },

        sair() {
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style>

#header {
    grid-area: header;
    /* background-color: #546e7a; */
    background: linear-gradient(to left, #536976, #292e49);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
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

.config-sair {
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: #0004;
    top: 50px;
    right: 0px;
    width: 200px;
    height: 40px;
    z-index: 2;
}

/*====animations====*/

.config-sair {
    animation: showConfigSair 1s ease;
}

@keyframes showConfigSair {
    from {
        opacity: 0;
    } 
    to {
        opacity: 1;
    }
}

</style>
