import { Router } from "express";
import createSessionController from "../controller/createSession.controller";

const sessionRoutes = Router()

sessionRoutes.post('', createSessionController)

export default sessionRoutes