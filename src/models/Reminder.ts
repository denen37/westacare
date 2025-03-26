import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, Is, PrimaryKey, AutoIncrement, IsDate } from 'sequelize-typescript';
import { PrescriptionItem, Seeker, User } from './Models';

export enum Recurrence {
    ONEOFF = 'oneoff',
    DAILY = 'daily'
}


export enum ReminderStatus {
    ONGOING = 'ongoing',
    CANCELLED = 'cancelled'
}



@Table({ updatedAt: false, tableName: 'reminders' })
export class Reminder extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;


    @IsDate
    @AllowNull(false)
    @Default(new Date())
    @Column(DataType.DATEONLY)
    startDate!: Date


    @IsDate
    @AllowNull(true)
    @Column(DataType.DATEONLY)
    endDate!: Date



    @AllowNull(false)
    @Column(DataType.JSON)
    times!: string



    @AllowNull(false)
    @Default(Recurrence.ONEOFF)
    @Column(DataType.ENUM(...Object.values(Recurrence)))
    recurrence!: string



    @AllowNull(false)
    @Column(DataType.STRING)
    medicine!: string


    @AllowNull(false)
    @Column(DataType.STRING(20))
    dosage!: string


    @AllowNull(false)
    @Default(ReminderStatus.ONGOING)
    @Column(DataType.ENUM(...Object.values(ReminderStatus)))
    status!: string


    @AllowNull(false)
    @ForeignKey(() => Seeker)
    @Column(DataType.BIGINT)
    seekerId!: number


    @BelongsTo(() => Seeker)
    seeker!: Seeker
}