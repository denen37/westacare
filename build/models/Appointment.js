"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentType = exports.AppointmentStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["CONFIRMED"] = "confirmed";
    AppointmentStatus["CANCELLED"] = "cancelled";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["NO_SHOW"] = "no_show";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var AppointmentType;
(function (AppointmentType) {
    AppointmentType["PHYSICAL"] = "physical";
    AppointmentType["VIRTUAL"] = "virtual";
})(AppointmentType || (exports.AppointmentType = AppointmentType = {}));
let Appointment = class Appointment extends sequelize_typescript_1.Model {
};
exports.Appointment = Appointment;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(200)),
    __metadata("design:type", String)
], Appointment.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(AppointmentType))),
    __metadata("design:type", String)
], Appointment.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Appointment.prototype, "datetime", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(AppointmentStatus.PENDING),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(AppointmentStatus))),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Referral),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Appointment.prototype, "referralId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Referral),
    __metadata("design:type", Models_1.Referral)
], Appointment.prototype, "referral", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Provider),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Appointment.prototype, "providerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Seeker),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Appointment.prototype, "seekerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Provider),
    __metadata("design:type", Models_1.Provider)
], Appointment.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Seeker),
    __metadata("design:type", Models_1.Seeker)
], Appointment.prototype, "seeker", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Prescription, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Appointment.prototype, "prescriptions", void 0);
exports.Appointment = Appointment = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'appointments' })
], Appointment);
