<template>
    <div class="box-small d-flex flex-column justify-content-start" :style="[{borderLeft}]">
        <div class="box-small-header d-flex justify-content-around align-items-center">
            <h6 :class="icon" class="mt-1"></h6>
            <h6>{{textSugerido}}</h6>
        </div>
        <div class=" d-flex flex-column justify-content-center">
            <div class="texto d-flex justify-content-center">
                <span>{{valor.linha}}</span> 
                <span style="margin: 0px 5px;"> - </span>
                <span>{{valor.carro}}</span>
            </div>

            <div class="val-jornada d-flex flex-column justify-content-center align-items-center mt-2">
                <span class="val-jornada-texto">Valor da Jornada</span>
                <span class="val-jornada-valor">
                        <span style="font-size: 10px;">R$</span>
                        {{valor.val_jornada | toMoney }}</span>
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
            valor: [Array, Object],
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
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
    background-color: #fff;
    border-radius: 2px;
    /* height: 130px; */
    padding: 5px 4px;
    overflow: hidden;
    box-sizing: border-box;
    margin: 10px 0px;
    /* width: 100%; */
}

.box-small-header {
    border-bottom: 1px solid #0002;
    color: #0009;
}

.texto span {
    font-size: 17px;
    font-weight: 400;
}

.texto span:nth-child(1) {
    color: #5e92f3;
}

.texto span:nth-child(3) {
    color: #ffad42;
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
