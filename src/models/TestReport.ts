import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider, Seeker } from './Models';



@Table({ timestamps: true, tableName: 'test_reports' })
export class TestReport extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    title!: string



    @AllowNull(false)
    @Column(DataType.STRING(100))
    doctorName!: string



    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date!: Date



    @AllowNull(true)
    @Column(DataType.STRING)
    description!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    image!: string



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;



    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker

    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    provider!: Provider
}