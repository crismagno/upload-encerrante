<template>

        <router-link class="link" :to="caminho" >
            <i :class="icon"></i>
            {{name}}
        </router-link>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        caminho: '',
        icon: '',
        name: ''
    }
}
</script>

<style>

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
