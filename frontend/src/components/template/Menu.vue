<template>

    <div id="menu" v-if="!isMenuVisible">
        <router-link class="link" to="/dashboard" >
            <i class="fa fa-dashboard"></i>
            Dashboard
        </router-link>

        <router-link class="link" to="/encerrantes" >
            <i class="fa fa-file"></i>
            Encerrantes
        </router-link>
    </div>
    
</template>

<script>
export default {
    name: 'Menu',
    props: { isMenuVisible: Boolean }
}
</script>

<style>

#menu {
    grid-area: menu;
    background-color: #29434e;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
}

.link{
        padding: 10px 10px;
        color: #f4f4f4;
        font-size: 1.2em;
        border-bottom: 1px solid #fff2;
        width: 100%;
        text-align: start;
        font-weight: 400;
        letter-spacing: 1px;
}

.link:hover {
        background-color: #FFF2; 
        color: #f4f4f4;
        text-decoration: none;
}

.link:enabled {
    text-decoration: none;
    color: #f4f4f4;
}


</style>
