import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { User } from './Models';



@Table({ timestamps: true, tableName: 'online_users' })
export class OnlineStatus extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;


    @AllowNull(false)
    @Column(DataType.STRING)
    socketId!: string;


    @AllowNull(false)
    @Column(DataType.DATE)
    lastActive!: Date;


    @Default(false)
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isOnline!: boolean;


    @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
    user!: User;
}
