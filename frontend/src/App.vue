<template>
	<div id="app" class="" 
		:class="[isMenuVisible ? 'hide-menu': 'app', {templateInvisible: !templateInvisible}]">
		<Header v-if="templateInvisible"/>
		<Menu :isMenuVisible="isMenuVisible" v-if="templateInvisible"/>
		<Content />
		<Footer v-if="templateInvisible"/>
        <InputFile v-if="templateInvisible"/>
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
    computed: mapState(['isMenuVisible', 'templateInvisible']),
}

</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Lato&display=swap'); */

*{
	/* font-family: 'Lato', sans-serif; */
    padding: 0px;
    margin: 0px;
}

body {
	margin: 0px;
	overflow-x: hidden;
}

.app {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 50px 1fr 40px;
	grid-template-areas: 
		'header header'
		'menu content'
		'menu footer';
	height: 100vh;
	
}
.hide-menu {
	display: grid;
	grid-template-columns: 50px 1fr;
	grid-template-rows: 50px 1fr 40px;
	grid-template-areas: 
		'header header '
		'menu content '
		'menu footer ';
	height: 100vh;
}

.templateInvisible {
	display: grid;
	grid-template-columns:  1fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'content';
	height: 100vh;
}

</style>
