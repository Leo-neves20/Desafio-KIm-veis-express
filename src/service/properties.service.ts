import AppDataSource from '../data-source'
import Adresses from '../entities/addresses.entity'
import Categories from '../entities/categories.entity'
import Properties from '../entities/properties.entity'
import { AppError } from '../error/appError.error'
import {IPropertyRequest, IPropertyResponse} from '../interfaces/properties'

export const createPropertiesService = async (dataProperties: any) => {
    
    const propertiesRepository = AppDataSource.getRepository(Properties)
    const adressesRepository   = AppDataSource.getRepository(Adresses)
    const categoryRepository   = AppDataSource.getRepository(Categories)

    const stateVerify = (dataProperties.address.state).split('')
    const zipCodeVerify = (dataProperties.address.zipCode).split('')

    if(stateVerify.length > 2){
        throw new AppError('invalid state')
    }

    if(zipCodeVerify.length > 8){
        throw new AppError('inavlid zipCode')
    }

    const isAddress = await propertiesRepository.findOneBy({
        address: dataProperties.address
    })

    const isCategory = await categoryRepository.findOneBy({id: dataProperties.categoryId})

    if(isAddress){
        throw new AppError('property already exists', 409)
    }

    if(!isCategory){
        throw new AppError('Category not found', 404)

    }

    const newAdress = adressesRepository.create(dataProperties.address)
    const addressSaved = await adressesRepository.save(newAdress)
 
    const category = await categoryRepository.findOneBy({id: dataProperties.categoryId})

    const newProperty = propertiesRepository.create({
        ...dataProperties,
        address: {...addressSaved},
        category: {...category}
    })

    await propertiesRepository.save(newProperty)

    return newProperty

}

export const listPropertiesService = async (): Promise<IPropertyResponse[]> => {

    const propertiesRepository = AppDataSource.getRepository(Properties)

    const listProperties = await propertiesRepository.find()

    return listProperties

}