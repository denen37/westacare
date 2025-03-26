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
exports.Seeker = exports.MaritalStatus = exports.Gender = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "single";
    MaritalStatus["MARRIED"] = "married";
    MaritalStatus["DIVORCED"] = "divorced";
    MaritalStatus["WIDOWED"] = "widowed";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
let Seeker = class Seeker extends sequelize_typescript_1.Model {
};
exports.Seeker = Seeker;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Seeker.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], Seeker.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], Seeker.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Seeker.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], Seeker.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], Seeker.prototype, "dateOfBirth", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(Gender.MALE, Gender.FEMALE)),
    __metadata("design:type", String)
], Seeker.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(MaritalStatus.SINGLE, MaritalStatus.MARRIED, MaritalStatus.DIVORCED, MaritalStatus.WIDOWED)),
    __metadata("design:type", String)
], Seeker.prototype, "maritalStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Seeker.prototype, "height", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Seeker.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(5)),
    __metadata("design:type", String)
], Seeker.prototype, "bloodGroup", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Seeker.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.User)
], Seeker.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.MedicalInfo, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.MedicalInfo)
], Seeker.prototype, "medicalInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.TestReport, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.TestReport)
], Seeker.prototype, "testReport", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Prescription, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Seeker.prototype, "prescriptions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Appointment, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Seeker.prototype, "appointments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.MedicalHistory, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Seeker.prototype, "medicalHistory", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Referral, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Seeker.prototype, "referrals", void 0);
exports.Seeker = Seeker = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'seekers' })
], Seeker);
