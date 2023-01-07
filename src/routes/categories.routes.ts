import { Router } from "express";
import { createCategoriesController, listCategoriesController, listPropertiesByCategoryController } from "../controller/categories.controller";
import verifyIdCategoryMiddleware from "../middleware/categories/verifyIdCategory.middleware";
import verifyIsAdmMiddleware from "../middleware/verifyIsAdm.middleware";
import verifyTokenMiddleware from "../middleware/verifyToken.middleware";

const categoriesRouter = Router()

categoriesRouter.post('',
    verifyTokenMiddleware, 
    verifyIsAdmMiddleware, 
    createCategoriesController
)

categoriesRouter.get('', listCategoriesController)

categoriesRouter.get('/:id/properties', 
    verifyIdCategoryMiddleware, 
    listPropertiesByCategoryController
)

export default categoriesRouter