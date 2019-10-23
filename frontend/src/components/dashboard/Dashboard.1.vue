<template>
    <div class="dashboardTeste">
        <DashboardModal :nameHeader="this.$store.state.nameHeaderModal" :resultadosModal="{}" />
        
        <!-- inicio do button config -->
        <div class="div-config-enc" :class="showHideDivConfig ? 'div-config-enc-show ' : 'div-config-enc-hide '">
            <button class="btn-config-enc" @click="showHideDivConfig = !showHideDivConfig">
                <i class="fa fa-cog"></i>
            </button>
            <div class="inputs-config d-flex flex-column justify-content-between p-2"> 
                <div class=" d-flex flex-column align-items-center mb-2">
                    <h6>{{h3Config}}</h6>      
                    <div class="input-group-sm d-flex flex-row align-items-center" v-if="escolhaRadio === 'Total'">
                        <input type="number" class="form-control " v-model="diaTotal"
                            max="31" min="1" placeholder="Dia...">
                        <input type="number" class="form-control ml-1" v-model="mesTotal"
                            max="12" min="1" placeholder="Mes...">
                        <input type="number" class="form-control ml-1" v-model="anoTotal"
                            max="2100" min="2010" placeholder="Ano...">
                    </div>
                    <div class="input-group-sm d-flex flex-row align-items-center" v-if="escolhaRadio === 'Linha'">
                        <input type="number" class="form-control " v-model="diaLinha"
                            max="31" min="1" placeholder="Dia...">
                        <input type="number" class="form-control ml-1" v-model="mesLinha"
                            max="12" min="1" placeholder="Mes...">
                        <input type="number" class="form-control ml-1" v-model="anoLinha"
                            max="2100" min="2010" placeholder="Ano...">
                    </div>
                    <div class="input-group-sm d-flex flex-row align-items-center" v-if="escolhaRadio === 'Carro'">
                        <input type="number" class="form-control " v-model="diaCarro"
                            max="31" min="1" placeholder="Dia...">
                        <input type="number" class="form-control ml-1" v-model="mesCarro"
                            max="12" min="1" placeholder="Mes...">
                        <input type="number" class="form-control ml-1" v-model="anoCarro"
                            max="2100" min="2010" placeholder="Ano...">
                    </div>
                    <input type="text" class="form-control mt-1" v-show="escolhaRadio === 'Linha'" v-model="Linha"
                         placeholder="Linha...">
                    <input type="text" class="form-control mt-1" v-show="escolhaRadio === 'Carro'" v-model="Carro" 
                         placeholder="Carro...">
                </div> 
                <hr>
                <div class="d-flex justify-content-center mt-2">
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input" 
                                value="Linha" v-model="escolhaRadio">Linha
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input"
                                value="Carro" v-model="escolhaRadio">Carro
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input"
                                value="Total" v-model="escolhaRadio">Total
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- fim Button Config ao lado direito-->
        
        <div class="container-fluid ">
            <div class="row p-1 m-0"><!-- Inicio das boxTeste -->
                <div class="Linha col-sm-12 col-md-6 col-lg-4 ">
                    <BoxTeste icon="fa fa-check" color1="#ffa726" color2="#fb8c00" 
                        :textSmall="`Linha: ${Linha || 'Todas'}`" 
                        :textBig="faturamentoLCTSugerida('dia', 'Linha')" 
                        textFooter="Config Linha" 
                        nameHeaderModal="Linha"/>
                </div>
                <div class="Carro col-sm-12 col-md-6 col-lg-4 ">
                    <BoxTeste icon="fa fa-bus" color1="#66bb6a" color2="#43a047"
                        :textSmall="`Carro: ${Carro || 'Todos'}`" 
                        :textBig="faturamentoLCTSugerida('dia', 'Carro')" 
                        textFooter="Config Carro"
                        nameHeaderModal="Carro" />
                </div>
                <div class="Total col-sm-12 col-md-12 col-lg-4 ">
                    <BoxTeste icon="fa fa-bars" color1="#26c6da" color2="#00acc1 "
                        textSmall="Total" 
                        :textBig="faturamentoLCTSugerida('dia', 'Total')" 
                        textFooter="Config Total"
                        nameHeaderModal="Total" />
                </div>
            </div><!-- Fim das boxTeste -->

            <div class="row p-0">
                <div class="graficos col-sm-12 col-md-12 col-lg-6 p-0 m-0">
                    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
                        <Grafico :options="chartOptionsAno" type="ColumnChart"
                            :chartData="faturamentoDiaOuAnosGraficoLinhaOuCarroTotal('anos', this.$store.state.chartEscolha)"  
                            :border="borderLeft" />
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
                        <Grafico :options="chartOptionsMes" type="LineChart"
                            :chartData="faturamentoDiaOuAnosGraficoLinhaOuCarroTotal('mes', this.$store.state.chartEscolha)"  
                            :border="borderLeft" />
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
                        <Grafico :options="chartOptionsDia" type="LineChart"
                            :chartData="faturamentoDiaOuAnosGraficoLinhaOuCarroTotal('dias', this.$store.state.chartEscolha)"  
                            :border="borderLeft" />
                    </div>
                 </div>
                 
                <!-- teste dos valores das linhas e colunas -->
                <div class="col-sm-12 col-lg-6" v-if="!showTablesLCT">
                    <div class="tableLinhasValores">
                         <div class="buttonsTableLinha d-flex justify-content-around">
                             <button class="btn btn-sm" title="mudar" @click="showTablesLCT = true">
                                <i class="fa fa-exchange"></i></button>
                             <button class="btn">{{LinhaTable || 'Geral'}} <i class="fa fa-check"></i></button>
                             <button class="btn" @click="LinhaTable = 'dia'">Dia</button>
                             <button class="btn" @click="LinhaTable = 'mes'">Mês</button>
                             <button class="btn" @click="LinhaTable = 'ano'">Ano</button>
                             <button class="btn" @click="LinhaTable = null">Geral</button>
                         </div>
                         <table class="table table-dark">
                             <thead>
                                 <tr>
                                    <th>Linha</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                             </thead>
                             <tbody>
                                 <tr v-for="(linhas, i) in LinhaCarroDiaMesAno(LinhaTable, 'Linha').agrupar" :key="i">
                                     <td>{{linhas[0]}}</td>
                                     <td>{{linhas[1] | toMoney}}</td>
                                     <td>{{`${diaLinha}/${mesLinha}/${anoLinha.toString().split('')[2]}${anoLinha.toString().split('')[3]}`}}</td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>
                     <!-- table carros valores -->
                    <div class="tableCarrosValores">
                         <div class="buttonsTableCarro d-flex justify-content-around">
                             <button class="btn">{{CarroTable || 'Geral'}} <i class="fa fa-check"></i></button>
                             <button class="btn" @click="CarroTable = 'dia'">Dia</button>
                             <button class="btn" @click="CarroTable = 'mes'">Mês</button>
                             <button class="btn" @click="CarroTable = 'ano'">Ano</button>
                             <button class="btn" @click="CarroTable = null">Geral</button>
                         </div>
                         <table class="table table-dark">
                             <thead>
                                 <tr >
                                    <th>Carro</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                             </thead>
                             <tbody>
                                 <tr v-for="(carros, i) in LinhaCarroDiaMesAno(CarroTable, 'Carro').agrupar" :key="i">
                                     <td>{{carros[0]}}</td>
                                     <td>{{carros[1] | toMoney}}</td>
                                     <td>{{`${diaCarro}/${mesCarro}/${anoCarro.toString().split('')[2]}${anoCarro.toString().split('')[3]}`}}</td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>
                </div>
                <!-- final do teste -->

                <!-- tabelas de faturamento por linha carro total maior e menor valor-->
                 <div class=" col-sm-12 col-lg-6 m-0" v-if="showTablesLCT">
                    <!-- table geral -->
                    <div class="tableGeral ">
                        <div class="buttonsTableGeral d-flex flex-row justify-content-around">
                            <button class="btn btn-sm" title="mudar" @click="showTablesLCT = false">
                                <i class="fa fa-exchange"></i></button>
                            <button class="btn"><i class="fa fa-bars"></i> Faturamento Total </button>
                            <div  style="width:200px;color: #fff;" 
                                class="input-group-sm  d-flex align-items-center justify-content-end">
                                Linha<input type="text" class="form-control ml-1 mr-1" v-model="Linha">
                                Carro <input type="text" class="form-control ml-1 " v-model="Carro">
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>N°</th>
                                    <th>Dia</th>
                                    <th>Mês</th>
                                    <th>Ano</th>
                                    <th>Data</th>
                                    <th>Geral</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total</td>
                                    <td>-----</td>
                                    <td>{{this.faturamentoLCTSugerida('dia', 'Total') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('mes', 'Total') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('ano', 'Total') | toMoney}}</td>
                                    <td>{{`${diaTotal}/${mesTotal}/${anoTotal.toString().split('')[2]}${anoTotal.toString().split('')[3]}`}}</td>
                                    <td>{{this.faturamentoLCTSugerida(null, 'Total') | toMoney}}</td>
                                </tr>
                                <tr class="alert-warning">
                                    <td>Linha</td>
                                    <td>{{Linha || '-----'}}</td>
                                    <td>{{this.faturamentoLCTSugerida('dia', 'Linha') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('mes', 'Linha') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('ano', 'Linha') | toMoney}}</td>
                                    <td>{{`${diaLinha}/${mesLinha}/${anoLinha.toString().split('')[2]}${anoLinha.toString().split('')[3]}`}}</td>
                                    <td>{{this.faturamentoLCTSugerida(null, 'Linha') | toMoney}}</td>
                                </tr>
                                <tr class="alert-success">
                                    <td>Carro</td>
                                    <td>{{Carro || '-----'}}</td>
                                    <td>{{this.faturamentoLCTSugerida('dia', 'Carro') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('mes', 'Carro') | toMoney}}</td>
                                    <td>{{this.faturamentoLCTSugerida('ano', 'Carro') | toMoney}}</td>
                                    <td>{{`${diaCarro}/${mesCarro}/${anoCarro.toString().split('')[2]}${anoCarro.toString().split('')[3]}`}}</td>
                                    <td>{{this.faturamentoLCTSugerida(null, 'Carro') | toMoney}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- table linha -->
                     <div class="tableLinha">
                         <div class="buttonsTableLinha d-flex justify-content-around">
                             <button class="btn">{{LinhaTable || 'Geral'}} <i class="fa fa-check"></i></button>
                             <button class="btn" @click="LinhaTable = 'dia'">Dia</button>
                             <button class="btn" @click="LinhaTable = 'mes'">Mês</button>
                             <button class="btn" @click="LinhaTable = 'ano'">Ano</button>
                             <button class="btn" @click="LinhaTable = null">Geral</button>
                         </div>
                         <table class="table">
                             <thead>
                                 <tr>
                                    <th>Sobre</th>
                                    <th>Linha</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td>{{'Maior'}} <i style="color: green" class="fa fa-caret-up ml-1"></i></td>
                                     <td>{{this.LinhaCarroDiaMesAno(LinhaTable, 'Linha').maior.nome}}</td>
                                     <td>{{this.LinhaCarroDiaMesAno(LinhaTable, 'Linha').maior.valor | toMoney}}</td>
                                     <td>{{`${diaLinha}/${mesLinha}/${anoLinha.toString().split('')[2]}${anoLinha.toString().split('')[3]}`}}</td>
                                 </tr>
                                 <tr class="alert-danger">
                                     <td>{{'Menor'}} <i style="color: red" class="fa fa-caret-down mr-1"></i></td>
                                     <td>{{this.LinhaCarroDiaMesAno(LinhaTable, 'Linha').menor.nome}}</td>
                                     <td>{{this.LinhaCarroDiaMesAno(LinhaTable, 'Linha').menor.valor | toMoney}}</td>
                                     <td>{{`${diaLinha}/${mesLinha}/${anoLinha.toString().split('')[2]}${anoLinha.toString().split('')[3]}`}}</td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>

                    <!-- table carro -->
                    <div class="tableCarro">
                        <div class="buttonsTableCarro d-flex justify-content-around">
                            <button class="btn">{{CarroTable || 'Geral'}} <i class="fa fa-bus"></i> </button>
                            <button class="btn" @click="CarroTable = 'dia'">Dia</button>
                            <button class="btn" @click="CarroTable = 'mes'">Mês</button>
                            <button class="btn" @click="CarroTable = 'ano'">Ano</button>
                            <button class="btn" @click="CarroTable = null">Geral</button>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                <th>Sobre</th>
                                <th>Carro</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>{{'Maior'}} <i style="color: green" class="fa fa-caret-up ml-1"></i></td>
                                    <td>{{this.LinhaCarroDiaMesAno(CarroTable, 'Carro').maior.nome}}</td>
                                    <td>{{this.LinhaCarroDiaMesAno(CarroTable, 'Carro').maior.valor | toMoney}}</td>
                                    <td>{{`${diaCarro}/${mesCarro}/${anoCarro.toString().split('')[2]}${anoCarro.toString().split('')[3]}`}}</td>
                                </tr>
                                <tr class="alert-danger">
                                    <td>{{'Menor'}} <i style="color: red" class="fa fa-caret-down mr-1"></i></td>
                                    <td>{{this.LinhaCarroDiaMesAno(CarroTable, 'Carro').menor.nome}}</td>
                                    <td>{{this.LinhaCarroDiaMesAno(CarroTable, 'Carro').menor.valor | toMoney}}</td>
                                    <td>{{`${diaCarro}/${mesCarro}/${anoCarro.toString().split('')[2]}${anoCarro.toString().split('')[3]}`}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div><!-- Fim da row gráficos -->
        </div> <!-- Fim do container-fluid -->
    </div>
</template>

<script>
import BoxValue from "@/components/widget/boxValue";
import BoxTeste from "@/components/widget/boxTeste";
import ButtonConfig from "./ButtonConfig";
import Pagetitle from "@/components/template/Pagetitle";
import DashboardModal from "./DashboardModal";
import Grafico from "./Grafico";

import  mixinDashboard from "./mixinDashboard";

export default {
    name: 'Dashboard',
    components: { BoxTeste, BoxValue, Pagetitle, DashboardModal, Grafico, ButtonConfig },
    mixins: [mixinDashboard],
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
} 
</script>

<style scoped>
.dashboardTeste {
    padding: 5px;
    background-color: #CCC6;
    height: 100%;
}

hr {
    margin: 0px;
    padding: 0px;
}

button.btn{
    outline: none;
}

.row {
    /* border: 1px solid red; */
    padding:35px 10px;
    margin: 0px;
    width: 100%;
    overflow: hidden;
}

/*======= btn-config-lateral ==========*/
.div-config-enc {
    position: fixed;
    width: 240px;
    background-color: #fff;
    /* box-shadow: 1px 1px 1px 2px #000; */
    box-shadow: -1px 0px 3px 0px #0004;
    z-index: 20;
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
    outline: none; 
}
.div-config-enc-show {
    top: 180px;
    right: 0px;
    animation: slideShow 0.4s ease;
}
.div-config-enc-hide {
    top: 180px;
    right: -245px;
    animation: slideHide 0.4s ease;
}

@keyframes slideShow {
    from {
        opacity: 0;
        transform: translateX(200px)
    }
    to {
        opacity: 1;
        transform: translateX(0)
    }
}
@keyframes slideHide {
    from {
        opacity: 1;
        transform: translateX(-200px)
    }
    to {
        opacity: 0;
        transform: translateX(0)
    }
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(200px)
    } 
    to {
        opacity: 1;
        transform: translateY(0px)
    }
}

.Linha {
    animation: slideShow 0.5s ease;
}
.Carro {
    animation: slideShow 1s ease;
}
.Total {
    animation: slideShow 1.5s ease;
}

.graficos, .tableCarro, .tableLinha, .tableGeral, .tableLinhasValores, .tableCarrosValores {
    animation: aparecer 1s linear;
}

/* estilo das tabelas*/

.tableCarro, .tableLinha, .tableGeral {
    background-color: #fff;
    border-radius: 3px;
    overflow-y: hidden;
    margin-bottom: 10px;
}

.tableLinhasValores, .tableCarrosValores {
    border-radius: 3px;
    overflow-x: hidden;
    margin-bottom: 10px;
    max-height: 290px;
}

.buttonsTableLinha, .buttonsTableCarro {
    position: sticky;
    top: 0px;
    border-radius: 3px 3px 0px 0px;
}

.buttonsTableGeral {
    background: linear-gradient(to right, #26c6da, #00acc1); 
}

.buttonsTableLinha {
    background: linear-gradient(to right, #ffa726, #fb8c00);
    
}
.buttonsTableCarro {
    background: linear-gradient(to right, #66bb6a, #43a047);
}

.buttonsTableCarro button, .buttonsTableLinha button, .buttonsTableGeral button {
    color: #fff;
    outline: none;
}

.buttonsTableCarro button:enabled, .buttonsTableLinha button:enabled {
    color: #fff;
    outline: none;
}


</style>
