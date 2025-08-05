import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Seeker, Provider, Centre, Notification, Transaction, AccountDetails, Feedback, Wallet, Appointment, OnlineStatus } from './Models';

export enum UserRole {
    ADMIN = "admin",
    PROVIDER = "provider",
    SEEKER = "seeker",
    CENTRE = "centre"
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
}



export enum UserState {
    STEP_ONE = 'STEP_ONE',
    STEP_TWO = 'STEP_TWO',
    STEP_THREE = 'STEP_THREE',
    VERIFIED = 'VERIFIED',
}


@Table({ timestamps: true, tableName: 'users' })
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;


    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(50))
    email!: string;


    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    emailVerified!: boolean;




    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(20))
    phone!: string;




    @Default(UserStatus.ACTIVE)
    @Column(DataType.ENUM(UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.SUSPENDED))
    status!: UserStatus;



    @Default(UserState.STEP_TWO)
    @Column(DataType.ENUM(UserState.STEP_ONE, UserState.STEP_TWO, UserState.STEP_THREE, UserState.VERIFIED))
    state!: UserState;



    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string | undefined;


    @Default(UserRole.SEEKER)
    @Column(DataType.ENUM(UserRole.ADMIN, UserRole.SEEKER, UserRole.PROVIDER, UserRole.CENTRE))
    role!: string;



    @AllowNull(true)
    @Column(DataType.STRING)
    deviceToken!: string;


    @HasOne(() => Seeker)
    seeker!: Seeker


    @HasOne(() => Provider)
    provider!: Provider


    @HasOne(() => Centre)
    centre!: Centre

    @HasOne(() => OnlineStatus)
    onlineStatus!: OnlineStatus

    @HasMany(() => Notification, { onDelete: 'CASCADE' })
    notifications!: Notification


    @HasMany(() => Transaction, { onDelete: 'CASCADE' })
    transactions!: Transaction[]


    @HasOne(() => AccountDetails, { onDelete: 'CASCADE' })
    account!: AccountDetails

    @HasOne(() => Wallet, { onDelete: 'CASCADE' })
    wallet!: Wallet
}