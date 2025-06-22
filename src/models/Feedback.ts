import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Centre, Provider, Seeker } from './Models';


@Table({ updatedAt: false, tableName: 'feedbacks' })
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



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker



    @ForeignKey(() => Provider)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    providerId!: number;

    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    provider!: Provider


    @ForeignKey(() => Centre)
    @AllowNull(true)
    @Column(DataType.BIGINT)
    centreId!: number;



    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    centre!: Centre

}