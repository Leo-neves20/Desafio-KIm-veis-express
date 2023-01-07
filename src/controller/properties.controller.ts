import {Request, Response} from 'express'
import { createPropertiesService, listPropertiesService } from '../service/properties.service'
import {IPropertyRequest, IPropertyResponse} from '../interfaces/properties'

export const createPropertiesController = async (req: Request, res: Response) => {
    
    const data: IPropertyRequest = req.body
    const returned = await createPropertiesService(data)

    return res.status(201).json(returned)

}

export const listPropertiesController = async (req: Request, res: Response) => {

    const returned: IPropertyResponse[]  = await listPropertiesService()
    
    return res.status(200).json(returned)

}