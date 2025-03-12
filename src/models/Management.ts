import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre } from './Models';

@Table({ timestamps: true, tableName: 'managers' })
export class Management extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING(100))
    ownerName!: string



    @AllowNull(false)
    @Column(DataType.STRING(20))
    ownerPhone!: string



    @AllowNull(true)
    @Column(DataType.STRING(100))
    ownerEmail!: string



    @AllowNull(false)
    @Column(DataType.STRING(100))
    chiefMedicalHead!: string



    @AllowNull(false)
    @Column(DataType.STRING(20))
    mdPhone!: string



    @AllowNull(false)
    @Column(DataType.STRING(40))
    mdLicenseNo!: string



    @ForeignKey(() => Centre)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    centreId!: number



    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    centre!: Centre;
}
