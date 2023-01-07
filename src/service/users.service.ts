import AppDataSource from "../data-source"
import Users from "../entities/user.entity"
import { AppError } from "../error/appError.error"
import { IUser, IUserRequest, IUserUpdate} from "../interfaces/users"
import { userReturnSchema } from "../schema/users.schema"

export const createUserService = async (dataCreate: IUserRequest): Promise<IUser> => {

    const usersRepository = AppDataSource.getRepository(Users)
    
    const isEmail = await usersRepository.findOneBy({email: dataCreate.email}) 
     
    if(isEmail){

        throw new AppError('Email already registered', 409)
    }
    
    const user = usersRepository.create(dataCreate)
    await usersRepository.save(user)

    const response = await userReturnSchema.validate(user, {
        stripUnknown: true
    })

    return response

}

export const listUsersService  = async (): Promise<IUser[]> => {

    const usersRepository = AppDataSource.getRepository(Users)

    const usersList = await usersRepository.find()

    return usersList 

}

export const updateUserService = async (idUser: string, dataUpdate: IUserUpdate): Promise<IUser> => {

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({id: idUser})

    await userRepository.update( idUser, {...user, ...dataUpdate})

    const response = await userReturnSchema.validate(user, {
        stripUnknown: true
    })

    return response

}

export const deleteUserService = async (idUser: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(Users)

    await userRepository.update(idUser, {isActive: false})

} 