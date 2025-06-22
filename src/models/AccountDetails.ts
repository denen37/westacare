import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './Models';



@Table({ timestamps: true, tableName: 'account_details' })
export class AccountDetails extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string



    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(20))
    number!: string



    @AllowNull(false)
    @Column(DataType.STRING)
    bank!: string


    @AllowNull(false)
    @Column(DataType.STRING)
    recipientCode!: string


    @AllowNull(false)
    @Column(DataType.STRING(10))
    currency!: string


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User
}