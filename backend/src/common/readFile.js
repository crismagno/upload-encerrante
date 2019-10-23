const fs = require('fs')
const readline = require('readline')

module.exports = (file) => {

    const readable = fs.createReadStream(file)

    const rl = readline.createInterface({
        input: readable,
    })
    
    let linhas = []
    let encerranteAntigo = 0
    rl.on('line', (line) => {
        let linha = line.split(' ')
    
        if (linha[0] == '\\par') {
            linha.shift()
        } else if ((linha[0]+' '+linha[1]+' '+linha[2]) == '{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1046{\\fonttbl{\\f0\\fnil\\fcharset0 Courier New;}}') {
            linha = []
        } else if (linha[0] == '\\viewkind4\\uc1\\pard\\b\\f0\\fs16') {
            linha = []
        }
    
        if (linha[0] == 'NO.CARTAO:') {
            linha[0] = 'CHIP:'
            encerranteAntigo = 1
        }
    
        linha = linha.filter(l => l )
    
        if (linha[0] == 'Integracao') {
            linhas.push('TOTAL: R$ 0,00 =')
            linhas.push('Integracoes:')
            linhas.push(`TOTAL: ${linha[1]}`)
        } else if(linha.length > 0) {
            linhas.push(linha.join(' '))
        }
    })
    
    let objInicio = {}
    
    let objResumo = {
        TipoQuantidadeValor: [],
        integracoes: {},
        valorTotal: null
    }
    
    let arrayJornadas = []
    
    rl.on('close', () => {
    
        linhas = linhas.filter(l => l !== 'ENCERRANTE COBRADOR -' )
            .filter(l => l !== '#### FIM DE RECIBO ####')
            .filter(l => l !== '}')
            .filter(l => l !== '\u0000')
            .filter(l => l !== 'Assinatura')
            .filter(l => l !== '**********************')
            .filter(l => l !== '--------------------')
            .filter(l => l !== '----------------------')
            .filter(l => l !== '------------------')
        
        linhas = linhas.join('|')
        linhas = linhas.split('======================')
        linhas = linhas.map(l => l.replace(/,/g, '.'))
            .map(l => l.replace(/=/g, ''))
            .filter(l => l)
    
        if (encerranteAntigo > 0) {//Esses é para os encerrantes mais antigos
            linhas.forEach((el, il) => {
                if (il > 0 && il < linhas.length - 2) {
                    let JI = el.split('Integracoes:').filter(l => l)
                    let linhaJ = JI[0].split('|').map(l => l.replace(':', '').replace(/R\$/, '')).filter(l => l)
                    let linhaI = JI[1].split('|').map(l => l.replace(':', '').replace(/R\$/, '')).filter(l => l)
                    
                    let obj = {//esse objeto é momentâneo serve para ser inserido no arrayJornadas
                        configJornada: {
                            jornada: null,
                            Linha: null,
                            Carro: null,
                            Viagens: null,
                            Tabela: null,
                            Inicio: null,
                            Termino: null,
                        },
                        TipoQuantidadeValor: [],
                        totalQtd: {},
                        integracoes: {}
                    }
    
                    linhaJ.forEach((lj, ij) => {
                        let lja = lj.split(' ').filter(l => l)
                        if (ij < 7) {
                            //inserindo as configurações de cada jornada
                            if (ij == 0) {
                                obj.configJornada['jornada'] = lja[0]
                            } else if (ij > 0 && ij < 5 ) {
                                obj.configJornada[lja[0]] = lja[1]
                            } else if (ij > 4 && ij < 7) { 
                                obj.configJornada[lja[0]] = `${lja[1]}-${lja[lja.length - 1 ]}`
                            } 
                        } else if (ij > 7 && ij < linhaJ.length - 1){
                            
                            if (lja[1] == 'MEIC' || lja[1] == 'MEID' || lja[1] == 'VTE') {
                                if (lja[1] ==  'MEIC') obj.totalQtd[`${lja[0]}_${lja[1]}`] = lja[lja.length - 1]
                                if (lja[1] ==  'MEID') obj.totalQtd[`${lja[0]}_${lja[1]}`] = lja[lja.length - 1]
                                if (lja[1] ==  'VTE') obj.totalQtd[`${lja[0]}_${lja[1]}`] = lja[lja.length - 1]
                                return;
                            };
                            if (lja.length > 2) {
                                obj.TipoQuantidadeValor[ij] = {tipo: `${lja[0].replace('.', '')}_${lja[1]}`, qtd: lja[2], valor: 0}
                                // console.log(lja)
                            } else {
                                obj.TipoQuantidadeValor[ij] = {tipo: lja[0], qtd: lja[1], valor: 0}
                            }
                            if (lja[0] === 'TOTAL') {
                                if (lja[0]) {
                                    obj.TipoQuantidadeValor[ij - 1].valor = lja[1]
                                }
                            }
                        }
                        if ( ij == linhaJ.length - 1) {
                            obj.totalQtd['TOTAL'] = lja[lja.length - 1]
                        }
                    })
    
                    //inserindo as integracoes de cada jornada
                    linhaI.forEach((el, iI) => {
                        let l = el.split(' ').filter(l => l)
                        if (l.length > 2) {
                            obj['integracoes'][`${l[0].replace('.', '')}_${l[1]}`] = l[l.length - 1]
                        } else {
                            obj['integracoes'][l[0].replace('.', '_')] = l[l.length - 1]
                        }
                    })
    
                    obj.TipoQuantidadeValor = obj.TipoQuantidadeValor.filter(l => l && l.tipo !== 'TOTAL')
                    arrayJornadas.push(obj)
                    // console.log(obj.TipoQuantidadeValor)
                }
            })
    
            //esse metodo de foreach vai ser para o 'inicio' e 'resumo'
            linhas.forEach((ls, i) => {
                if (i == 0) {
                    ls = ls.split('|').filter(l => l)
                
                    ls.forEach((e, i) => {
                        e = e.split(' ')
                        if (i == 0) {
                            objInicio['HORARIO'] = e[0]
                            objInicio['DATA'] = e[1]
                        } 
                        else if (i > 0 && i < 5){
                            objInicio[e[0].replace(':', '')] = e[e.length - 1]
                        }
                    })
                }
    
                if (i == linhas.length - 2) {//parte de resumo
                    l = ls.split('Integracoes:').filter(l => l).map(l => l.replace(/:/g, ''))
                    linha0 = l[0].split('|').filter(l => l)
                    linha0.shift()
    
                    linha0.forEach((ls, i0) => {//resumo tipo qtd valor
                        let el = ls.split(' ')
                        if (el[0] == 'TOTAL') {
                            return
                        } else {
                            if (el.length > 2) {
                                objResumo.TipoQuantidadeValor[i0] = {
                                    tipo: `${el[0].replace('.', '')}_${el[1]}`,
                                    qtd: el[el.length - 1],
                                    valor: 0
                                    }
                            } else {
                                objResumo.TipoQuantidadeValor[i0] = {
                                    tipo:el[0] ,
                                    qtd: el[el.length - 1],
                                    valor: 0
                                } 
                            }
                        }
                    })
    
                    linha1 = l[1].split('|').filter(l => l).map(l => l.replace('.', ''))//resumo integrações
                    linha1.forEach(l1 => {
                        let l = l1.split(' ')
                        if (l.length > 2) {
                            objResumo.integracoes[`${l[0]}_${l[1]}`] = l[l.length - 1]
                        } else {
                            objResumo.integracoes[l[0]] = l[l.length - 1]
                        } 
                    })
                }
    
                if (i == linhas.length - 1) {//resumo valorTotal
                    l = ls.replace(/\|/g, '').split(' ')
                    objResumo.valorTotal = l[l.length - 1]
                }
            }); //fim do forEach que trabalha com o inicio e o resumo
        } 
        
        else {//esse é para os encerrantes mais novos de 2017 para cima
    
    
            
        //esse metodo de foreach vai ser para as jornadas
        linhas.forEach((ls, i) =>{
            if (i > 0 && i < linhas.length - 2) {
                let JI = ls.split('Integracoes:').filter(l => l)
                let linhaJ = JI[0].split('|').map(l => l.replace(':', '').replace(/R\$/, '')).filter(l => l)
                let linhaI = JI[1].split('|').map(l => l.replace(':', '').replace(/R\$/, '')).filter(l => l)
                
                let obj = {//esse objeto é momentâneo serve para ser inserido no arrayJornadas
                    configJornada: {
                        jornada: null,
                        Linha: null,
                        Carro: null,
                        Viagens: null,
                        Tabela: null,
                        Inicio: null,
                        Termino: null,
                    },
                    TipoQuantidadeValor: [],
                    totalQtd: {},
                    integracoes: {}
                }
    
                //esse forEach é da jornada sem integração 
                linhaJ.forEach((el, ij) => {
                    el = el.split(' ').filter(l => l)
    
                    //inserindo as configurações de cada jornada
                    if (ij < 7) {
                        if (ij == 0) {
                            obj.configJornada['jornada'] = el[0]
                            // console.log(el)
                        } else if (ij > 0 && ij < 5 ) {
                            obj.configJornada[el[0]] = el[1]
                        } else if (ij > 4 && ij < 7) { 
                            obj.configJornada[el[0]] = `${el[1]}-${el[el.length - 1 ]}`
                        }  
                    } 
                    
                    //inserindo os tiposQtdValor de cada jornada e totalQtd
                    if (linhaJ.length < 14 ) {//se a jornada conter menos de 14 registros
                        if (ij > 7 && ij < 9) {
                            obj.TipoQuantidadeValor[0] = {tipo: el[0], qtd: el[1], valor: el[el.length - 1]}
                            
                        } else if (ij > 8){
                            if (el.length > 2) {
                                obj.totalQtd[`${el[0]}_${el[1]}`] = el[el.length - 1]
                            } else {
                                obj.totalQtd[el[0]] = el[el.length - 1]
                            }   
                        }
                    } 
                    
                    else {//se a jornada conter mais de 13 registros
                        if (ij > 7 && ij < linhaJ.length - 4) {
                            
                            if (el.length > 2) {
                                if (el.length > 3) {
                                    obj.TipoQuantidadeValor[ij] = {
                                        tipo: `${el[0].replace('.', '')}_${el[1]}`, 
                                        qtd: el[el.length - 2], 
                                        valor: el[el.length - 1]
                                    }   
                                } else {
                                    obj.TipoQuantidadeValor[ij] = {
                                        tipo: el[0], 
                                        qtd: el[el.length - 2], 
                                        valor: el[el.length - 1]
                                    }    
                                }
                                
                            } else {
                                obj.TipoQuantidadeValor[ij] = {
                                    tipo: el[0],
                                    qtd: el[1],
                                    valor: 0,
                                }     
                            }  
                        } else if (ij > linhaJ.length - 5) {
                            if (el.length > 2) {
                                obj.totalQtd[`${el[0]}_${el[1]}`] = el[el.length - 1]
                            } else {
                                obj.totalQtd[el[0]] = el[el.length - 1]
                            }
                        }   
                    }
                    
                })
                        
                //inserindo as integracoes de cada jornada
                linhaI.forEach((el, iI) => {
                    let l = el.split(' ').filter(l => l)
                    if (l.length > 2) {
                        obj['integracoes'][`${l[0].replace('.', '')}_${l[1]}`] = l[l.length - 1]
                    } else {
                        obj['integracoes'][l[0].replace('.', '_')] = l[l.length - 1]
                    }
                })
    
            obj.TipoQuantidadeValor = obj.TipoQuantidadeValor.filter(l => l)
            arrayJornadas.push(obj)
            }
        })//fim do forEach que trabalha com as jornadas
    
    
        //esse metodo de foreach vai ser para o 'inicio' e 'resumo'
        linhas.forEach((ls, i) => {
            if (i == 0) {
                ls = ls.split('|').filter(l => l)
            
                ls.forEach((e, i) => {
                    e = e.split(' ')
                    if (i == 0) {
                        objInicio['HORARIO'] = e[0]
                        objInicio['DATA'] = e[1]
                    } 
                    else if (i > 0 && i < 5){
                        objInicio[e[0].replace(':', '')] = e[e.length - 1]
                    }
                })
            }
    
            if (i == linhas.length - 2) {//parte de resumo
                l = ls.split('Integracoes:').filter(l => l).map(l => l.replace(/:/g, ''))
                linha0 = l[0].split('|').filter(l => l)
                linha0.shift()
                linha0.shift()
    
                linha0.forEach((ls, i0) => {//resumo tipo qtd valor
                    let el = ls.split(' ')
                    if (el[0] == 'TOTAL') {
                        return
                    } else {
                        if (el.length > 4) {
                            objResumo.TipoQuantidadeValor[i0] = {
                                tipo: `${el[0].replace('.', '')}_${el[1]}`,
                                qtd: el[el.length - 3],
                                valor: el[el.length - 1]
                                }
                        } else {
                            objResumo.TipoQuantidadeValor[i0] = {
                                tipo:el[0] ,
                                qtd: el[el.length - 3],
                                valor: el[el.length - 1]
                            } 
                        }
                    }
                })
    
                linha1 = l[1].split('|').filter(l => l).map(l => l.replace('.', ''))//resumo integrações
                linha1.forEach(l1 => {
                    let l = l1.split(' ')
                    if (l.length > 2) {
                        objResumo.integracoes[`${l[0]}_${l[1]}`] = l[l.length - 1]
                    } else {
                        objResumo.integracoes[l[0]] = l[l.length - 1]
                    } 
                })
            }
    
            if (i == linhas.length - 1) {//resumo valorTotal
                l = ls.replace(/\|/g, '').split(' ')
                objResumo.valorTotal = l[l.length - 1]
            }
        }); //fim do forEach que trabalha com o inicio e o resumo
    
        }
        
    
        // console.log('==---===---===---===---===-' )
        // console.log('INICIO' )
        // console.log('---------------------------' )
        // console.log(objInicio )
        // console.log('')
        // console.log('===========================' )
        // console.log('JORNADAS' )
        // console.log('---------------------------' )
        // console.log(arrayJornadas[0] )
        // console.log('' )
        // console.log('===========================' )
        // console.log('RESUMO' )
        // console.log('---------------------------' )
        // console.log(objResumo )
    
        // console.log(linhas)
        // console.log(linhas.length)
    })
    
    return { objInicio, objResumo, arrayJornadas }
}