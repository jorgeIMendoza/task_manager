import express from 'express'
import Task from '../models/task.js'

const router = express.Router()

// crear task
router.post('/tasks', async (req, res) => {
    try {
        const task = Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


// busca todos los task
router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

// busca un task especifico por nombre
router.get('/tasks/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre
        const task = await Task.findOne({ nombre: nombre })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

// busca un task especifico y modificarlo
router.patch('/task/:nombre', async (req, res) => {
    try {
        // validacionn de campos modificables
        const datosAModificar = Object.keys(req.body)
        const modificables = ['tipo', 'estatus', 'password', 'nombre']
        const esValidaLaModificacion = datosAModificar.every(datoAModificar => modificables.includes(datoAModificar))

        if (!esValidaLaModificacion) {
            return res.status(404).send({ msg: 'Campos no existentes' })
        }

        //const task = await Task.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true })

        const nombre = req.params.nombre
        const task = await Task.findOne({ nombre: nombre })

        if (!task) {
            return res.status(404).send({ msg: 'Task no encontrada' })
        }

        datosAModificar.forEach(datoAModificar => task[datoAModificar] = req.body[datoAModificar])
        await task.save()
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

// find task by credentials
router.post('/task/login', async (req, res) => {
    try {
        const task = await Task.findByCredentials(req.body.nombre, req.body.password)
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router