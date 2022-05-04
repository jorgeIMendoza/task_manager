import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'nuevakey')
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