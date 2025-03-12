import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, Is, PrimaryKey, AutoIncrement, IsDate } from 'sequelize-typescript';
import { PrescriptionItem, User } from './Models';

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



    // @Is(function setFutureOneoffDate(value: Date, options: { instance: Reminder }):void { 
    //     if(options.instance.recurrence === 'oneoff' && value <= new Date()) {
    //     throw new Error('One-off reminder date must be in the future');
    // }})
    @IsDate
    @AllowNull(false)
    @Column(DataType.DATE)
    time!: Date



    @AllowNull(false)
    @Default(Recurrence.ONEOFF)
    @Column(DataType.ENUM(...Object.values(Recurrence)))
    recurrence!: string



    @AllowNull(false)
    @Default(ReminderStatus.ONGOING)
    @Column(DataType.ENUM(...Object.values(ReminderStatus)))
    status!: string



    @ForeignKey(() => PrescriptionItem)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    prescriptionItemId!: number;



    @BelongsTo(() => PrescriptionItem)
    medicine!: PrescriptionItem;
}