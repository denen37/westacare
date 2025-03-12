import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Centre } from './Models';


@Table({ timestamps: true, tableName: 'centre_documents' })
export class CentreDocument extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(true)
    @Column(DataType.STRING)
    certOfIncorporation!: string;



    @AllowNull(true)
    @Column(DataType.STRING(40))
    tin!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    adminIdCard!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    facilityLayoutPlan!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    fireSafetyCert!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    envHealthPermit!: string;


    @ForeignKey(() => Centre)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    centreId!: number;


    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    centre!: Centre;
}