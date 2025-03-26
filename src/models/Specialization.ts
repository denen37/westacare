import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Provider } from './Models';

@Table({ timestamps: false, tableName: 'specializations' })
export class Specialization extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    name!: string



    @HasMany(() => Provider, { onDelete: 'CASCADE' })
    providers!: Provider[]
}