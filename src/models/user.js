import chalk from 'chalk'
import validator from 'validator'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Modelo de usuario
const modeloUser =
{
    name: {
        type: String
    },
    correo: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(chalk.red.inverse('Correo invaido'))
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}

// Schema de user
const userSchema = new mongoose.Schema(modeloUser)

// genera el token para el usuario logueado
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'nuevakey', { expiresIn: '30s' })
    user.tokens = user.tokens.concat({ token: token })
    user.save()
    
    return token
}

// busqueda por email y password
userSchema.statics.findByCredentials = async (correo, password) => {
    const user = await User.findOne({ correo: correo })

    // no se encuentra el email
    if (!user) {
        throw new Error('No se puede conectar')
    }

    const siCoincide = await bcrypt.compare(password, user.password)

    // no coincide el password
    if (!siCoincide) {
        throw new Error('No se puede conectar')
    }

    return user
}

// antes de guardar valida si el psw se ha modificado, en caso true se encripta 
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

export default User