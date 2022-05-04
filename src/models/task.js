import chalk from 'chalk'
import validator from 'validator'
import mongoose from 'mongoose'

// Modelo de task
const modeloTask =
{
    tipo: {
        type: String,
        required: true,
        enum: { values: ['Tarea', 'Recordatorio', 'Especificacion'], message: '{value} no es una opcion' }
    },
    estatus: {
        type: Boolean,
        required: true
    },
    nombre: {
        type: String,
        unique: true,
        required: true,
        minLength: [3, 'Nombre debe ser de longitud al menos 3: {VALUE}'],
        maxLength: [12, 'Nombre debe ser de longitud maxima 12: {VALUE}'],
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error(chalk.red.inverse('Campo nombre no acepta numeros, espacios o caracteres especiales'))
            }
        }
    }
}

// Schema de task
const taskSchema = new mongoose.Schema(modeloTask)

const Task = mongoose.model('Task', taskSchema)

export default Task