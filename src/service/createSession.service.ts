import AppDataSource from "../data-source"
import Users from "../entities/user.entity"
import { AppError } from "../error/appError.error"
import { IUserLogin } from "../interfaces/users"
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createSessionService = async ({email, password}: IUserLogin): Promise<string> => {

    const usersRepository    = AppDataSource.getRepository(Users)

    const user = await usersRepository.findOneBy({email: email})

    if(!user){
        throw new AppError('Email or Password invalid')
    }

    const isValidPassword = await compare(password, user.password)

    if(!isValidPassword){
        throw new AppError('Email or Password invalid', 403)
    }

    if(!user.isActive){
        throw new AppError('user not exists')
    }

    const token = jwt.sign(
        {
            isAdm: user.isAdm,
            isActive: user.isActive
        }, 
        String(process.env.SECRET_KEY), 
        {
            subject: user.id,
            expiresIn: '24h'
        }
    )

    return token

}

export default createSessionService