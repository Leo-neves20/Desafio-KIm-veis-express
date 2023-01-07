 import {Request, Response} from 'express'
 import {ICategoryRequest} from '../interfaces/categories'
 import { createCategoriesService, listCategoriesService, listPropertiesByCategoryService } from '../service/categories.service'

 export const createCategoriesController = async (req: Request, res: Response) => {

    const data: ICategoryRequest = req.body

    const returned = await createCategoriesService(data)

    return res.status(201).json(returned)

 }

 export const listCategoriesController = async (req: Request, res: Response) => {

    const categoryList = await listCategoriesService()

    return res.status(200).json(categoryList)

 }

 export const listPropertiesByCategoryController = async (req: Request, res: Response) => {

    const propertiesList = await listPropertiesByCategoryService(req.params.id)

    return res.status(200).json(propertiesList)

 }