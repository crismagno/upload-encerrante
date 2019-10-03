const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./multerConfig')
const readFile = require('../common/readFile')
const Encerrante = require('../models/encerrante')

const upload = multer(multerConfig).single('upload')

routes.get('/upload', async(req, res, next) => {
    try {
        let name  = req.query.name ? req.query.name : ''
        
        const encerrantes = await Encerrante
            .find({name: new RegExp(name)})
            .sort( {createdAt: -1} )
            
        res.status(200).json(encerrantes)
    } catch (err) {
        return res.status(400).send(err)
    }
})

routes.post('/upload', async(req, res) => {
    
    upload(req, res, err => {
        // console.log(req.file)
        if (err ) {
            // console.log(err)
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
                            try {
                                await Encerrante.insertMany({ 
                                    name,
                                    INICIO_JORNADAS: objInicio, 
                                    JORNADAS: arrayJornadas, 
                                    RESUMO_JORNADAS: objResumo 
                                })
                                res.status(200).send('Upload Efetuado com Sucesso.')
                            } catch (err) {
                                res.status(500).send(err)
                            }
                        }
                    }, 500)  
                } else {
                    res.status(400).send('Encerrante já cadastrado.')
                }
            }
        }) 
    })
})

routes.put('/upload/done/:id', async(req, res, next) => {
    try {
        await Encerrante.updateOne({_id: req.params.id},
               { $set: {done: req.body.done}})
        res.status(200).send(true)
    } catch (err) {
        res.status(400).send('Erro de requisição.')
    }
})

routes.delete('/upload/:id', async(req, res, next) => {
    try {
        await Encerrante.deleteOne({_id: req.params.id})
        res.status(200).send('Encerrante Deletado com Sucesso!')
    } catch(err) {
        res.status(400).send('Erro ao deletar')
    }
})

module.exports = routes