import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre, Provider } from './Models';

@Table({ timestamps: true, tableName: 'charges' })
export class Charge extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(true)
    @Column(DataType.STRING(100))
    phone!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    video!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    clinic!: string;



    @AllowNull(false)
    @Default('min')
    @Column(DataType.ENUM('min', 'hour'))
    unit!: string;



    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;



    @BelongsTo(() => Provider)
    provider!: Provider;
}