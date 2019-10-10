const { authSecret } = require('../../../.env')
const { existsError, notExistsOrError, equalsOrError } = require('../../config/validations')
// const jwt = require('jwt-simple')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

//método para encriptar a senha
const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

//método de login
const signIn = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('Informe usuário e senha!')
    } 
    
    const user = await User.findOne({ email })

    if (!user) return res.status(404).send('Usuário não encontrado!')

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(400).send('Email/Senha inválidos!') 

    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        iat: now,
        exp: now + (60 * 60 * 24 * 1)
    }

    res.json({
        ...payload,
        token: jwt.sign(payload, authSecret)
    })
}

//método de resgistrar
const signUp = async (req, res) => {
    const user = { ...req.body }
    
    // if (req.params.id) user.id = req.params.id

    try {
        existsError(user.name, 'Nome não informado!')
        existsError(user.email, 'E-mail não informado!')
        existsError(user.password, 'Senha não informada!')
        existsError(user.confirmPassword, 'Confirmação de Senha inválida!')
        equalsOrError(user.password, user.confirmPassword,
            'Senhas não conferem!')

        const userFromDB = await User.findOne({email: user.email})
        if (!user.id) {
            notExistsOrError(userFromDB, 'Usuário já cadastrado!')
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }

    user.password = encryptPassword(user.password)
    delete user.confirmPassword

    const newUser = await User.create(user, err => {
        if (err) {
            return res.send(err)
        } else{
            res.status(200).send(`Usuário ${req.body.name} inserido com sucesso!!!`)
        }
    })
}

//método para validar token
const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
        if (userData) {
            const token = jwt.decode(userData.token, authSecret)
            if (new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }
    } catch(e) {
        //problema com o token
    } 

    res.send(false)
}

//método de atualização do usuário
const atualizarUser = async (req, res) => {
    const userUpdate = { ...req.body }
    // console.log(req.body)
    // console.log(req.file)


    if ( req.params.id ) {

        const user = await User.findOne({ _id: req.params.id })

        try {
            existsError(userUpdate.name, 'Novo nome não informado!')
            existsError(userUpdate.email, 'Novo e-mail não informado!')
            existsError(userUpdate.antigoPassword, 'Senha antiga não informada!')

            const isMatch = bcrypt.compareSync(userUpdate.antigoPassword, user.password)
            if (!isMatch) throw 'Senha antiga incorreta!'

            existsError(userUpdate.password, 'Nova senha não informada!')
            existsError(userUpdate.confirmPassword, 'Informar confirmação de senha!')
            equalsOrError(userUpdate.password, userUpdate.confirmPassword,
                'Novas senhas não conferem!')
            
        } catch(msg) {
            return res.status(400).send(msg)
        }
            
        userUpdate.password = encryptPassword(userUpdate.password)

        await User.update(
                { _id: req.params.id}, 
                {$set: {name: userUpdate.name, 
                        email: userUpdate.email, 
                        password: userUpdate.password } },  function(error) {
            if (error) {
                return res.status(500).send('Erro ao atualizar usuário!')
            } else {
                res.status(200).send(`Usuário atualizado com sucesso!`)
            }
        })

    } else {
        return res.status(400).send('Nenhum usuário informado!')
    }

}

const confirmShowPassword = async(req, res, next) => {
    
    const password = req.body.password
    const _id = req.params.id

    if ( _id ) {
        
        const user = await User.findOne({ _id })
        const isMatch = bcrypt.compareSync(password, user.password)
        
        try {
            if (!isMatch) throw 'Senha incorreta!'
            
        } catch (msg) {
            return res.status(400).send(msg)
        }

        return res.status(200).send(true)

    } else {
        return res.status(400).send('Erro de requisição!')
    }
}


module.exports = { signIn, signUp, validateToken, atualizarUser, confirmShowPassword }
