const multer = require('multer')
const multerConfig = require('../../config/multerConfig')
const readFile = require('../../common/readFile')
const Encerrante = require('../../models/encerrante')

const upload = multer(multerConfig).single('upload')

const getEncerrantes = async(req, res, next) => {
    try {
        let name = req.query.name ? req.query.name : ''
        
        const encerrantes = await Encerrante
            .find({ name: new RegExp(name) })
            .sort( {createdAt: -1} )
            
        res.status(200).json(encerrantes)
    } catch (err) {
        return res.status(400).send(err)
    }
}

const postEncerrante = async(req, res) => {
    
    upload(req, res, err => {
        
        if (err ) {
            return res.status(400).send(err)
        } else if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.')
        }

        const enc = Encerrante.findOne({name: req.file.originalname},(err, resp) => {
            if (err) {
                res.status(500).send(err)
            } else {
                if (!resp) {
                    const { objInicio, arrayJornadas, objResumo } = readFile(req.file.path)
                    const { originalname: name } = req.file
                    
                    setTimeout( async() =>{
                        if (!objInicio.HORARIO || arrayJornadas.length < 1) {
                            res.status(500).send('Erro: tente novamente!')
                        } else {
                            //data encerrante
                                const dataEnc = {
                                    dia: parseInt(objInicio.DATA.split('/')[0]), 
                                    mes: parseInt(objInicio.DATA.split('/')[1]) - 1, 
                                    ano: parseInt(objInicio.DATA.split('/')[2]),
                                    hora: parseInt(objInicio.HORARIO.split(':')[0]),
                                    minuto: parseInt(objInicio.HORARIO.split(':')[1]),
                                    segundo: parseInt(objInicio.HORARIO.split(':')[2])
                                }
                            //data encerrante fim

                            try {
                                await Encerrante.insertMany({ 
                                    name,
                                    INICIO_JORNADAS: objInicio, 
                                    JORNADAS: arrayJornadas, 
                                    RESUMO_JORNADAS: objResumo,
                                    createdAt: new Date(dataEnc.ano, dataEnc.mes, dataEnc.dia,
                                        dataEnc.hora, dataEnc.minuto, dataEnc.segundo)
                                })
                                res.status(200).send(`${name} cadastrado com sucesso.`)
                            } catch (err) {
                                res.status(500).send(err)
                            }
                        }
                    }, 500)  
                } else {
                    res.status(400).send(`${req.file.originalname} já cadastrado.`)
                }
            }
        }) 
    })
}

const putDone = async(req, res, next) => {
    try {
        await Encerrante.updateOne({_id: req.params.id},
               { $set: {done: req.body.done}})
        res.status(200).send(true)
    } catch (err) {
        res.status(400).send('Erro ao alterar.')
    }
}

const deleteEncerrante = async(req, res, next) => {
    const { id, name} = req.params
    try {
        await Encerrante.deleteOne({_id: id})
        res.status(200).send(`${name} Deletado com Sucesso!`)
    } catch(err) {
        res.status(400).send('Erro ao Deletar Encerrante!')
    }
}

module.exports = { getEncerrantes, postEncerrante, putDone, deleteEncerrante }