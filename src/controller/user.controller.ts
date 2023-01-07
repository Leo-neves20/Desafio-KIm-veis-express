import {Request, Response} from 'express'
import { instanceToPlain } from "class-transformer"
import { createUserService, deleteUserService, listUsersService, updateUserService } from '../service/users.service'
import { IUser } from '../interfaces/users'

export const createUserController = async (req: Request, res: Response) => {
    
    const returned: IUser = await createUserService(req.body)

    return res.status(201).json(returned)

}

export const listUsersController  = async (req: Request, res: Response) => {

    const listOfUsers: IUser[] = await listUsersService()

    return res.status(200).json(instanceToPlain(listOfUsers))

}

export const updateUserController = async (req: Request, res: Response) => {

    const returned: IUser = await updateUserService(req.params.id, req.body)

    return res.status(200).json(returned)

}

export const deleteUserController = async (req: Request, res: Response) => {

    const returned: void = await deleteUserService(req.params.id)

    return res.status(204).json()

}