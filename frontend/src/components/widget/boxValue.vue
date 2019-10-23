<template>
    <div class="boxValue d-flex flex-column" :style="{backgroundColor:boxColor}">
        <div :style="{backgroundColor: buttonColor}"  class="label-button d-flex justify-content-between">
            <span  class="box-text">{{textBox}}: {{textSugerido ? textSugerido : 'Todos'}}</span>
            <button class="btn-box" data-target="#myModalDashboard" data-toggle="modal">
                <i :class="icon"></i>
            </button>
        </div>
        <div  class="div-text-value d-flex flex-column justify-content-start">
            
            <span class="box-value">Dia: <span class="moeda">R$</span>{{valueDia | toMoney}}</span>
            <span class="box-value"> Mês: <span class="moeda">R$</span>{{valueMes | toMoney}}</span>
            <span class="box-value">Ano: <span class="moeda">R$</span>{{valueAno | toMoney}}</span>
            <span class="box-value">Total: <span class="moeda">R$</span>{{valueTotal | toMoney}}</span>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        toMoney(valor) {
            return `${valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}`
        }
    },

    props: {
        valueDia: Number,
        valueMes: Number,
        valueAno: Number,
        valueTotal: Number,
        icon: String,
        textBox: String,
        buttonColor: String,
        boxColor: String,
        textSugerido: String,
    },

    computed: {
        
    }
}
</script>

<style >

.boxValue {
    display: flex;

    box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    border-radius:2px;
    margin: 10px 0px 5px 0px;
    color: #fff;
    
}

.label-button {
    padding: 3px;
}

.btn-box, .btn-box:enabled {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: inherit;
    border: none;
    outline: none;
    border-radius: 2px 0px 0px 2px;
    font-size: 20px;
    color: #0006;
}

.btn-box:hover {
    font-size: 22px;
}

.div-text-value {
    padding: 5px;
}

.div-text-value > .box-value {
    font-size: 18px;
    font-weight: 400;
}

.moeda {
    font-size: 12px;
}

</style>
