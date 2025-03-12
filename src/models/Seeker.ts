import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { MedicalRecord, TestReport, User, Appointment, Prescription } from './Models';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum MaritalStatus {
    SINGLE = 'single',
    MARRIED = 'married',
    DIVORCED = 'divorced',
    WIDOWED = 'widowed',
}

@Table({ timestamps: true, tableName: 'seekers' })
export class Seeker extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;


    @AllowNull(false)
    @Column(DataType.STRING(50))
    firstName!: string;


    @AllowNull(false)
    @Column(DataType.STRING(50))
    lastName!: string;


    @AllowNull(true)
    @Column(DataType.STRING)
    image!: string;


    @AllowNull(false)
    @Column(DataType.STRING(30))
    phone!: string;


    @AllowNull(true)
    @Column(DataType.DATEONLY)
    dateOfBirth!: Date;


    @AllowNull(true)
    @Column(DataType.ENUM(Gender.MALE, Gender.FEMALE))
    gender!: string;


    @AllowNull(true)
    @Column(DataType.ENUM(MaritalStatus.SINGLE, MaritalStatus.MARRIED, MaritalStatus.DIVORCED, MaritalStatus.WIDOWED))
    maritalStatus!: string;


    @AllowNull(true)
    @Column(DataType.FLOAT)
    height!: number;


    @AllowNull(true)
    @Column(DataType.FLOAT)
    weight!: number;


    @AllowNull(true)
    @Column(DataType.STRING(5))
    bloodGroup!: string;


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;



    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User;


    @HasOne(() => MedicalRecord, { onDelete: 'CASCADE' })
    medicalRecord!: MedicalRecord



    @HasMany(() => TestReport, { onDelete: 'CASCADE' })
    testReport!: TestReport


    @HasMany(() => Prescription, { onDelete: 'CASCADE' })
    prescriptions!: Prescription[]


    @HasMany(() => Appointment, { onDelete: 'CASCADE' })
    appointments!: Appointment[]
}