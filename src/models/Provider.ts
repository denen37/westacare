import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Gender } from './Seeker';
import { User, Centre, Qualification, Appointment, Prescription, Availability, Registration } from './Models';
import { Charge } from './Charge';

@Table({ timestamps: true, tableName: 'providers' })
export class Provider extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;


    @AllowNull(false)
    @Column(DataType.STRING(100))
    firstName!: string;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    lastName!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    image!: string;


    // @AllowNull(false)
    // @Column(DataType.STRING(30))
    // phone!: string;


    @AllowNull(true)
    @Column(DataType.INTEGER)
    yearsOfExperience!: number;


    @AllowNull(true)
    @Column(DataType.TEXT)
    about!: string;


    @AllowNull(true)
    @Column(DataType.ENUM(Gender.MALE, Gender.FEMALE))
    gender!: string;


    @AllowNull(true)
    @Column(DataType.DATEONLY)
    dateOfBirth!: Date;


    @AllowNull(true)
    @Column(DataType.STRING(150))
    address!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    city!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    country!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    clinic!: string;


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;



    @ForeignKey(() => Centre)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    centreId!: number;


    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    healthCentre!: Centre;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User;


    @HasOne(() => Qualification, { onDelete: 'CASCADE' })
    qualification!: Qualification


    @HasMany(() => Prescription, { onDelete: 'CASCADE' })
    prescriptions!: Prescription[];


    @HasMany(() => Availability, { onDelete: 'CASCADE' })
    availabilities!: Availability[]

    @HasOne(() => Registration, { onDelete: 'CASCADE' })
    registration!: Registration

    @HasOne(() => Charge, { onDelete: 'CASCADE' })
    charge!: Charge

    @HasMany(() => Appointment, { onDelete: 'CASCADE' })
    appointments!: Appointment[]
}