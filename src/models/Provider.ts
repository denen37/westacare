import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Gender, Seeker } from './Seeker';
import { User, Centre, Qualification, Appointment, Prescription, Availability, Registration, Specialization, Favorite, Experience } from './Models';
import { Charge } from './Charge';

export enum ProviderType {
    DOCTOR = 'doctor',
    PHARMACIST = 'pharmacist',
    LAB_SCIENTIST = 'lab scientist',
}

@Table({ timestamps: true, tableName: 'providers' })
export class Provider extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Default('Dr')
    @Column(DataType.STRING(100))
    title!: string;



    @AllowNull(false)
    @ForeignKey(() => Specialization)
    @Column(DataType.INTEGER)
    specializationId!: number;


    @AllowNull(false)
    @Default(ProviderType.DOCTOR)
    @Column(DataType.ENUM(...Object.values(ProviderType)))
    category!: string;



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


    @BelongsTo(() => Specialization, { onDelete: 'CASCADE' })
    specialization!: Specialization;


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


    @HasOne(() => Experience, { onDelete: 'CASCADE' })
    experience!: Experience

    @HasMany(() => Appointment, { onDelete: 'CASCADE' })
    appointments!: Appointment[]

    @BelongsToMany(() => Seeker, () => Favorite)
    favoriteSeekers!: Seeker[]
}