<template>
    <div class="dashboard">
        <Pagetitle title="Dashboard Teste" icon="fa fa-industry" sub="Faturamento - Linha | Carro | Total" />
        <DashboardModal />
        
        
        <div class="row p-0 m-0" >
            <div class="boxes-left col-xs-12 col-lg-3 p-0 m-0 " >
                <div class="row p-0 m-0" >
                    <div class="col-sm-4 col-lg-12 " style="padding:0px 5px;">
                        <BoxValue textBox="Linha" icon="fa fa-check" buttonColor="#1565c0" boxColor="#5e92f3" 
                            :textSugerido="Linha"
                            :valueDia="encerranteLCTSugerida('dia', 'Linha')" 
                            :valueMes="encerranteLCTSugerida('mes', 'Linha')" 
                            :valueAno="encerranteLCTSugerida('ano', 'Linha')"
                            :valueTotal="encerranteLCTSugerida(null, 'Linha')"
                        />
                    </div>
                    <div class="col-sm-4 col-lg-12 " style="padding:0px 5px;">
                        <BoxValue textBox="Carro" icon="fa fa-car" buttonColor="#f57c00" boxColor="#ffad42" 
                            :textSugerido="Carro"
                            :valueDia="encerranteLCTSugerida('dia', 'Carro')"
                            :valueMes="encerranteLCTSugerida('mes', 'Carro')" 
                            :valueAno="encerranteLCTSugerida('ano', 'Carro')"
                            :valueTotal="encerranteLCTSugerida(null, 'Carro')"
                        />
                    </div>
                    <div class="col-sm-4 col-lg-12 " style="padding:0px 5px;">
                        <BoxValue textBox="Total" icon="fa fa-bars" buttonColor="#64dd17" boxColor="#9cff57"
                            :valueDia="encerranteLCTSugerida('dia', 'Total')"
                            :valueMes="encerranteLCTSugerida('mes', 'Total')" 
                            :valueAno="encerranteLCTSugerida('ano', 'Total')"
                            :valueTotal="encerranteLCTSugerida(null, 'Total')"
                        />
                    </div>
                </div>
            </div>
            
            <div class="agrupador-grafico col-xs-12 col-lg-6 p-0 m-0" >
                <div class="row p-0 m-0">
                    <div class="p-1 col-sm-6 col-lg-12" >
                        <div class="div-grafico dados-faturamento-ano  ">
                            <Grafico :chartData="faturamentoDiaOuAnosGrafico('anos')"  :options="chartOptionsAno" type="ColumnChart"/>
                        </div>
                    </div>
                    <div class="p-1 col-sm-6 col-lg-12" >
                        <div class="div-grafico dados-faturamento-mes " v-if="showDiaOuMes">
                            <button class="btn btn-primary btn-sm float-right " @click="showDiaOuMes = !showDiaOuMes">
                                <i class="fa fa-exchange"></i>
                            </button>
                            <Grafico :chartData="faturamentoMesGrafico()"  :options="chartOptionsMes" type="LineChart"/>
                        </div>
                        <div class="div-grafico dados-faturamento-mes " v-if="!showDiaOuMes">
                            <button class="btn btn-primary btn-sm float-right" @click="showDiaOuMes = !showDiaOuMes">
                                <i class="fa fa-exchange"></i>
                            </button>
                            <Grafico :chartData="faturamentoDiaOuAnosGrafico('dias')"  :options="chartOptionsDia" type="LineChart"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="boxes-right col-xs-12 col-lg-3 p-0 m-0" >
                <div class="row p-0 m-0" >
                    <div class="col-sm-4 col-lg-12" style="padding:0px 5px;">
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
                    <div class="col-sm-4 col-lg-12 p-0 m-0" ><!-- INICIO(box-small linha dia/mes/ano) -->
                        <div class="box-small-linha-dia" style="padding:0px 5px;" v-if="showLinhaCarro == 0">
                            <BoxSmall 
                                borderLeft="3px solid #5e92f3" 
                                icon="fa fa-check" 
                                :valor="this.LinhaCarroDiaMesAno('dia', 'linha').maior.valor"
                                textSugerido="Linha/Dia" 
                                :textValor="this.LinhaCarroDiaMesAno('dia', 'linha').maior.nome" 
                                colorTextValor="#5e92f3"/>
                        </div>
                        <div class="box-small-linha-mes" style="padding:0px 5px;" v-if="showLinhaCarro == 1">
                            <BoxSmall 
                                borderLeft="3px solid #5e92f3" 
                                icon="fa fa-check" 
                                :valor="this.LinhaCarroDiaMesAno('mes', 'linha').maior.valor"
                                textSugerido="Linha/Mês" 
                                :textValor="this.LinhaCarroDiaMesAno('mes', 'linha').maior.nome" 
                                colorTextValor="#5e92f3"/>
                        </div>
                        <div class="box-small-linha-ano" style="padding:0px 5px;" v-if="showLinhaCarro == 2">
                            <BoxSmall 
                                borderLeft="3px solid #5e92f3" 
                                icon="fa fa-check" 
                                :valor="this.LinhaCarroDiaMesAno('ano', 'linha').maior.valor"
                                textSugerido="Linha/Ano" 
                                :textValor="this.LinhaCarroDiaMesAno('ano', 'linha').maior.nome" 
                                colorTextValor="#5e92f3"/>
                        </div>
                    </div><!-- FIM(box-small linha dia/mes/ano) -->
                    
                    <div class="col-sm-4 col-lg-12 p-0 m-0" v-if="showLinhaCarro == 0"><!-- INICIO(box-small carro dia/mes/ano) -->
                        <div class="box-small-carro-dia" style="padding:0px 5px;" >
                            <BoxSmall 
                                borderLeft="3px solid #ffad42" 
                                icon="fa fa-car" 
                                :valor="this.LinhaCarroDiaMesAno('dia', 'carro').maior.valor"
                                textSugerido="Carro/Dia" 
                                :textValor="this.LinhaCarroDiaMesAno('dia', 'carro').maior.nome" 
                                colorTextValor="#ffad42"/>
                        </div>
                    </div>
                    <div class="col-sm-4 col-lg-12 p-0 m-0" v-if="showLinhaCarro == 1">
                        <div class="box-small-carro-mes" style="padding:0px 5px;" >
                            <BoxSmall 
                                borderLeft="3px solid #ffad42" 
                                icon="fa fa-car" 
                                :valor="this.LinhaCarroDiaMesAno('mes', 'carro').maior.valor"
                                textSugerido="Carro/Mês" 
                                :textValor="this.LinhaCarroDiaMesAno('mes', 'carro').maior.nome" 
                                colorTextValor="#ffad42"/>
                        </div>
                    </div>
                    <div class="col-sm-4 col-lg-12 p-0 m-0" v-if="showLinhaCarro == 2">
                        <div class="box-small-carro-ano" style="padding:0px 5px;" >
                            <BoxSmall 
                                borderLeft="3px solid #ffad42" 
                                icon="fa fa-car" 
                                :valor="this.LinhaCarroDiaMesAno('ano', 'carro').maior.valor"
                                textSugerido="Carro/Ano" 
                                :textValor="this.LinhaCarroDiaMesAno('ano', 'carro').maior.nome" 
                                colorTextValor="#ffad42"/>
                        </div>
                    </div><!-- FIM(box-small carro dia/mes/ano) -->
                    
                </div>
            
            </div>

        </div>               
    </div>
