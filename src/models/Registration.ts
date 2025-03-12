import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider } from './Models';

@Table({ timestamps: true, tableName: 'registrations' })
export class Registration extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;


    @Column(DataType.STRING(20))
    regNumber!: string;


    @Column(DataType.STRING)
    regCouncil!: string;


    @Column(DataType.INTEGER)
    regYear!: number;


    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;


    @BelongsTo(() => Provider)
    provider!: Provider;
}