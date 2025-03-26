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
exports.MedicalHistory = exports.MedicalService = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var MedicalService;
(function (MedicalService) {
    MedicalService["CONSULTATION"] = "consultation";
    // DIAGNOSIS = 'diagnosis',
    MedicalService["TREATMENT"] = "treatment";
    // PRESCRIPTION = 'prescription',
    MedicalService["TEST"] = "test";
    MedicalService["PHYSIOTHERAPY"] = "physiotherapy";
    MedicalService["SURGERY"] = "surgery";
    MedicalService["EMERGENCY"] = "emergency";
})(MedicalService || (exports.MedicalService = MedicalService = {}));
let MedicalHistory = class MedicalHistory extends sequelize_typescript_1.Model {
};
exports.MedicalHistory = MedicalHistory;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(MedicalService))),
    __metadata("design:type", String)
], MedicalHistory.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], MedicalHistory.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], MedicalHistory.prototype, "file", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Provider),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "providerId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Seeker),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "seekerId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Centre),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "centreId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Appointment),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Provider, 'providerId'),
    __metadata("design:type", Models_1.Provider)
], MedicalHistory.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Seeker, 'seekerId'),
    __metadata("design:type", Models_1.Seeker)
], MedicalHistory.prototype, "seeker", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Centre, 'centreId'),
    __metadata("design:type", Models_1.Centre)
], MedicalHistory.prototype, "centre", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Appointment, 'appointmentId'),
    __metadata("design:type", Models_1.Appointment)
], MedicalHistory.prototype, "appointment", void 0);
exports.MedicalHistory = MedicalHistory = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'medical_history' })
], MedicalHistory);