</template>

<script>
import axios from 'axios'
import { URL_ROOT, userKey } from "@/config/global";

import BoxValue from "@/components/widget/boxValue";
import BoxSmall from "@/components/widget/boxSmall";
import Pagetitle from "@/components/template/Pagetitle";
import DashboardModal from "./DashboardModal";
import Grafico from "./Grafico";

export default {
    name: 'Dashboard',
    components: { BoxValue, BoxSmall, Pagetitle, DashboardModal, Grafico },
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
            diaTotal: new Date().getDate(),
            mesTotal: new Date().getMonth() + 1,
            anoTotal: new Date().getUTCFullYear(),
            Linha: '',
            Carro: '',

            // chartDataAno: [],
            // chartDataMes: [],

            chartOptionsAno: {
                title: 'Faturamento Encerrantes Ano',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                width:320,
                height:200
            },
            chartOptionsMes: {
                title: 'Faturamento Encerrantes Mês',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                width:500,
                height:200
            },

            chartOptionsDia: {
                title: 'Faturamento Encerrantes Dia',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                width:500,
                height:200
            },

            showDiaOuMes: true,
            showLinhaCarro: 0,
        }
    },

    methods: {

        //==========grafico dias ou anos===========
        faturamentoDiaOuAnosGrafico(da) {
            const encerrantePorDiaOuAno = this.encerrantes.filter(enc => {
                if (da === 'dias') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this.mesTotal) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)
                } else if (da === 'anos') {
                    return true
                }
            }).map(enc => {
                if (da === 'dias') {
                    return [(enc.INICIO_JORNADAS.DATA.split('/')[0]).toString(), parseFloat(enc.RESUMO_JORNADAS.valorTotal)]
                } else if (da === 'anos') {
                    return [(enc.INICIO_JORNADAS.DATA.split('/')[2]).toString(), parseFloat(enc.RESUMO_JORNADAS.valorTotal)]
                }
            })

            let agruparDiaOuAno = []
            for (let e = 0; e < encerrantePorDiaOuAno.length; e++) {
                if (!agruparDiaOuAno[0]) {
                    agruparDiaOuAno.push(encerrantePorDiaOuAno[0][0])
                } else if (agruparDiaOuAno[0] && agruparDiaOuAno.indexOf(encerrantePorDiaOuAno[e][0]) == -1) {
                    agruparDiaOuAno.push(encerrantePorDiaOuAno[e][0])
                }
            }
            agruparDiaOuAno = agruparDiaOuAno.sort().map(a => [a, 0])

            for (let a = 0; a < agruparDiaOuAno.length; a++) {
                for (let e = 0; e < encerrantePorDiaOuAno.length; e++) {
                    if (agruparDiaOuAno[a][0] == encerrantePorDiaOuAno[e][0] ) {
                        agruparDiaOuAno[a][1] += encerrantePorDiaOuAno[e][1]
                    }
                }
            }

                let faturamentoDiaOuAno = agruparDiaOuAno.length < 1 ? [['Nada', 0]] : agruparDiaOuAno
            if (da === 'dias') {
                this.chartOptionsDia.title = `Faturamento Por Dias do Mês - (${this.mesTotal}/${this.anoTotal})`
                return [['Dia','Total Dia'], ...faturamentoDiaOuAno ]
            } else if (da === 'anos') {
                this.chartOptionsAno.title = `Faturamento Encerrantes Anos`,
                this.chartOptionsAno.width = agruparDiaOuAno.length * 90
                return [['Ano','Total Ano'], ...faturamentoDiaOuAno ]
            }
        },

        //==========grafico ano===========
        // faturamentoAnoGrafico() {
        //     const encerrantesPorAno = this.encerrantes.map(enc => {
        //         return [(enc.INICIO_JORNADAS.DATA.split('/')[2]).toString(), parseFloat(enc.RESUMO_JORNADAS.valorTotal)]
        //     })
            
        //     let agruparAno = []
        //     for (let e = 0; e < encerrantesPorAno.length; e++) {
        //         if (!agruparAno[0]) {
        //             agruparAno.push(encerrantesPorAno[0][0])
        //         } else if (agruparAno[0] && agruparAno.indexOf(encerrantesPorAno[e][0]) == -1) {
        //             agruparAno.push(encerrantesPorAno[e][0])
        //         }
        //     }
        //     agruparAno = agruparAno.sort().map(a => [a, 0])

        //     for (let a = 0; a < agruparAno.length; a++) {
        //         for (let e = 0; e < encerrantesPorAno.length; e++) {
        //             if (agruparAno[a][0] == encerrantesPorAno[e][0] ) {
        //                 agruparAno[a][1] += encerrantesPorAno[e][1]
        //             }
        //         }
        //     }

        //     this.chartOptionsAno.title = `Faturamento Encerrantes Anos`,
        //     this.chartOptionsAno.width = agruparAno.length * 90

        //     let faturamentoAno = agruparAno.length < 1 ? [['Nada', 100]] : agruparAno

        //     return [['Ano','Total Ano'], ...faturamentoAno]
        // },

        //==========grafico mês===========
        faturamentoMesGrafico(){
            const encerrantesPorMes = this.encerrantes.filter(enc => {
                return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)   
            }).map(enc => {
                return [(enc.INICIO_JORNADAS.DATA.split('/')[1]).toString(), parseFloat(enc.RESUMO_JORNADAS.valorTotal)]
            })
        
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

        //====== obtendo encerrantes ========
        getEncerrantes() {
            const search = this.searchEncerrante ? `name=${this.searchEncerrante}` : ''
            axios.get(`${URL_ROOT}/upload?${search}`)
                .then(res => {
                    this.encerrantes = res.data
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response.data}))
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
                    return parseFloat(enc.RESUMO_JORNADAS.valorTotal)
                })
            } else {
                //selecionar as jornadas por linha ou carro
                jornadasPorLCTSugerida = jornadasUnicoArray.filter(jua => {
                    if (!this[lct]) {
                        return  true
                    }else {
                        return jua.configJornada[lct] === this[lct]
                    }
                }).map(m => parseFloat(m.integracoes.VAL_JORNADA))
            }

            const faturamentoLCT = jornadasPorLCTSugerida.reduce((acumulador, total) => acumulador += total, 0)
            return faturamentoLCT
            
        },

        //esse método retorna ou a linha ou carro pela data sugerida, o maior e o menor valor agrupado
        LinhaCarroDiaMesAno(dma, lica) {
            //selecionar encerrantes pela data sugerida
            const encerranteDataSugerida = this.encerrantes.filter(enc => {
                if (dma === 'dia') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[0]) === parseInt(this.diaTotal) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this.mesTotal) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)
                } else if (dma === 'mes') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this.mesTotal) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)
                } else if (dma === 'ano') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this.anoTotal)
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

            let jornadasLinhaOuCarro = jornadasUnicoArray.map(jua => {
                if (lica === 'linha') {
                    return [jua.configJornada.Linha, parseFloat(jua.integracoes.VAL_JORNADA)]
                } else if(lica === 'carro'){
                    return [jua.configJornada.Carro, parseFloat(jua.integracoes.VAL_JORNADA)]
                }
            })

            let agrupar = []
            for (let e = 0; e < jornadasLinhaOuCarro.length; e++) {
                if (!agrupar[0]) {
                    agrupar.push(jornadasLinhaOuCarro[0][0])
                } else if (agrupar[0] && agrupar.indexOf(jornadasLinhaOuCarro[e][0]) == -1) {
                    agrupar.push(jornadasLinhaOuCarro[e][0])
                }
            }
            agrupar = agrupar.sort().map(a => [a, 0])

            for (let a = 0; a < agrupar.length; a++) {
                for (let e = 0; e < jornadasLinhaOuCarro.length; e++) {
                    if (agrupar[a][0] == jornadasLinhaOuCarro[e][0] ) {
                        agrupar[a][1] += jornadasLinhaOuCarro[e][1]
                    }
                }
            }

            let objLinhaCarroValorMaior = {}
            let objLinhaCarroValorMenor = {}
            let max = -Infinity
            let min = Infinity
            agrupar.forEach(a => {
                if (a[1] > max) {
                    max = a[1]
                    objLinhaCarroValorMaior = {nome: a[0], valor: a[1]}
                } 
                if (a[1] < min) {
                    min = a[1]
                    objLinhaCarroValorMenor = {nome: a[0], valor: a[1]}
                } 
                
            })

            return { maior: objLinhaCarroValorMaior, menor: objLinhaCarroValorMenor}

        }
    },

    created() {
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getEncerrantes()
        setInterval(() => {
            // this.getEncerrantes()
            if (this.showLinhaCarro == 2) {
                this.showLinhaCarro = 0
            } else {
                this.showLinhaCarro++
            }
        }, 5000)
        document.title = 'Dashboard'
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
    margin: 10px 0px 0px 0px;
}

