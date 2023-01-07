import {Request, Response, NextFunction} from 'express'
import AppDataSource from '../../data-source'
import Categories from '../../entities/categories.entity'

const verifyIdCategoryMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const categoryRepository = AppDataSource.getRepository(Categories)

    const isCategory = await categoryRepository.findOneBy({id: req.params.id})

    if(!isCategory){
        return res.status(404).json({message: 'category not found'})
    }

    return next()

}

export default verifyIdCategoryMiddleware