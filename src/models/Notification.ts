import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './Models'


@Table({ timestamps: true, tableName: 'notifications' })
export class Notification extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING)
    subject!: string



    @AllowNull(false)
    @Column(DataType.TEXT)
    message!: string



    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    read!: boolean



    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User
}
