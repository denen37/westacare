"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReminder = exports.updateReminder = exports.createReminder = exports.getReminder = exports.getAllMyReminders = void 0;
const Seeker_1 = require("../models/Seeker");
const Reminder_1 = require("../models/Reminder");
const modules_1 = require("../utils/modules");
const reminder_1 = require("../services/reminder");
const User_1 = require("../models/User");
const getAllMyReminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        const seeker = yield Seeker_1.Seeker.findOne({
            attributes: ["id"],
            where: { userId: id },
        });
        const reminders = yield Reminder_1.Reminder.findAll({
            where: { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id },
        });
        return (0, modules_1.successResponse)(res, "success", reminders.map((reminder) => {
            return Object.assign(Object.assign({}, reminder.dataValues), { times: JSON.parse(reminder.dataValues.times) });
        }));
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.getAllMyReminders = getAllMyReminders;
const getReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reminder = yield Reminder_1.Reminder.findOne({
            where: { id },
        });
        return (0, modules_1.successResponse)(res, "success", Object.assign(Object.assign({}, reminder === null || reminder === void 0 ? void 0 : reminder.dataValues), { times: JSON.parse(reminder === null || reminder === void 0 ? void 0 : reminder.dataValues.times) }));
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.getReminder = getReminder;
// Create a new reminder
const createReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { medicine, dosage, startDate, recurrence, times } = req.body;
    const seeker = yield Seeker_1.Seeker.findOne({
        attributes: ["id"],
        where: { userId: id },
        include: User_1.User
    });
    const newReminder = yield Reminder_1.Reminder.create({
        medicine,
        dosage,
        startDate,
        recurrence,
        times,
        seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id
    });
    //Add reminder
    //let reminder = { ...newReminder.dataValues};
    if (seeker)
        (0, reminder_1.scheduleReminder)(seeker.user, newReminder);
    return (0, modules_1.successResponse)(res, "success", newReminder);
});
exports.createReminder = createReminder;
const updateReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { time, status } = req.body;
        const reminder = yield Reminder_1.Reminder.findByPk(id);
        if (!reminder) {
            return (0, modules_1.handleResponse)(res, 404, false, "Reminder not found");
        }
        yield reminder.update({ time, status });
        yield reminder.save();
        (0, reminder_1.initializeReminders)();
        return (0, modules_1.successResponse)(res, "success", reminder);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error.message);
    }
});
exports.updateReminder = updateReminder;
const deleteReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reminder = yield Reminder_1.Reminder.findByPk(id);
        if (!reminder) {
            return (0, modules_1.handleResponse)(res, 404, false, "Reminder not found");
        }
        yield reminder.destroy();
        return (0, modules_1.successResponse)(res, "success", "Reminder deleted successfully");
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.deleteReminder = deleteReminder;
