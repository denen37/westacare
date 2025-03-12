import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User, Management, RegulatoryCompliance, Infrastructure, Provider, StaffDetails, CentreDocument, Availability } from './Models';

export enum FacilityType {
    HOSPITAL = 'hospital',
    CLINIC = 'clinic',
    PHARMACY = 'pharmacy',
    LAB = 'laboratory',
    DIAGNOSTIC = 'diagnostic centre'
}

export enum FacilityCategory {
    PRIVATE = 'private',
    PUBLIC = 'public',
    NGO = 'NGO',
    MISSIONARY = 'missionary'
}

@Table({ timestamps: true, tableName: 'centres' })
export class Centre extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    name!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    image!: string;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    regNo!: string;


    @AllowNull(false)
    @Column(DataType.DATEONLY)
    dateOfEst!: Date;


    @AllowNull(true)
    @Column(DataType.STRING(150))
    address!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    city!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    state!: string;


    @AllowNull(true)
    @Column(DataType.STRING(100))
    country!: string;


    @AllowNull(true)
    @Column(DataType.TEXT)
    about!: string;


    @AllowNull(false)
    @Column(DataType.STRING(30))
    phone!: string;


    @AllowNull(true)
    @Column(DataType.STRING(20))
    telephone!: string;


    @AllowNull(true)
    @Column(DataType.STRING(50))
    website!: string;


    @AllowNull(true)
    @Column(DataType.STRING(20))
    emergencyPhone!: string;


    @AllowNull(false)
    @Default(FacilityType.HOSPITAL)
    @Column(DataType.ENUM(...Object.values(FacilityType)))
    type!: string;


    @AllowNull(false)
    @Default(FacilityCategory.PUBLIC)
    @Column(DataType.ENUM(...Object.values(FacilityCategory)))
    category!: string;


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User;



    @HasOne(() => Management)
    management!: Management;


    @HasOne(() => RegulatoryCompliance)
    regulatoryCompliance!: RegulatoryCompliance;


    @HasOne(() => Infrastructure)
    infrastructure!: Infrastructure;


    @HasMany(() => Provider)
    providers!: Provider[]


    @HasOne(() => StaffDetails)
    staffDetails!: StaffDetails


    @HasOne(() => CentreDocument)
    centreDocument!: CentreDocument

    @HasMany(() => Availability)
    availability!: Availability[]
}