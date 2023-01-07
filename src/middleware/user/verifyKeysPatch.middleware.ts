import {Request, Response, NextFunction} from 'express'

const verifyKeysPatchMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const isIdKey = 'id' in req.body
    const isAdmKey = 'isAdm' in req.body
    const isActiveKey = 'isActive' in req.body

    if(isActiveKey || isAdmKey || isIdKey){
        return res.status(401).json({message: 'you can not chage keys: id, isActive and isAdm'})

    }

    return next()

}

export default verifyKeysPatchMiddleware