.dados-faturamento-ano {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    margin: 5px 0px 0px 0px; 
    overflow-x: hidden;
}

.dados-faturamento-mes {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    margin: 5px 0px 0px 0px;
    overflow-x: hidden;
}

/*-------Parte de Animação-------*/
.boxes-left {
    animation: runLeft 1s ease;
}

.boxes-right {
    animation: runRight 1s ease;
}

.dados-faturamento-ano {
    animation: runUp 2s ease;
}
.dados-faturamento-mes {
    animation: runDown 2s ease;
}

.box-small-linha-dia, 
.box-small-linha-mes, 
.box-small-linha-ano, 
.box-small-carro-dia, 
.box-small-carro-mes, 
.box-small-carro-ano {
    animation: virar 2s ease;
}


@keyframes runUp {
    from { 
        opacity: 0;
        transform: translateY(-90px)
        }
    to {
        opacity: 1;
        transform: translateY(0px)
        }
}
@keyframes runDown {
    from { 
        opacity: 0;
        transform: translateY(90px)
        }
    to {
        opacity: 1;
        transform: translateY(0px)
        }
}

@keyframes runLeft {
    from { 
        opacity: 0;
        transform: translateX(-90px);
        }
    to {
        opacity: 1;
        transform: translateX(0px);
        }
}

@keyframes runRight {
    from { 
        opacity: 0;
        transform: translateX(90px);
        }
    to {
        opacity: 1;
        transform: translateX(0px);
        }
}
@keyframes virar {
    from { 
        opacity: 0;
        transform: rotateY(100deg)
        }
    to {
        opacity: 1;
        transform: rotateY(0deg)
        }
}

/*===== media queries =======*/
@media only screen and (max-width: 768px) {
    .dashboard .row {
        margin: 0px 10px;
    }
}

</style>
