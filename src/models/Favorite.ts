import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { User, Seeker, Provider } from './Models';

@Table({ timestamps: true, tableName: 'favorites' })
export class Favorite extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @ForeignKey(() => Seeker)
    @Column(DataType.BIGINT)
    seekerId!: number;



    @AllowNull(false)
    @ForeignKey(() => Provider)
    @Column(DataType.BIGINT)
    providerId!: number;
}