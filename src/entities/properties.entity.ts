import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm'
import Adresses from './addresses.entity'
import Categories from './categories.entity'
import SchedulesUsersProperties from './schedules_users.entity'

@Entity('properties')
class Properties{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: false})
    sold: boolean

    @Column({type: 'decimal'})
    value: number

    @Column({type: 'integer'})
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Adresses) @JoinColumn()
    address: Adresses

    @ManyToOne(() => Categories)
    category: Categories

    @OneToMany(() => SchedulesUsersProperties, SchedulesUsersProperties => SchedulesUsersProperties.property)
    schedules: SchedulesUsersProperties[]

}

export default Properties
