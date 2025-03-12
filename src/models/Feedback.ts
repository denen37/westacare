import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './Models';


@Table({ updatedAt: false, tableName: 'ratings' })
export class Feedback extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;




    @AllowNull(false)
    @Column(DataType.FLOAT)
    rating!: number




    @AllowNull(true)
    @Column(DataType.STRING(500))
    review!: string



    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    seeker!: User



    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerCentreId!: number;


    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    providerCentre!: User

}