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
exports.Reminder = exports.ReminderStatus = exports.Recurrence = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Models_1 = require("./Models");
var Recurrence;
(function (Recurrence) {
    Recurrence["ONEOFF"] = "oneoff";
    Recurrence["DAILY"] = "daily";
})(Recurrence || (exports.Recurrence = Recurrence = {}));
var ReminderStatus;
(function (ReminderStatus) {
    ReminderStatus["ONGOING"] = "ongoing";
    ReminderStatus["CANCELLED"] = "cancelled";
})(ReminderStatus || (exports.ReminderStatus = ReminderStatus = {}));
let Reminder = class Reminder extends sequelize_typescript_1.Model {
};
exports.Reminder = Reminder;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Reminder.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.IsDate,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Reminder.prototype, "time", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(Recurrence.ONEOFF),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(Recurrence))),
    __metadata("design:type", String)
], Reminder.prototype, "recurrence", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(ReminderStatus.ONGOING),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(ReminderStatus))),
    __metadata("design:type", String)
], Reminder.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Models_1.PrescriptionItem),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Reminder.prototype, "prescriptionItemId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Models_1.PrescriptionItem),
    __metadata("design:type", Models_1.PrescriptionItem)
], Reminder.prototype, "medicine", void 0);
exports.Reminder = Reminder = __decorate([
    (0, sequelize_typescript_1.Table)({ updatedAt: false, tableName: 'reminders' })
], Reminder);
