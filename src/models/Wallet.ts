import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { User } from './Models';

@Table({ timestamps: true, tableName: 'wallets' })
export class Wallet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    userId!: number;



    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    balance!: number;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    currency!: string;



    @BelongsTo(() => User)
    user!: User;
}