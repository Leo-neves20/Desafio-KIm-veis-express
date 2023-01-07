import * as yup from 'yup'
import {SchemaOf} from 'yup'
import {IUser, IUserRequest, IUserUpdate} from '../interfaces/users/index'

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
})

export const userReturnSchema: SchemaOf<IUser> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
})

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string(),
    name: yup.string(),
    password: yup.string(),
})
