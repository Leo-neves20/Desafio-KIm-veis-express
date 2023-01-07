import {getRounds, hashSync} from 'bcrypt'
import { Exclude } from 'class-transformer'
import {
    Entity,
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    BeforeInsert,
    BeforeUpdate,
    OneToMany
} from 'typeorm'
import SchedulesUsersProperties from './schedules_users.entity'

@Entity('users')
class Users{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column({default: true})
    isActive: boolean

    @Column()
    isAdm: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){

        this.password = hashSync(this.password, 10)

    }

    @OneToMany(() => SchedulesUsersProperties, SchedulesUsersProperties => SchedulesUsersProperties.user)
    schedules: SchedulesUsersProperties[]

}

export default Users