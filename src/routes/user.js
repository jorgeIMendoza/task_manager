import express from 'express'
import User from '../models/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// crea un usuario
router.post('/users', async (req, res) => {
    try {
        const user = User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})


// find user by credentials
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.correo, req.body.password)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send({ msg: 'No se puede conectar' })
    }
})

// busca todos los usuarios
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// busca un usuario especifico por correo
router.get('/users/:correo', auth, async (req, res) => {
    try {
        const correo = req.params.correo
        const user = await User.findOne({ correo })
        if (!user) {
            return res.status(404).send({ msg: 'Usuario no encontrado' })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// busca un usuario especifico y modificarlo
router.patch('/users/:correo', auth, async (req, res) => {
    try {
        // validacionn de campos modificables
        const datosAModificar = Object.keys(req.body)
        const modificables = ['name', 'correo', 'direccion']
        const esValidaLaModificacion = datosAModificar.every(datoAModificar => modificables.includes(datoAModificar))

        if (!esValidaLaModificacion) {
            return res.status(404).send({ msg: 'Campos no existentes' })
        }

        const user = await User.findOneAndUpdate({ correo: req.params.correo }, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send({ msg: 'Usuario no encontrado' })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


// busca un usuario especifico por correo y eliminarlo
router.delete('/users/:correo', auth, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ correo: req.params.correo })
        if (!user) {
            return res.status(404).send({ msg: 'Usuario no encontrado' })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


export default router