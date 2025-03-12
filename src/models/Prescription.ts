import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Appointment, PrescriptionItem, Provider, Seeker } from './Models';



@Table({ timestamps: true, tableName: 'prescriptions' })
export class Prescription extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;

    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker;




    @ForeignKey(() => Provider)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    providerId!: number;

    @BelongsTo(() => Provider, { onDelete: 'CASCADE' })
    provider!: Provider;



    @ForeignKey(() => Appointment)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    appointmentId!: number;

    @BelongsTo(() => Appointment, { onDelete: 'CASCADE' })
    appointment!: Appointment;




    @AllowNull(false)
    @Column(DataType.DATE)
    date!: string;



    @AllowNull(true)
    @Column(DataType.TEXT)
    notes!: string;




    @HasMany(() => PrescriptionItem, { onDelete: 'CASCADE' })
    prescriptionItems!: PrescriptionItem[]
}