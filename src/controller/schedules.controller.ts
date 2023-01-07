import {Request, Response} from 'express'
import { createScheduleService, listScheduleByPropertiyService } from '../service/schedules.service'

export const createScheduleController = async (req: Request, res: Response) => {

    const sheduleData = req.body
    const returned = await createScheduleService(sheduleData)

    return res.status(201).json(returned)

}

export const listScheduleByPropertiyController  = async (req: Request, res: Response) => {

    const id: string = req.params.id
    const schedulesList = await  listScheduleByPropertiyService(id)

    return res.status(200).json(schedulesList)

}