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
exports.Centre = exports.FacilityCategory = exports.FacilityType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var FacilityType;
(function (FacilityType) {
    FacilityType["HOSPITAL"] = "hospital";
    FacilityType["CLINIC"] = "clinic";
    FacilityType["PHARMACY"] = "pharmacy";
    FacilityType["LAB"] = "laboratory";
    FacilityType["DIAGNOSTIC"] = "diagnostic centre";
})(FacilityType || (exports.FacilityType = FacilityType = {}));
var FacilityCategory;
(function (FacilityCategory) {
    FacilityCategory["PRIVATE"] = "private";
    FacilityCategory["PUBLIC"] = "public";
    FacilityCategory["NGO"] = "NGO";
    FacilityCategory["MISSIONARY"] = "missionary";
})(FacilityCategory || (exports.FacilityCategory = FacilityCategory = {}));
let Centre = class Centre extends sequelize_typescript_1.Model {
};
exports.Centre = Centre;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Centre.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Centre.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Centre.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], Centre.prototype, "regNo", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], Centre.prototype, "dateOfEst", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(150)),
    __metadata("design:type", String)
], Centre.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Centre.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Centre.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Centre.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Centre.prototype, "about", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], Centre.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], Centre.prototype, "telephone", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], Centre.prototype, "website", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], Centre.prototype, "emergencyPhone", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(FacilityType.HOSPITAL),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(FacilityType))),
    __metadata("design:type", String)
], Centre.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(FacilityCategory.PUBLIC),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(FacilityCategory))),
    __metadata("design:type", String)
], Centre.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Centre.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.User)
], Centre.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.Management),
    __metadata("design:type", Models_1.Management)
], Centre.prototype, "management", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.RegulatoryCompliance),
    __metadata("design:type", Models_1.RegulatoryCompliance)
], Centre.prototype, "regulatoryCompliance", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.Infrastructure),
    __metadata("design:type", Models_1.Infrastructure)
], Centre.prototype, "infrastructure", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Provider),
    __metadata("design:type", Array)
], Centre.prototype, "providers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.StaffDetails),
    __metadata("design:type", Models_1.StaffDetails)
], Centre.prototype, "staffDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Models_1.CentreDocument),
    __metadata("design:type", Models_1.CentreDocument)
], Centre.prototype, "centreDocument", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Models_1.Availability),
    __metadata("design:type", Array)
], Centre.prototype, "availability", void 0);
exports.Centre = Centre = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: 'centres' })
], Centre);
