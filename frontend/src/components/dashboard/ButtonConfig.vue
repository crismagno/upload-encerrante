<template>
    <div class="div-config-enc" :class="showHideDivConfig ? 'div-config-enc-show ' : 'div-config-enc-hide '">
        <button class="btn-config-enc" @click="showHideDivConfig = !showHideDivConfig">
            <i class="fa fa-cog"></i>
        </button>
        <div class="inputs-config">
            <div :style="{borderLeft: '3px solid #ffff5a'}" class="formulario-data d-flex justify-content-between">
                <div class="input-group-sm d-flex  flex-column justify-content-around mr-1">
                    <h6>Linha</h6>  
                    <input type="number" class="form-control mb-1" v-model="diaLinha"
                        max="31" min="1" placeholder="Dia...">
                    <input type="number" class="form-control mb-1" v-model="mesLinha"
                        max="12" min="1" placeholder="Mes...">
                    <input type="number" class="form-control mb-1" v-model="anoLinha"
                        max="2100" min="2010" placeholder="Ano...">
                    <input type="text" class="form-control " v-model="Linha"
                        placeholder="Linha...">
                </div>
                <div class="input-group-sm d-flex  flex-column justify-content-around mr-1"> 
                    <h6>Carro</h6>     
                    <input type="number" class="form-control mb-1" v-model="diaCarro"
                        max="31" min="1" placeholder="Dia...">
                    <input type="number" class="form-control mb-1" v-model="mesCarro"
                        max="12" min="1" placeholder="Mes...">
                    <input type="number" class="form-control mb-1" v-model="anoCarro"
                        max="2100" min="2010" placeholder="Ano...">
                    <input type="text" class="form-control " v-model="Carro"
                        placeholder="Carro...">
                </div>
                <div style="width: 170px;" class="input-group-sm d-flex flex-column ">
                    <h6>Total</h6>      
                    <input type="number" class="form-control mb-1" v-model="diaTotal"
                        max="31" min="1" placeholder="Dia...">
                    <input type="number" class="form-control mb-1" v-model="mesTotal"
                        max="12" min="1" placeholder="Mes...">
                    <input type="number" class="form-control mb-1" v-model="anoTotal"
                        max="2100" min="2010" placeholder="Ano...">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showHideDivConfig: false
        }
    }
}
</script>

<style>

.div-config-enc {
    position: fixed;
    /* border: 1px solid blue; */
    width: 240px;
    /* height: 300px; */
    background-color: #fff;
    box-shadow: 0px 0px 3px 0px #0004;
    z-index: 1;
}
.div-config-enc-show {
    top: 180px;
    right: 0px;
}
.div-config-enc-hide {
    top: 180px;
    right: -245px;
}

.btn-config-enc {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 1px solid #0001;
    width: 60px;
    border-radius: 5px 0px 0px 5px;
    height: 50px;
    left: -60px;
    background-color: #0004;
    color: #fff;
    font-size: 32px;
    outline: none;
}

.btn-config-enc:hover {
    color: #0005;
    outline: none;
}

.btn-config-enc:enabled {
    /* color: #fff;   */
    outline: none; 
}

</style>
