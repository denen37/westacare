import { Table, Model, Column, DataType, HasOne, BelongsToMany, HasMany, AllowNull, Unique, Default, Index, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

export enum OTPType {
    EMAIL = 'email',
    PHONE = 'phone'
}

export enum OTPReason {
    FORGOT_PASSWORD = 'forgot_password',
    VERIFY_EMAIL = 'verify_email',
    VERIFY_PHONE = 'verify_phone',
    CHANGE_EMAIL = 'change_email',
}


@Table({ timestamps: false, tableName: 'otps' })
export class OTP extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING(100))
    email!: string;

    @Column(DataType.STRING)
    otp!: string;

    @Column(DataType.DATE)
    expiresAt!: Date;

    @Column(DataType.BOOLEAN)
    isVerified!: boolean;
}