import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre } from './Models';

@Table({ timestamps: true, tableName: 'staff_details' })
export class StaffDetails extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfMedicalStaff!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfNonMedicalStaff!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfNursesMidwives!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfPharmacists!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfMedLabScientists!: number;



    @ForeignKey(() => Centre)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    centreId!: number;


    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    centre!: Centre;
}