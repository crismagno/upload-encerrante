<template>
    <div class="box-small d-flex flex-column justify-content-start" :style="[{borderLeft}]">
        <div class="box-small-header d-flex justify-content-center align-items-center">
            <h6 class="mr-2">{{textSugerido}}</h6>
            <h6 :class="icon" class="mt-1"></h6>
        </div>
        <div class=" d-flex flex-column justify-content-center">
            <div class="texto d-flex justify-content-center">
                <span :style="{color: colorTextValor}">{{textValor}}</span> 
            </div>

            <div class="val-jornada d-flex flex-column justify-content-center align-items-center mt-2">
                <span class="val-jornada-texto">Valor da Jornada</span>
                <span class="val-jornada-valor">
                    <span style="font-size: 10px;">R$</span>
                    {{valor | toMoney }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
        props: {
            icon: String,
            borderLeft: String,
            textSugerido: String,
            textValor: [Number, String],
            colorTextValor: String,
            valor: Number
        },
        filters: {
            toMoney(valor) {
                valor = valor ? valor : 0
                return `${valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}`
            }
    },

}
</script>

<style>

.box-small {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    background-color: #fff;
    border-radius: 2px;
    padding: 5px 4px;
    overflow: hidden;
    box-sizing: border-box;
    margin: 10px 0px 0px 0px;
}

.box-small-header {
    border-bottom: 1px solid #0002;
    color: #0009;
}

.texto span {
    font-size: 17px;
    font-weight: 400;
}

.val-jornada-texto {
    border-bottom: 1px solid #0002;
    color: #0009;
}

.val-jornada-valor {
    font-size: 22px;
    font-weight: 600;
}
</style>
