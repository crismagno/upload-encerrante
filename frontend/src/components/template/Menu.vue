<template>

    <!-- <div id="menu" v-if="!isMenuVisible"> -->
    <aside id="menu" class="menu d-flex flex-column" :class="isMenuVisible ? 'menuMini' : 'menuShow'" >
        <router-link class="link" to="/dashboard" >
            <i class="fa fa-dashboard"></i>
            <span class="ml-1" v-if="!isMenuVisible" >Dashboard</span>
        </router-link>
        <router-link class="link" to="/dashboardTeste" >
            <i class="fa fa-dashboard"></i>
            <span class="ml-1" v-if="!isMenuVisible" >Dashboard Teste</span>
        </router-link>

        <router-link class="link" to="/encerrantes" >
            <i class="fa fa-file"></i>
            <span class="ml-1" v-if="!isMenuVisible" >Encerrantes</span>
        </router-link>
    </aside>
    
</template>

<script>
export default {
    name: 'Menu',
    props: { isMenuVisible: Boolean },
}
</script>

<style>

#menu {
    grid-area: menu;
    /* background-color: #29434e; */
    background: linear-gradient(to left, #465964, #292e49);
}

.link{
        padding: 10px 10px;
        color: #f4f4f4;
        font-size: 1.2em;
        border-bottom: 1px solid #fff2;
        width: 100%;
        /* text-align: center; */
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

.menuMini {
    text-align: center;
    animation: menuMini 1s ease;
}
.menuShow {
    animation: menuShow 1s ease;
}

@keyframes menuMini {
	from {
		/* opacity: 0; */
		transform: translateX(-50px);
	} 
	to {
		/* width: 5;0px; */
		transform: translateX(0px);
	}
}
@keyframes menuShow {
	from {
		transform: translateX(-100px);
	} 
	to {
		transform: translateX(0px);
	}
}

</style>
