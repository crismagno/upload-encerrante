import axios from 'axios'
import { URL_ROOT, userKey } from "@/config/global";

export default {
    data() {
        return {
            encerrantes: [],
            diaLinha: new Date().getDate() - 9,
            mesLinha: new Date().getMonth() + 1 -2,
            anoLinha: new Date().getUTCFullYear(),
            //---------
            diaCarro: new Date().getDate() - 9,
            mesCarro: new Date().getMonth() + 1 - 2,
            anoCarro: new Date().getUTCFullYear(),
            //---------
            diaTotal: new Date().getDate() - 9,
            mesTotal: new Date().getMonth() + 1 - 2,
            anoTotal: new Date().getUTCFullYear(),
            Linha: '',
            Carro: '',
            LinhaTable: 'dia',
            CarroTable: 'dia',

            // chartDataAno: [],
            // chartDataMes: [],

            chartOptionsAno: {
                title: 'Faturamento Encerrantes Ano',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                // width:400,
                height:190
            },
            chartOptionsMes: {
                title: 'Faturamento Encerrantes Mês',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                // width:400,
                height:190
            },

            chartOptionsDia: {
                title: 'Faturamento Encerrantes Dia',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                // width:400,
                height:190
            },

            showHideDivConfig: false,
            escolhaRadio: 'Total',
            showTablesLCT: true,
            // storeChartEscolha: this.$store.state.chartEscolha,
        }
    },

    watch: {
        Linha(to, from) {
            this.$store.state.chartEscolha = 'Linha'
        },
        Carro(to, from) {
            this.$store.state.chartEscolha = 'Carro'
        } 
    },

    computed: {
        borderLeft() {
            if (this.$store.state.chartEscolha === 'Linha') {
                return '4px solid #ffa726'
            }
            if (this.$store.state.chartEscolha === 'Carro') {
                return '4px solid #66bb6a'
            }
            if (this.$store.state.chartEscolha === 'Total') {
                return '4px solid #26c6da'
            }
            
        },

        h3Config(){//esse computed é do btn config lateral direito
            if (this.escolhaRadio === 'Linha') {
                return 'Linha'
            }
            if (this.escolhaRadio === 'Carro') {
                return 'Carro'
            }
            if (this.escolhaRadio === 'Total') {
                return 'Total'
            }
        }
    },

    methods: {
        // faturamento para os gráficos dos dias meses e anos
        faturamentoDiaOuAnosGraficoLinhaOuCarroTotal(da, lct) {
            const encerrantePorDiaOuAno = this.encerrantes.filter(enc => {
                if (da === 'dias') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this[`mes${lct}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lct}`])
                } else if (da === 'mes') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lct}`])
                } else if (da === 'anos') {
                    return true
                }
            }).map(enc => {
                return enc.JORNADAS
            })

            let jornadasUnicoArray = []
            for (let l = 0; l < encerrantePorDiaOuAno.length; l++) {
                for (let c = 0; c < encerrantePorDiaOuAno[l].length; c++) {
                    jornadasUnicoArray.push(encerrantePorDiaOuAno[l][c])    
                }
            }

            let jornadasPorLCSugerida = []
            if (lct === 'Total') {
                //selecionar as jornadas por totalValor
                jornadasPorLCSugerida = jornadasUnicoArray.map(jor => {
                    if (da === 'dias') {
                        return [jor.configJornada.Termino.split('-')[1].split('/')[0],
                            parseFloat(jor.integracoes.VAL_JORNADA)]
                    } else if (da === 'mes') {
                        return [ jor.configJornada.Termino.split('-')[1].split('/')[1],
                            parseFloat(jor.integracoes.VAL_JORNADA) ]
                    } else if (da === 'anos') {
                        return ["20" + jor.configJornada.Termino.split('-')[1].split('/')[2],
                            parseFloat(jor.integracoes.VAL_JORNADA) ]
                    }
                })
            } else {
                jornadasPorLCSugerida = jornadasUnicoArray.filter(jua => {
                    if (!this[lct]) {
                        return  true
                    }else {
                        return jua.configJornada[lct] === this[lct]
                    }
                }).map(jor => {
                    if (da === 'dias') {
                        return [jor.configJornada.Termino.split('-')[1].split('/')[0],
                            parseFloat(jor.integracoes.VAL_JORNADA)]
                    } else if (da === 'mes') {
                        return [ jor.configJornada.Termino.split('-')[1].split('/')[1],
                            parseFloat(jor.integracoes.VAL_JORNADA) ]
                    } else if (da === 'anos') {
                        return ["20" + jor.configJornada.Termino.split('-')[1].split('/')[2],
                            parseFloat(jor.integracoes.VAL_JORNADA) ]
                    }
                })
            }
             //==============================

            let agruparDiaOuAno = []
            for (let e = 0; e < jornadasPorLCSugerida.length; e++) {
                if (!agruparDiaOuAno[0]) {
                    agruparDiaOuAno.push(jornadasPorLCSugerida[0][0])
                } else if (agruparDiaOuAno[0] && agruparDiaOuAno.indexOf(jornadasPorLCSugerida[e][0]) == -1) {
                    agruparDiaOuAno.push(jornadasPorLCSugerida[e][0])
                }
            }
            agruparDiaOuAno = agruparDiaOuAno.sort().map(a => [a, 0])

            for (let a = 0; a < agruparDiaOuAno.length; a++) {
                for (let e = 0; e < jornadasPorLCSugerida.length; e++) {
                    if (agruparDiaOuAno[a][0] == jornadasPorLCSugerida[e][0] ) {
                        agruparDiaOuAno[a][1] += jornadasPorLCSugerida[e][1]
                    }
                }
            }

            let faturamentoDiaOuAno = agruparDiaOuAno.length < 1 ? [['Nada', 0]] : agruparDiaOuAno
            if (da === 'dias') {
                if (lct === 'Total') {
                    this.chartOptionsDia.title = 
                        `Faturamento por Dias ${this[`mes${lct}`]}/${this[`ano${lct}`]} (Total)`
                    return [['Dia','Total Dia'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Linha') {
                    this.chartOptionsDia.title = 
                        `Faturamento por  Dias ${this[`mes${lct}`]}/${this[`ano${lct}`]} (Linha: ${this[lct] || 'Todas'})`
                    return [['Dia','Total Dia Linha'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Carro') {
                    this.chartOptionsDia.title = 
                        `Faturamento por  Dias ${this[`mes${lct}`]}/${this[`ano${lct}`]} (Carro: ${this[lct] || 'Todos'})`    
                    return [['Dia','Total Dia Carro'], ...faturamentoDiaOuAno ]
                }
            } else if (da === 'mes') {
                if (lct === 'Total') {
                    this.chartOptionsMes.title = 
                        `Faturamento por Meses ${this[`ano${lct}`]} (Total)`
                    return [['Mês','Total Mês'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Linha') {
                    this.chartOptionsMes.title = 
                        `Faturamento por Meses ${this[`ano${lct}`]} (Linha: ${this[lct] || 'Todas'})`
                    return [['Mês','Total Mês Linha'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Carro') {
                    this.chartOptionsMes.title = 
                        `Faturamento por Meses ${this[`ano${lct}`]} (Carro: ${this[lct] || 'Todos'})`
                    return [['Mês','Total Mês Carro'], ...faturamentoDiaOuAno ]
                }
            } else if (da === 'anos') {
                if (lct === 'Total') {
                    this.chartOptionsAno.title = `Faturamento por Anos (Total)`
                    // this.chartOptionsAno.width = agruparDiaOuAno.length * 65
                    return [['Ano','Total Ano'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Linha') {
                    this.chartOptionsAno.title = `Faturamento por Anos (Linha: ${this[lct] || 'Todas'})`
                    // this.chartOptionsAno.width = agruparDiaOuAno.length * 65
                    return [['Ano','Total Ano'], ...faturamentoDiaOuAno ]
                }
                if (lct === 'Carro') {
                    this.chartOptionsAno.title = `Faturamento por Anos (Carro: ${this[lct] || 'Todos'})`
                    // this.chartOptionsAno.width = agruparDiaOuAno.length * 65
                    return [['Ano','Total Ano'], ...faturamentoDiaOuAno ]
                }
            }
                        
            // console.log(faturamentoDiaOuAno)
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
        faturamentoLCTSugerida(dma, lct) {
            
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
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[0]) === parseInt(this[`dia${lica}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this[`mes${lica}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lica}`])
                } else if (dma === 'mes') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[1]) === parseInt(this[`mes${lica}`]) &&
                        parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lica}`])
                } else if (dma === 'ano') {
                    return parseInt(enc.INICIO_JORNADAS.DATA.split('/')[2]) === parseInt(this[`ano${lica}`])
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
                if (lica === 'Linha') {
                    return [jua.configJornada.Linha, parseFloat(jua.integracoes.VAL_JORNADA)]
                } else if(lica === 'Carro'){
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

            let linhasOuCarrosNomeValor = agrupar.sort(function(a, b){return b[1] - a[1]});//ordenar em valores maiores

            return { maior: objLinhaCarroValorMaior, menor: objLinhaCarroValorMenor, agrupar: linhasOuCarrosNomeValor}
        },
    },

    created() {
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getEncerrantes()
        document.title = 'Dashboard'
        this.$store.state.titleHeader = 'Dashboard Teste'
    },
}