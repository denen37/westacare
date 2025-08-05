import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ChatRoom } from './ChatRoom';
import { User } from './User';

@Table({ timestamps: false, tableName: 'messages' })
export class Message extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    from!: number



    @AllowNull(false)
    @Column(DataType.TEXT)
    text!: string



    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted!: boolean



    @AllowNull(false)
    @Column(DataType.DATE)
    timestamp!: Date



    @AllowNull(false)
    @ForeignKey(() => ChatRoom)
    @Column(DataType.BIGINT)
    chatroomId!: number



    @BelongsTo(() => ChatRoom, 'chatroomId')
    chatroom!: ChatRoom
}
