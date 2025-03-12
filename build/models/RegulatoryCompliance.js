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
exports.RegulatoryCompliance = exports.AccreditationType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var AccreditationType;
(function (AccreditationType) {
    AccreditationType["ACTIVE"] = "active";
    AccreditationType["PENDING"] = "pending";
    AccreditationType["EXPIRED"] = "expired";
    AccreditationType["RENWEWAL"] = "renewal";
})(AccreditationType || (exports.AccreditationType = AccreditationType = {}));
let RegulatoryCompliance = class RegulatoryCompliance extends sequelize_typescript_1.Model {
};
exports.RegulatoryCompliance = RegulatoryCompliance;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], RegulatoryCompliance.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "regulatoryBody", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(40)),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "facilityLicenseNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RegulatoryCompliance.prototype, "licenseIssueDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RegulatoryCompliance.prototype, "licenseExpiryDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "regulatoryCertificate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "accreditingBody", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "accreditationNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], RegulatoryCompliance.prototype, "accreditationType", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RegulatoryCompliance.prototype, "accreditationDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], RegulatoryCompliance.prototype, "accreditationExpiryDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(AccreditationType))),
    __metadata("design:type", Date)
], RegulatoryCompliance.prototype, "accreditationStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Centre),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], RegulatoryCompliance.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Centre),
    __metadata("design:type", Models_1.Centre)
], RegulatoryCompliance.prototype, "centre", void 0);
exports.RegulatoryCompliance = RegulatoryCompliance = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'regulatory_compliance' })
], RegulatoryCompliance);
