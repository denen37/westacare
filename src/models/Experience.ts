import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider } from './Models';

@Table({ timestamps: true, tableName: 'experiences' })
export class Experience extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING)
    workPlace!: string;


    @AllowNull(false)
    @Column(DataType.STRING)
    jobTitle!: string;


    @AllowNull(false)
    @Column(DataType.DATEONLY)
    startDate!: string


    @AllowNull(false)
    @Column(DataType.DATEONLY)
    endDate!: string


    @AllowNull(true)
    @ForeignKey(() => Provider)
    @Column(DataType.BIGINT)
    providerId!: number;


    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    provider!: Provider;
}