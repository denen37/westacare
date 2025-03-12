import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User, Centre, Qualification, Seeker } from './Models';


@Table({ timestamps: true, tableName: 'medical_records' })
export class MedicalRecord extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;



    @AllowNull(true)
    @Column(DataType.STRING)
    allergies!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    currMed!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    pastMed!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    chronicDisease!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    injuries!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    surgeries!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    smokingHabits!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    alcoholConsumption!: string



    @AllowNull(true)
    @Column(DataType.STRING)
    activityLevel!: string



    @ForeignKey(() => Seeker)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    seekerId!: number;


    @BelongsTo(() => Seeker, { onDelete: 'CASCADE' })
    seeker!: Seeker;
}