<template>
    <div id="footer">
        <span class="span-footer">Copyright&copy;<strong>Bem vindo!</strong> </span>
    </div>
</template>

<script>
export default {
    name: 'Rodape',
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
