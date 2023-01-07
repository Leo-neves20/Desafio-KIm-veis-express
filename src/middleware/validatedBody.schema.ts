import * as yup from 'yup'
import { AnySchema } from 'yup'
import {Request, Response, NextFunction} from 'express'

const validatedBody =  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const validated = await schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })

        req.body = validated

        return next()
        
    } catch (error) {
        
        return res.status(400).json({error: error})

    }

}

export default validatedBody