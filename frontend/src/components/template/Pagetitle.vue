<template>
    <div class="page-title">
        <h3>
            <i :class="icon"></i>
            {{title}}
        </h3>
        <h6>{{sub}}</h6>
        <hr>
    </div>
</template>

<script>
export default {
    aname: 'PageTitle',
    props: ['title', 'icon', 'sub' ]
}
</script>

<style>

</style>
