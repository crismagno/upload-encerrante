<template>
    <div class="boxTeste d-flex flex-column">
        <div :style="corBtnIcon" class="div-btn-big" @click.prevent="btnEscolheChart()"
             >
             <!-- data-target="#myModalDashboard" data-toggle="modal" -->
            <i :class="icon"></i>
        </div>
        <div class="texts d-flex justify-content-end">
            <div class="valueContent d-flex flex-column align-items-end">
                <span class="textSmall">{{textSmall}}</span>
                <span class="textBig">{{textBig | toMoney}}</span>
            </div>
        </div>
        
        <div class="valueFooter">
            <a href @click.prevent="showDivInfo = !showDivInfo">
                <i :class="icon"></i>
                {{textFooter}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        toMoney(valor) {
            valor = valor ? valor : 0
            let valorConvertido = valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
            let newValorConvertido = valorConvertido.split(',')[0].replace('.', '')
            if (newValorConvertido.length > 4 && newValorConvertido.length < 7) {
                let removeFinal = newValorConvertido.split('')
                removeFinal.pop()
                removeFinal.pop()
                removeFinal.splice(removeFinal.length -1, 0, '.')
                removeFinal = removeFinal.join('')
                newValorConvertido = `R$ ${removeFinal}K`
                return newValorConvertido
            } else if (newValorConvertido.length > 6) {
                let removeFinal = newValorConvertido.split('')
                removeFinal.pop()
                removeFinal.pop()
                removeFinal.pop()
                removeFinal.pop()
                removeFinal.splice(removeFinal.length -2, 0, '.')
                removeFinal = removeFinal.join('')
                newValorConvertido = `R$ ${removeFinal}M`
                return newValorConvertido
            } 
            
            return `R$ ${valorConvertido}`
        }
    },
    props: {
        color1: String,
        color2: String,
        icon: String,
        textSmall: String,
        textBig: Number,
        textFooter: String,
        nameHeaderModal: String,
    },

    computed: {
        corBtnIcon() {
            return `background: linear-gradient(60deg, ${this.color1}, ${this.color2});`
        }
    },

    methods: {
        btnEscolheChart() {
            this.$store.state.chartEscolha = this.nameHeaderModal
        }
    }
}
</script>

<style>

.boxTeste {
    box-shadow: 0px 0px 3px 0px #0004;
    border-radius: 5px;
    background-color: #FFF;
    position: relative;
    margin: 20px 0px;
}

.div-btn-big {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 90px;
    border-radius: 3px;
    height: 90px;
    /* border: solid black 1px; */
    top:-20px;
    left: 15px;
    font-size: 25px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(255,152,0,.4);
    cursor: pointer;
}

.div-btn-big i {
    color: #fff;
}

.valueContent {
    /* border: 1px solid red; */
    box-sizing: border-box;
    width: 57%;
    padding: 10px 15px;
}

.textSmall {
    color: #0007;
    font-size: 16px;
    box-sizing: border-box;
}

.textBig {
    color: #0009;
    font-size: 30px;
}

.valueFooter {
    align-items: center;
    padding: 5px;
    margin: 10px 15px 10px 15px;
    border-top: 1px solid #0001;

}

.valueFooter a,  .valueFooter i {
    font-size: 13px;
    color: #0007;
    text-decoration: none;
}

</style>
