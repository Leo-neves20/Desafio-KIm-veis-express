import { Router } from "express";
import { createPropertiesController, listPropertiesController } from "../controller/properties.controller";
import verifyIsAdmMiddleware from "../middleware/verifyIsAdm.middleware";
import verifyTokenMiddleware from "../middleware/verifyToken.middleware";

const propertiesRoutes = Router()

propertiesRoutes.post('', 
    verifyTokenMiddleware, 
    verifyIsAdmMiddleware, 
    createPropertiesController
)

propertiesRoutes.get('', 
    listPropertiesController
)

export default propertiesRoutes