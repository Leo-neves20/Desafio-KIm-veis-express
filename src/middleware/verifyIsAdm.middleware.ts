import {Request, Response, NextFunction} from 'express'

const verifyIsAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const isUserAdm = req.user.isAdm
    
    if(!isUserAdm){
        return res.status(403).json({message: 'you are not a admin'})
    }

    return next()

}

export default verifyIsAdmMiddleware