import AppDataSource from '../data-source'
import Properties from '../entities/properties.entity'
import SchedulesUsersProperties from '../entities/schedules_users.entity'
import Users from '../entities/user.entity'
import { AppError } from '../error/appError.error'
import {IScheduleRequest} from '../interfaces/schedules'

export const createScheduleService = async (scheduleData: IScheduleRequest): Promise<{}> => {

    const scheduleRepository  = AppDataSource.getRepository(SchedulesUsersProperties)
    const propertyRepository  = AppDataSource.getRepository(Properties)
    const userRepository      = AppDataSource.getRepository(Users)

    const findUser     = await userRepository.findOneBy({id: scheduleData.userId})
    
    if(!findUser){
        throw new AppError('User not found', 404)
    }
    
    const findProperty = await propertyRepository.findOneBy({id: scheduleData.propertyId})

    if(!findProperty){
        throw new AppError('property not found', 404)
    }

    const dateScheduleFormated = scheduleData.hour.split(':')
    const hourSchedule = Number(dateScheduleFormated[0] + dateScheduleFormated[1])

    if(hourSchedule < 800 || hourSchedule > 1800){
        throw new AppError('Visiting hours need to be between 8am and 6pm')
    }

    const date = new Date(scheduleData.date).toDateString().split(' ')[0]

    if(date === 'Sat' || date === 'Sun'){
        throw new AppError('You only able to schedule on work day')
    }
    
    const isDateAndHourScheduleProperty =  await scheduleRepository.createQueryBuilder('schedules_users_properties')
    .innerJoinAndSelect('schedules_users_properties.property', 'property')
    .where('schedules_users_properties.date = :date', {date: scheduleData.date})
    .andWhere('schedules_users_properties.hour = :hour', {hour: scheduleData.hour})
    .andWhere('property.id = :id_property', {id_property: scheduleData.propertyId})
    .getMany()

    if(isDateAndHourScheduleProperty.length > 0){
        throw new AppError('Date and Hour is unvaliable', 409)
    }

    const isSameDateAndHourScheduleInOtherProperty = await scheduleRepository.createQueryBuilder('schedules_users_properties')
    .innerJoinAndSelect('schedules_users_properties.property', 'property')
    .innerJoinAndSelect('schedules_users_properties.user', 'users')
    .where('schedules_users_properties.date = :date', {date: scheduleData.date})
    .andWhere('schedules_users_properties.hour = :hour', {hour: scheduleData.hour})
    .andWhere('property.id != :id_property', {id_property: scheduleData.propertyId})
    .andWhere('users.id = :id_user', {id_user: scheduleData.userId})
    .getMany()

    if(isSameDateAndHourScheduleInOtherProperty.length > 0){
        throw new AppError('User has already registred date and hour in other property', 409)
    }

    const newSchedules = scheduleRepository.create({...scheduleData, property: findProperty, user: findUser})
    await scheduleRepository.save(newSchedules)

    return {message: 'successful registration'}

}

export const listScheduleByPropertiyService = async (idProperty: string) => {

    const propertyRepository = AppDataSource.getRepository(Properties)
    const schedulesRepository = AppDataSource.getRepository(SchedulesUsersProperties)

    const findProperty = await propertyRepository.findOneBy({id: idProperty})

    if(!findProperty){
        throw new AppError('property not found', 404)
    }

    const schedulesProperty = await propertyRepository.createQueryBuilder('properties')
    .innerJoinAndSelect('properties.schedules', 'schedules')
    .innerJoinAndSelect('schedules.property', 'property')
    .innerJoinAndSelect('schedules.user', 'users')
    .where('property.id = :id', {id: idProperty})
    .getMany()

    const schedule = {
        schedules: schedulesProperty[0].schedules,
    }

   return schedule
 
}