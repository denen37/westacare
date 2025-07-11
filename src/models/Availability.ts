import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre, Provider } from './Models';

export enum DaysOfWeek {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 0
}

@Table({ timestamps: true, tableName: 'availabilities' })
export class Availability extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.SMALLINT)
    startDay!: number;




    @AllowNull(false)
    @Column(DataType.SMALLINT)
    endDay!: number;



    @AllowNull(true)
    @Column(DataType.TIME)
    openingTime!: string;



    @AllowNull(true)
    @Column(DataType.TIME)
    closingTime!: string;



    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isOpen24Hours!: boolean;



    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isClosed!: boolean;


    @AllowNull(true)
    @Column(DataType.TEXT)
    notes!: string;


    @ForeignKey(() => Centre)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    centreId!: number;



    @BelongsTo(() => Centre)
    centre!: Centre;



    @ForeignKey(() => Provider)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    providerId!: number;


    @BelongsTo(() => Provider)
    provider!: Provider;
}