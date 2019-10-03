<template>
    <div class="dashboard">
        <Pagetitle title="Dashboard" icon="fa fa-industry" sub="Dashboard V.01" />
        <DashboardModal />
        <h4 style="margin-left: 10px;">Faturamento <span style="font-size: 14px">Por: Linha/Carro/Total</span></h4>
        
        <div class="row ml-1">
            <div class="boxes-left d-flex flex-column col-xs-12 col-lg-3" >
                <BoxValue textBox="Linha" icon="fa fa-check" buttonColor="#1565c0" boxColor="#5e92f3" 
                    :textSugerido="Linha"
                    :valueDia="encerranteLCTSugerida('dia', 'Linha')" 
                    :valueMes="encerranteLCTSugerida('mes', 'Linha')" 
                    :valueAno="encerranteLCTSugerida('ano', 'Linha')"
                    :valueTotal="encerranteLCTSugerida(null, 'Linha')"
                    />

                <BoxValue textBox="Carro" icon="fa fa-car" buttonColor="#f57c00" boxColor="#ffad42" 
                    :textSugerido="Carro"
                    :valueDia="encerranteLCTSugerida('dia', 'Carro')"
                    :valueMes="encerranteLCTSugerida('mes', 'Carro')" 
                    :valueAno="encerranteLCTSugerida('ano', 'Carro')"
                    :valueTotal="encerranteLCTSugerida(null, 'Carro')"
                    />
                <BoxValue textBox="Total" icon="fa fa-bars" buttonColor="#64dd17" boxColor="#9cff57"
                    :valueDia="encerranteLCTSugerida('dia', 'Total')"
                    :valueMes="encerranteLCTSugerida('mes', 'Total')" 
                    :valueAno="encerranteLCTSugerida('ano', 'Total')"
                    :valueTotal="encerranteLCTSugerida(null, 'Total')"
                    />
            </div>
            <div class="col-xs-12 col-lg-6 ">
                <div class="div-grafico dados-faturamento col-lg-12">
                    <Grafico :chartData="faturamentoAnoGrafico()"  :options="chartOptionsAno" type="ColumnChart"/>
                </div>
                <div class="div-grafico dados-faturamento col-lg-12">
                    <Grafico :chartData="faturamentoMesGrafico()"  :options="chartOptionsMes" type="LineChart"/>
                </div>
            </div>

            <div class="boxes-right d-flex flex-column col-xs-12 col-lg-3 ">
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
            
                <BoxSmall borderLeft="3px solid #5e92f3" icon="fa fa-arrow-up" 
                    textSugerido="Linha - Carro / Maior" :valor="maiorMenorLinhaCarroDia().maior" />
                <BoxSmall borderLeft="3px solid #ffad42" icon="fa fa-arrow-down"
                    textSugerido="Linha - Carro / Menor" :valor="maiorMenorLinhaCarroDia().menor" />
            </div>

        </div>               
    </div>
</template>

<script>
import axios from 'axios'
import { URL_ROOT } from "@/config/global";

import BoxValue from "@/components/widget/boxValue";
import BoxSmall from "@/components/widget/boxSmall";
import Pagetitle from "@/components/template/Pagetitle";
import DashboardModal from "./DashboardModal";
import Grafico from "./Grafico";

