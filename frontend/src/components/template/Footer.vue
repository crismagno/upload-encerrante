<template>
    <footer id="footer">
        <span class="span-footer">Copyright&copy;<strong>Bem vindo!</strong> </span>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style>

#footer {
    grid-area: footer;
    background-color: #819ca9;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
}

.span-footer {
    margin-right: 10px;
}

</style>
