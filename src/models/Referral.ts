import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Appointment, Provider, Seeker, User } from './Models'


export enum ReferralStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled'
}


@Table({ timestamps: true, tableName: 'referrals' })
export class Referral extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING)
    reason!: string;


    @AllowNull(false)
    @Column(DataType.DATE)
    datetime!: Date;



    @AllowNull(false)
    @Default(ReferralStatus.PENDING)
    @Column(DataType.ENUM(...Object.values(ReferralStatus)))
    status!: string;



    @AllowNull(true)
    @Column(DataType.TEXT)
    notes!: string;



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker;



    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    referredByProviderId!: number;



    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    referredToProviderId!: number;



    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    referredBy!: Provider;


    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    referredTo!: Provider;


    @HasOne(() => Appointment, { onDelete: 'CASCADE' })
    appointment!: Appointment;
}
