import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Seeker } from './Models';



@Table({ timestamps: true, tableName: 'test_reports' })
export class TestReport extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    reportName!: string



    @AllowNull(false)
    @Column(DataType.STRING(100))
    doctorName!: string



    @AllowNull(false)
    @Column(DataType.DATE)
    timestamp!: Date



    @AllowNull(true)
    @Column(DataType.DATE)
    description!: Date



    @AllowNull(true)
    @Column(DataType.STRING)
    image!: string



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker
}