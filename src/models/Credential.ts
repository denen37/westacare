import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre, Provider } from './Models';

@Table({ timestamps: true, tableName: 'credentials' })
export class Credential extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(true)
    @Column(DataType.STRING)
    name!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    filePath!: string;



    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;



    @BelongsTo(() => Provider)
    provider!: Provider;
}