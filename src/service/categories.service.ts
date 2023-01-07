import AppDataSource from '../data-source'
import Categories from '../entities/categories.entity'
import Properties from '../entities/properties.entity'
import { AppError } from '../error/appError.error'
import {ICategoryRequest} from '../interfaces/categories'

export const createCategoriesService = async (dataCategory: ICategoryRequest) => {

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const isCategory = await categoriesRepository.findOneBy({name: dataCategory.name})

    if(isCategory){
        throw new AppError('category already exist', 409)
    }

    const newCategory = categoriesRepository.create(dataCategory)
    await categoriesRepository.save(newCategory)

    return newCategory

}

export const listCategoriesService = async () => {

    const categoryRepository = AppDataSource.getRepository(Categories)

    const categories = await categoryRepository.find()

    return categories

}

export const listPropertiesByCategoryService = async (categoryId: string) => {

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const findProperties = await categoriesRepository.findOne({
        where:{id: categoryId}, 
        relations:{properties: true}
    })

    return findProperties

} 