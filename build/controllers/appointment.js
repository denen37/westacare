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
exports.completeAppointment = exports.rescheduleAppointment = exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const User_1 = require("../models/User");
const modules_1 = require("../utils/modules");
const Models_1 = require("../models/Models");
const email_1 = require("../services/email");
const messages_1 = require("../utils/messages");
const Appointment_1 = require("../models/Appointment");
const sequelize_1 = require("sequelize");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, role } = req.user;
    let { type, date, status } = req.query;
    let user = yield User_1.User.findByPk(id, {
        include: [
            {
                model: Models_1.Provider,
                attributes: ['id']
            },
            {
                model: Models_1.Seeker,
                attributes: ['id']
            }
        ]
    });
    let proOrSeekId = role === User_1.UserRole.PROVIDER ? user === null || user === void 0 ? void 0 : user.provider.id : user === null || user === void 0 ? void 0 : user.seeker.id;
    let userObj = role === User_1.UserRole.PROVIDER ? { providerId: proOrSeekId } : { seekerId: proOrSeekId };
    let whereCondition = userObj;
    if (type)
        whereCondition.type = type.toString().trim();
    const rawDate = req.query.date;
    let dateString;
    if (typeof rawDate === 'string') {
        dateString = rawDate;
    }
    else if (Array.isArray(rawDate) && typeof rawDate[0] === 'string') {
        dateString = rawDate[0];
    }
    if (dateString) {
        const start = new Date(dateString);
        start.setHours(0, 0, 0, 0);
        const end = new Date(dateString);
        end.setHours(23, 59, 59, 999);
        whereCondition.datetime = {
            [sequelize_1.Op.between]: [start, end]
        };
    }
    if (status)
        whereCondition.status = status.toString().trim();
    try {
        const appointments = yield Models_1.Appointment.findAll({
            where: whereCondition,
            include: [{
                    model: role === User_1.UserRole.PROVIDER ? Models_1.Seeker : Models_1.Provider,
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
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, role } = req.user;
    let isProvider = role === User_1.UserRole.PROVIDER;
    try {
        const appointment = yield Models_1.Appointment.findOne({
            where: { id: req.params.id },
            include: isProvider ? [
                {
                    model: Models_1.Seeker,
                    include: [
                        {
                            model: Models_1.MedicalInfo,
                        },
                        {
                            model: Models_1.MedicalHistory,
                            include: [
                                {
                                    model: Models_1.Provider,
                                    attributes: ['id', 'firstName', 'lastName', 'image']
                                },
                                {
                                    model: Models_1.Centre,
                                    attributes: ['id', 'name', 'image']
                                }
                            ]
                        },
                        {
                            model: Models_1.Prescription,
                            include: [
                                {
                                    model: Models_1.PrescriptionItem
                                }
                            ]
                        },
                        {
                            model: Models_1.Referral,
                        }
                    ]
                }
            ] : [{
                    model: Models_1.Provider,
                    attributes: ['id', 'firstName', 'lastName', 'image']
                }]
        });
        return (0, modules_1.successResponse)(res, 'success', appointment);
    }
    catch (error) {
        console.log(error);
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { type, location, datetime, duration, paid, seekerId, providerId, referralId } = req.body;
    const provider = yield Models_1.Provider.findByPk(providerId, {
        attributes: ['id', 'firstName', 'lastName', 'image'],
        include: [{
                model: User_1.User,
                attributes: ['email']
            }]
    });
    const seeker = yield Models_1.Seeker.findByPk(seekerId, {
        attributes: ['id', 'firstName', 'lastName', 'image'],
        include: [{
                model: User_1.User,
                attributes: ['email']
            }]
    });
    if (!provider) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Provider not found');
    }
    if (!seeker) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Seeker not found');
    }
    try {
        const appointment = yield Models_1.Appointment.create({
            type,
            location,
            datetime,
            duration,
            paid,
            seekerId,
            providerId,
            referralId
        });
        //send email to provider and seeker
        //send notification to provider and seeker
        appointment.setDataValue('provider', provider);
        appointment.setDataValue('seeker', seeker);
        let appointmentVal = appointment.toJSON();
        // send email to seeker
        let seekApntEmail = (0, messages_1.seekerAppointmentEmail)(appointmentVal);
        let messageId = yield (0, email_1.sendEmail)(appointmentVal.seeker.user.email, seekApntEmail.subject, seekApntEmail.body, ((_a = appointmentVal.seeker) === null || _a === void 0 ? void 0 : _a.firstName) || 'Seeker');
        let emailSendStatusSeek = Boolean(messageId);
        let proApntEmail = (0, messages_1.providerAppointmentEmail)(appointmentVal);
        messageId = yield (0, email_1.sendEmail)(appointmentVal.provider.user.email, proApntEmail.subject, proApntEmail.body, ((_b = appointmentVal.provider) === null || _b === void 0 ? void 0 : _b.firstName) || "Provider");
        let emailSendStatusPro = Boolean(messageId);
        //send notifiactions to both
        return (0, modules_1.successResponse)(res, 'success', { appointmentVal, emailSendStatusSeek, emailSendStatusPro });
    }
    catch (error) {
        console.log(error);
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { reason } = req.body;
        let appointmentVal = yield Models_1.Appointment.findByPk(id, {
            include: [
                {
                    model: Models_1.Provider,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User_1.User }]
                },
                {
                    model: Models_1.Seeker,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User_1.User }]
                }
            ]
        });
        if (!appointmentVal) {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment not found');
        }
        if (appointmentVal.status !== 'pending') {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment already accepted or rejected');
        }
        appointmentVal.status = Appointment_1.AppointmentStatus.CANCELLED;
        appointmentVal.notes = reason;
        yield appointmentVal.save();
        //send emails
        let emailSendStatusSeek = yield (0, email_1.sendEmail)(appointmentVal.seeker.user.email, (0, messages_1.appointmentCancelledEmail)(appointmentVal).subject, (0, messages_1.appointmentCancelledEmail)(appointmentVal).body, appointmentVal.seeker.firstName);
        let emailSendStatusProvider = yield (0, email_1.sendEmail)(appointmentVal.provider.user.email, (0, messages_1.providerAppointmentCancelledEmail)(appointmentVal).subject, (0, messages_1.providerAppointmentCancelledEmail)(appointmentVal).body, appointmentVal.provider.firstName);
        //send push notifications
        return (0, modules_1.successResponse)(res, 'success', {
            message: 'Appointment cancelled successfully',
            emailSendStatusSeeker: Boolean(emailSendStatusSeek),
            emailSendStatusProvider: Boolean(emailSendStatusProvider)
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.cancelAppointment = cancelAppointment;
const rescheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { reason, datetime } = req.body;
        let appointmentVal = yield Models_1.Appointment.findByPk(id, {
            include: [
                {
                    model: Models_1.Provider,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User_1.User }]
                },
                {
                    model: Models_1.Seeker,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User_1.User }]
                }
            ]
        });
        if (!appointmentVal) {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment not found');
        }
        if (appointmentVal.status !== Appointment_1.AppointmentStatus.PENDING) {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment cannot be rescheduled');
        }
        if (new Date(appointmentVal.datetime) < new Date(datetime)) {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment cannot be rescheduled to a past date');
        }
        appointmentVal.status = Appointment_1.AppointmentStatus.RESCHEDULED;
        appointmentVal.notes = reason;
        appointmentVal.datetime = datetime;
        yield appointmentVal.save();
        let emailSendStatusSeek = yield (0, email_1.sendEmail)(appointmentVal.seeker.user.email, (0, messages_1.appointmentRescheduledEmail)(appointmentVal).subject, (0, messages_1.appointmentRescheduledEmail)(appointmentVal).body, appointmentVal.seeker.firstName);
        let emailSendStatusProvider = yield (0, email_1.sendEmail)(appointmentVal.provider.user.email, (0, messages_1.providerAppointmentRescheduledEmail)(appointmentVal).subject, (0, messages_1.providerAppointmentRescheduledEmail)(appointmentVal).body, appointmentVal.provider.firstName);
        return (0, modules_1.successResponse)(res, 'success', {
            message: 'Appointment rescheduled successfully',
            emailSendStatusSeeker: Boolean(emailSendStatusSeek),
            emailSendStatusProvider: Boolean(emailSendStatusProvider),
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', { message: 'Error rescheduling appointment', error });
    }
});
exports.rescheduleAppointment = rescheduleAppointment;
const completeAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let appointmentVal = yield Models_1.Appointment.findByPk(req.params.id);
        if (!appointmentVal) {
            return (0, modules_1.errorResponse)(res, 'error', 'Appointment not found');
        }
        appointmentVal.status = Appointment_1.AppointmentStatus.COMPLETED;
        yield appointmentVal.save();
        return (0, modules_1.successResponse)(res, 'success', {
            message: 'Appointment completed successfully',
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', 'Error completing appointment');
    }
});
exports.completeAppointment = completeAppointment;
