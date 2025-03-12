import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider, Seeker, User, Referral, Prescription } from './Models';



export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    NO_SHOW = 'no_show'
}


export enum AppointmentType {
    PHYSICAL = 'physical',
    VIRTUAL = 'virtual',
}


@Table({ timestamps: true, tableName: 'appointments' })
export class Appointment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(true)
    @Column(DataType.STRING(200))
    location!: string;


    @AllowNull(true)
    @Column(DataType.ENUM(...Object.values(AppointmentType)))
    type!: string;



    @AllowNull(false)
    @Column(DataType.DATE)
    datetime!: Date;



    @AllowNull(true)
    @Column(DataType.STRING)
    notes!: string;



    @AllowNull(false)
    @Default(AppointmentStatus.PENDING)
    @Column(DataType.ENUM(...Object.values(AppointmentStatus)))
    status!: string;



    @ForeignKey(() => Referral)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    referralId!: number;



    @BelongsTo(() => Referral)
    referral!: Referral;




    @ForeignKey(() => Provider)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    providerId!: number;



    @ForeignKey(() => Seeker)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    seekerId!: number;



    @BelongsTo(() => Provider)
    provider!: Provider;



    @BelongsTo(() => Seeker)
    seeker!: Seeker;



    @HasMany(() => Prescription, { onDelete: 'CASCADE' })
    prescriptions!: Prescription[];
}