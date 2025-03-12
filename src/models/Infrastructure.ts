import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre } from './Models';

@Table({ timestamps: true, tableName: 'infrastructures' })
export class Infrastructure extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;




    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfBeds!: number;



    @AllowNull(false)
    @Column(DataType.INTEGER)
    numOfConsultationRooms!: number;




    @AllowNull(false)
    @Column(DataType.STRING)
    availableSpecialties!: string;



    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    hasEmergencyServices!: boolean;



    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    hasLabDiagnosticsEquiment!: boolean;




    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    hasPharmacyServices!: boolean;


    @ForeignKey(() => Centre)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    centreId!: number;



    @BelongsTo(() => Centre, { onDelete: 'CASCADE' })
    centre!: Centre;
}