import mongoose from 'mongoose'
import chalk from 'chalk'


// variables de entorno
const USER = process.env.MONGO_USER
const PASSWORD = process.env.MONGO_PASSWORD
const DB = process.env.MONGO_DB // BD en la que el usuario tiene acceso
const PORT = process.env.MONGO_PORT
const HOST = process.env.MONGO_HOST
const conectionURL = 'mongodb://' + HOST + ':' + PORT
// opciones para la conexion
const options = {
    user: USER,
    pass: PASSWORD,
    authSource: DB,
    dbName: DB,
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

try {
    // creo la conexion
    mongoose.connect(conectionURL, options, () => {
        console.log(chalk.green.inverse('conexion'), 'CONECTADO...')
    })
} catch (error) {
    console.log(chalk.red.inverse('conexion'), 'No se puede conectar a la BD ', error)
}
