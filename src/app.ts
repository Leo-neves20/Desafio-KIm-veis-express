import "express-async-errors"
import "reflect-metadata"
import express from "express"
import { handleError } from "./error/appError.error"
import usersRouter from "./routes/users.routes"
import sessionRoutes from "./routes/session.routes"
import propertiesRoutes from "./routes/properties.routes"
import categoriesRouter from "./routes/categories.routes"
import schedulesRoutes from "./routes/schedules.routes"

sessionRoutes

const app = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/login', sessionRoutes)
app.use('/properties', propertiesRoutes)
app.use('/categories', categoriesRouter)
app.use('/schedules', schedulesRoutes)

app.use(handleError)

export default app