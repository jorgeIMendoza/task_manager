import jwt from 'jsonwebtoken'
import User from '../models/user.js'


// constantes
const EXPIRATION_TIME = '30s'
const SECRET_KEY = 'nuevakey'

// middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

       if (!user){
           throw new Error()
       }

       req.user = user
       next()


    }
    catch (e) {
        res.status(401).send({ error: 'Favor de logearse' })
    }
}


export default auth
export {EXPIRATION_TIME, SECRET_KEY}