export default {
    name: 'Dashboard',
    components: { BoxValue, BoxSmall, Pagetitle, DashboardModal, Grafico  },
    data() {
        return {
            encerrantes: [],
            diaLinha: new Date().getDate(),
            mesLinha: new Date().getMonth() + 1,
            anoLinha: new Date().getUTCFullYear(),
            //---------
            diaCarro: new Date().getDate(),
            mesCarro: new Date().getMonth() + 1,
            anoCarro: new Date().getUTCFullYear(),
            //---------
            diaTotal: new Date().getDate() +7,
            mesTotal: new Date().getMonth() + 1 - 4,
            anoTotal: new Date().getUTCFullYear(),
            Linha: '',
            Carro: '',

            // chartDataAno: [],
            // chartDataMes: [],

            chartOptionsAno: {
                title: 'Faturamento Encerrantes Ano',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                width:320,
                height:200
            },
            chartOptionsMes: {
                title: 'Faturamento Encerrantes Mês',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                width:520,
                height:200
            },

            box1: 'teste',
        }
    },

    methods: {

        //==========grafico ano===========
        faturamentoAnoGrafico() {
            const encerrantesPorAno = this.encerrantes.map(enc => {
                return [(enc.INICIO_JORNADAS.DATA.split('/')[2]).toString(), parseInt(enc.RESUMO_JORNADAS.valorTotal)]
            })

            let faturamentoPorAno = [['2017', 0], ['2018', 0], ['2019', 0]] 
            for (let l = 0; l < encerrantesPorAno.length ; l++) {
                if (encerrantesPorAno[l][0] == '2017') {
                    faturamentoPorAno[0][1] += encerrantesPorAno[l][1]
                } else if (encerrantesPorAno[l][0] == '2018') {
                    faturamentoPorAno[1][1] += encerrantesPorAno[l][1]
                } else if (encerrantesPorAno[l][0] == '2019') {
                    faturamentoPorAno[2][1] += encerrantesPorAno[l][1]
                }
            }

            this.chartOptionsAno.width = faturamentoPorAno.length * 175

            return [['Ano','Total Ano'], ...faturamentoPorAno]
        },

        //==========grafico mês===========
        faturamentoMesGrafico(){
            const encerrantesPorMes = this.encerrantes.filter(enc => {
                return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)   
            }).map(enc => {
                return [(enc.INICIO_JORNADAS.DATA.split('/')[1]).toString(), parseInt(enc.RESUMO_JORNADAS.valorTotal)]
            })
            // console.log(encerrantesPorMes)
        
            let faturamentoPorMeses = [['janeiro', 0], ['fevereiro', 0], ['março', 0], ['abril', 0], ['maio', 0],
                ['junho', 0], ['julho', 0], ['agosto', 0], ['setembro', 0], ['outubro', 0], ['novembro', 0], ['dezembro', 0]] 
            
            for (let l = 0; l < encerrantesPorMes.length ; l++) {
                if (encerrantesPorMes[l][0] == '01') {
                    faturamentoPorMeses[0][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '02') {
                    faturamentoPorMeses[1][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '03') {
                    faturamentoPorMeses[2][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '04') {
                    faturamentoPorMeses[3][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '05') {
                    faturamentoPorMeses[4][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '06') {
                    faturamentoPorMeses[5][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '07') {
                    faturamentoPorMeses[6][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '08') {
                    faturamentoPorMeses[7][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '09') {
                    faturamentoPorMeses[8][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '10') {
                    faturamentoPorMeses[9][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '11') {
                    faturamentoPorMeses[10][1] += encerrantesPorMes[l][1]
                } else if (encerrantesPorMes[l][0] == '12') {
                    faturamentoPorMeses[11][1] += encerrantesPorMes[l][1]
                }
            }
            
            this.chartOptionsMes.title = `Faturamento Encerrantes Mês - ano(${this.anoTotal})`
            return [['Mês','Total Mês'], ...faturamentoPorMeses]
            
        },

        //====== obtendo encerrantes========
        getEncerrantes() {
            const search = this.searchEncerrante ? `name=${this.searchEncerrante}` : ''
            axios.get(`${URL_ROOT}/upload?${search}`)
                .then(res => {
                    this.encerrantes = res.data
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response}))
        },

        //esse é o método de teste - LCT(Linha, Carro, Total)
        encerranteLCTSugerida(dma, lct) {
            
            //selecionar encerrantes pela data sugerida
            const encerranteDataSugerida = this.encerrantes.filter(enc => {
                if (dma === 'dia') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[0]) === parseInt(this[`dia${lct}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this[`mes${lct}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lct}`])
                } else if (dma === 'mes') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this[`mes${lct}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lct}`])
                } else if (dma === 'ano') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lct}`])
                } else {
                    return true
                }
            })

            //mapear somente as jornadas
            const jornadasSugeridas = encerranteDataSugerida.map(enc => {
                return enc.JORNADAS
            })

            //transformar as jornadas em um só array
            let jornadasUnicoArray = []
            for (let l = 0; l < jornadasSugeridas.length; l++) {
                for (let c = 0; c < jornadasSugeridas[l].length; c++) {
                    jornadasUnicoArray.push(jornadasSugeridas[l][c])    
                }
            }

            //selecionar as jornadas por linha ou carro ou total
            let jornadasPorLCTSugerida = []
            if (lct === 'Total') {
                //selecionar as jornadas por totalValor
                jornadasPorLCTSugerida = encerranteDataSugerida.map(enc => {
                    return parseInt(enc.RESUMO_JORNADAS.valorTotal)
                })
            } else {
                //selecionar as jornadas por linha ou carro
                jornadasPorLCTSugerida = jornadasUnicoArray.filter(jua => {
                    if (!this[lct]) {
                        return  true
                    }else {
                        return jua.configJornada[lct] === this[lct]
                    }
                }).map(m => parseInt(m.integracoes.VAL_JORNADA))
            }

            const faturamentoLCT = jornadasPorLCTSugerida.reduce((acumulador, total) => acumulador += total, 0)
            return faturamentoLCT
            
        },

        maiorMenorLinhaCarroDia() {
            const encerrantesDia = this.encerrantes.filter(enc => {
                return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[0]) === parseInt(this.diaTotal) &&
                    parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this.mesTotal) &&
                    parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)
            })
            //mapear somente as jornadas
            const jornadasSugeridasDia = encerrantesDia.map(enc => {
                return enc.JORNADAS
            })

            //transformar as jornadas em um só array
            let jornadasUnicoArray = []
            for (let l = 0; l < jornadasSugeridasDia.length; l++) {
                for (let c = 0; c < jornadasSugeridasDia[l].length; c++) {
                    jornadasUnicoArray.push(jornadasSugeridasDia[l][c])    
                }
            }

            const jornadasLinhaCarroValor = jornadasUnicoArray.map(enc => {
                return {
                    linha: enc.configJornada.Linha,
                    carro: enc.configJornada.Carro,
                    val_jornada: parseFloat(enc.integracoes.VAL_JORNADA)
                }
            })

            let objLinhaCarroValorMaior = {}
            let objLinhaCarroValorMenor = {}
            let max = -Infinity
            let min = Infinity
            jornadasLinhaCarroValor.forEach(jlcv => {
                if (jlcv.val_jornada > max) {
                    max = jlcv.val_jornada
                    objLinhaCarroValorMaior = {...jlcv}
                } 
                if (jlcv.val_jornada < min) {
                    min = jlcv.val_jornada
                    objLinhaCarroValorMenor = {...jlcv}
                } 
                
            })

            return { maior: objLinhaCarroValorMaior, menor: objLinhaCarroValorMenor}
        }
    },

    created() {
        this.getEncerrantes()
        setInterval(() => {
            this.getEncerrantes()
        }, 5000)
    },

}
</script>

<style>
.dashboard {
    padding: 10px;
    background-color: #CCC3;
    height: 100%;
}

.formulario-data {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    margin: 10px 0px;
}

.dados-faturamento {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
    background-color: #fff;
    border-radius: 2px;
    /* height: 490px; */
    padding: 10px;
    margin: 10px 0px; 
    overflow-x: hidden;
}

/*-------Parte de Animação-------*/
.boxes-left {
    animation: fade 1s ease;
}

.boxes-right {
    animation: fade 2s ease;
}

.dados-faturamento {
    animation: fade 2s ease;
}

@keyframes fade {
    from { 
        opacity: 0;
        transform: translateX(0);
        }
    to {
        opacity: 1;
        transform: translateX(90);
        }
}
</style>



