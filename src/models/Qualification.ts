import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider } from './Models';

@Table({ timestamps: true, tableName: 'qualifications' })
export class Qualification extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    name!: string



    @AllowNull(false)
    @Column(DataType.STRING(100))
    institution!: string



    @AllowNull(false)
    @Column(DataType.STRING(10))
    startYear!: string




    @AllowNull(false)
    @Column(DataType.STRING(10))
    endYear!: string



    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;


    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    provider!: Provider;
}