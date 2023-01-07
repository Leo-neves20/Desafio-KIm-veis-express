import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const isToken = req.headers.authorization 

    if(!isToken){
        return res.status(401).json({message: 'Token invalid'})
    }

    const token = isToken.split(' ')[1]

    return jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {

        if(error){
            return res.status(401).json({message: error.message})
        }

        req.user = {
            id: decoded.sub,
            isAdm: decoded.isAdm,
            isActive: decoded.isActive
        }
        
        return next()

    })
}

export default verifyTokenMiddleware