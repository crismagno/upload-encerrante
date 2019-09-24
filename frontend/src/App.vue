<template>
	<div id="app" :class="{'hide-menu' : isMenuVisible}">
		<Header />
		<Menu :isMenuVisible="isMenuVisible"/>
		<Content />
		<Footer />
        <InputFile />
	</div>
</template>

<script>
import { mapState } from "vuex";

import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import InputFile from "@/components/widget/inputFile";

export default {
	name: 'App',
	components: { Header, Menu, Content, Footer, InputFile },
    computed: mapState(['isMenuVisible']),
}

</script>

<style>
*{
    padding: 0px;
    margin: 0px;
}

body {
	margin: 0px;
}

#app {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 50px 1fr 40px;
	grid-template-areas: 
		'header header'
		'menu content'
		'menu footer';
	height: 100vh;
}
#app.hide-menu {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 50px 1fr 40px;
	grid-template-areas: 
		'header header'
		'content content'
		'footer footer';
	height: 100vh;
}

</style>
