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
exports.Feedback = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
let Feedback = class Feedback extends sequelize_typescript_1.Model {
};
exports.Feedback = Feedback;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Feedback.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(500)),
    __metadata("design:type", String)
], Feedback.prototype, "review", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Seeker),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Feedback.prototype, "seekerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Seeker, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Seeker)
], Feedback.prototype, "seeker", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Provider),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Feedback.prototype, "providerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Provider, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Provider)
], Feedback.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.Centre),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Feedback.prototype, "centreId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.Centre, { onDelete: 'CASCADE' }),
    __metadata("design:type", Models_1.Centre)
], Feedback.prototype, "centre", void 0);
exports.Feedback = Feedback = __decorate([
    (0, sequelize_typescript_1.Table)({ updatedAt: false, tableName: 'feedbacks' })
], Feedback);
