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
exports.getAppointments = void 0;
const Appointment_1 = require("../models/Appointment");
const User_1 = require("../models/User");
const Seeker_1 = require("../models/Seeker");
const Provider_1 = require("../models/Provider");
const modules_1 = require("../utils/modules");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, role } = req.user;
    let { type, date, status } = req.query;
    let userObj = role === User_1.UserRole.PROVIDER ? { providerId: id } : { seekerId: id };
    let whereCondition = userObj;
    if (type)
        whereCondition.type = type;
    if (date)
        whereCondition.date = date;
    if (status)
        whereCondition.status = status;
    try {
        const appointments = yield Appointment_1.Appointment.findAll({
            where: whereCondition,
            include: [{
                    model: role === User_1.UserRole.PROVIDER ? Seeker_1.Seeker : Provider_1.Provider,
                    attributes: ['id', 'firstName', 'lastName', 'image',]
                }]
        });
        return (0, modules_1.successResponse)(res, 'success', appointments);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getAppointments = getAppointments;
