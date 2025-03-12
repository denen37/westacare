import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Centre } from './Models';

export enum AccreditationType {
    ACTIVE = 'active',
    PENDING = 'pending',
    EXPIRED = 'expired',
    RENWEWAL = 'renewal'
}

@Table({ timestamps: true, tableName: 'regulatory_compliance' })
export class RegulatoryCompliance extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(false)
    @Column(DataType.STRING)
    regulatoryBody!: string;




    @AllowNull(false)
    @Column(DataType.STRING(40))
    facilityLicenseNumber!: string;



    @AllowNull(false)
    @Column(DataType.DATEONLY)
    licenseIssueDate!: Date;



    @AllowNull(false)
    @Column(DataType.DATEONLY)
    licenseExpiryDate!: Date;



    @AllowNull(false)
    @Column(DataType.STRING)
    regulatoryCertificate!: string;



    @AllowNull(false)
    @Column(DataType.STRING)
    accreditingBody!: string;



    @AllowNull(false)
    @Column(DataType.STRING)
    accreditationNumber!: string;



    @AllowNull(false)
    @Column(DataType.STRING)
    accreditationType!: string;



    @AllowNull(false)
    @Column(DataType.DATEONLY)
    accreditationDate!: Date;



    @AllowNull(false)
    @Column(DataType.DATEONLY)
    accreditationExpiryDate!: Date;



    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(AccreditationType)))
    accreditationStatus!: Date;




    @ForeignKey(() => Centre)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;

    @BelongsTo(() => Centre)
    centre!: Centre;

}