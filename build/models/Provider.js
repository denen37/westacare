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
exports.Provider = exports.ProviderType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Seeker_1 = require("./Seeker");
const Models_1 = require("./Models");
const Charge_1 = require("./Charge");
var ProviderType;
(function (ProviderType) {
    ProviderType["DOCTOR"] = "doctor";
    ProviderType["PHARMACIST"] = "pharmacist";
    ProviderType["LAB_SCIENTIST"] = "lab scientist";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
let Provider = class Provider extends sequelize_typescript_1.Model {
};
exports.Provider = Provider;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Provider.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)('Dr'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Specialization),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Provider.prototype, "specializationId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(ProviderType.DOCTOR),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(ProviderType))),
    __metadata("design:type", String)
], Provider.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Provider.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Provider.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Provider.prototype, "about", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(Seeker_1.Gender.MALE, Seeker_1.Gender.FEMALE)),
    __metadata("design:type", String)
], Provider.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], Provider.prototype, "dateOfBirth", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(150)),
    __metadata("design:type", String)
], Provider.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Provider.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Provider.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Centre),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Provider.prototype, "centreId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Specialization, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Specialization)
], Provider.prototype, "specialization", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Centre, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Centre)
], Provider.prototype, "healthCentre", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.User)
], Provider.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.Qualification, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Qualification)
], Provider.prototype, "qualification", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Prescription, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Provider.prototype, "prescriptions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Availability, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Provider.prototype, "availabilities", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.Registration, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Registration)
], Provider.prototype, "registration", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Charge_1.Charge, { onDelete: 'CASCADE' }),
    __metadata("design:type", Charge_1.Charge)
], Provider.prototype, "charge", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.Experience, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Experience)
], Provider.prototype, "experience", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Appointment, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Provider.prototype, "appointments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Seeker_1.Seeker, () => Models_1.Favorite),
    __metadata("design:type", Array)
], Provider.prototype, "favoriteSeekers", void 0);
exports.Provider = Provider = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'providers' })
], Provider);
