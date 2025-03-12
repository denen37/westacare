import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Appointment, Prescription, Provider, Seeker } from './Models';
import { Reminder } from './Reminder';



@Table({ timestamps: true, tableName: 'prescription_items' })
export class PrescriptionItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @ForeignKey(() => Prescription)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    prescriptionId!: number;

    @BelongsTo(() => Prescription, { onDelete: 'CASCADE' })
    prescription!: Prescription;




    @AllowNull(false)
    @Column(DataType.STRING(100))
    medicine_name!: string;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    dosage!: string;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    frequency!: string;



    @AllowNull(false)
    @Column(DataType.STRING(50))
    duration!: string;



    @AllowNull(true)
    @Column(DataType.DATE)
    startDate!: Date;



    @AllowNull(false)
    @Column(DataType.TEXT)
    instructions!: string;


    @HasOne(() => Reminder)
    reminder!: Reminder
}