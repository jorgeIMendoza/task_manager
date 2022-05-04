import mongodb from 'mongodb'

const conectionURL = 'mongodb://usrNuevaTablaLeeEscribe:123@127.0.0.1:27017/?authSource=nuevaBDPrueba'
const databaseName = 'nuevaBDPrueba'
const objNuevo = [
    {
        "item": "motos4",
        "qty": 14
    }
]

try {
    // creo el cliente
    const client = await conexion(conectionURL)

    // asigno la BD
    const db = client.db(databaseName)

    // // hago la operacion
    // const result = await insertar(db, objNuevo)

    // busco un pais
    const busqueda = await buscar(db, { name: 'México' })

    // muestro en consola
    console.log('RESULTADO: ', busqueda)

    // // actualizo un pais
    // const mod = await modificar(db, {id:42})
    // console.log('Se actualizaron ' + mod.modifiedCount + ' registros')

    // // borro un pais
    // const eli = await borrar(db, {id:42})
    // console.log('Se borraron ' + eli.deletedCount + ' registros')

} catch (error) {
    console.log('ERROR: ' + error)
}

function conexion(conectionURL) {
    try {
        const MongoClient = mongodb.MongoClient
        return MongoClient.connect(conectionURL, { useNewURLParser: true })
    } catch (error) {
        return console.log('No se puede conectar a la BD ', error)
    }

}

function insertar(db, nuevo) {
    try {
        return db.collection('paises').insertMany(nuevo)

    } catch (error) {
        return console.log('No se puede insertar en la BD ' + error)
    }
}

function buscar(db, filtro) {
    try {
        return db.collection('paises').find(filtro).toArray()

    } catch (error) {
        return console.log('No se puede buscar en la BD ' + error)
    }
}


function modificar(db, filtro) {
    try {
        return db.collection('paises').updateOne(
            filtro
            ,
            {
                $set: {
                    name: "Goooooooool de Méxicooooo"
                }
            }

        )
    } catch (error) {
        return console.log('No se puede actualizar en la BD ' + error)
    }
}


function borrar(db, filtro) {
    try {
        return db.collection('paises').deleteOne(filtro)
    } catch (error) {
        return console.log('No se puede borrar en la BD ' + error)
    }
}