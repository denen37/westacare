import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Centre, Seeker, Provider, Appointment } from './Models';


export enum MedicalService {
    CONSULTATION = 'consultation',
    // DIAGNOSIS = 'diagnosis',
    TREATMENT = 'treatment',
    // PRESCRIPTION = 'prescription',
    TEST = 'test',
    PHYSIOTHERAPY = 'physiotherapy',
    SURGERY = 'surgery',
    EMERGENCY = 'emergency',
}

@Table({ timestamps: true, tableName: 'medical_history' })
export class MedicalHistory extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;


    @AllowNull(false)
    @Column(DataType.DATE)
    date!: Date


    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(MedicalService)))
    service!: MedicalService


    @AllowNull(true)
    @Column(DataType.TEXT)
    notes!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    file!: string;



    @AllowNull(false)
    @ForeignKey(() => Provider)
    @Column(DataType.BIGINT)
    providerId!: number;


    @AllowNull(false)
    @ForeignKey(() => Seeker)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @AllowNull(true)
    @ForeignKey(() => Centre)
    @Column(DataType.BIGINT)
    centreId!: number;


    @AllowNull(false)
    @ForeignKey(() => Appointment)
    @Column(DataType.BIGINT)
    appointmentId!: number;


    @BelongsTo(() => Provider, 'providerId')
    provider!: Provider;


    @BelongsTo(() => Seeker, 'seekerId')
    seeker!: Seeker;


    @BelongsTo(() => Centre, 'centreId')
    centre!: Centre;


    @BelongsTo(() => Appointment, 'appointmentId')
    appointment!: Appointment;
}