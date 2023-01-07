import { Router } from "express";
import { createScheduleController, listScheduleByPropertiyController } from "../controller/schedules.controller";
import verifyIsAdmMiddleware from "../middleware/verifyIsAdm.middleware";
import verifyTokenMiddleware from "../middleware/verifyToken.middleware";

const schedulesRoutes = Router()

schedulesRoutes.post('', 
    verifyTokenMiddleware, 
    createScheduleController
)

schedulesRoutes.get('/properties/:id', 
    verifyTokenMiddleware,
    verifyIsAdmMiddleware,
    listScheduleByPropertiyController

)

export default schedulesRoutes