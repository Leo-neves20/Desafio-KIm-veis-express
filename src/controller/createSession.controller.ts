import {Request, Response} from 'express'
import createSessionService from '../service/createSession.service'

const createSessionController = async (req: Request, res: Response) => {

    const returned: string = await createSessionService(req.body)

    return res.status(200).json({token: returned})

}

export default createSessionController