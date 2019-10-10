const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é requerido!']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'E-mail é requerido!'],
    },

    password: { 
        type: String, 
        min: 6, 
        max: 12, 
        required: [true, 'Password é requerido!'] 
    },

    imageUrl: String ,

    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    
})

module.exports = mongoose.model('User', UserSchema)