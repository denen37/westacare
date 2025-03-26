"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineReminderNotification = exports.providerToReferralEmail = exports.providerFromReferralEmail = exports.seekerReferralEmail = exports.providerAppointmentRescheduledEmail = exports.appointmentRescheduledEmail = exports.providerAppointmentCancelledEmail = exports.appointmentCancelledEmail = exports.providerAppointmentEmail = exports.seekerAppointmentEmail = exports.welcomeEmail = exports.verifyEmail = exports.registerEmail = exports.passwordReset = void 0;
const configSetup_1 = __importDefault(require("../config/configSetup"));
const passwordReset = (otp) => {
    return {
        subject: "Password Reset",
        body: `
    <p>We have received a request to reset your password. Use the OTP below to reset your password.</p>
    <h2>${otp}</h2>
    <p>Note that this OTP expires in ${configSetup_1.default.OTP_EXPIRY_TIME}</p>
    `
    };
};
exports.passwordReset = passwordReset;
const registerEmail = (otp) => {
    return {
        subject: "Welcome to Westacare",
        body: `<p>You are welcome to Westacare App</p>
        <p>Use this OTP to complete your registration: <h2>${otp}</h2></p>
        `
    };
};
exports.registerEmail = registerEmail;
const verifyEmail = (otp) => {
    return {
        subject: "Verify your email",
        body: `
    <p>We have received a request to verify your email. Use the OTP below to verify your email.</p>
    <h2>${otp}</h2>
    <p>Note that this OTP expires in ${configSetup_1.default.OTP_EXPIRY_TIME}</p>
    `
    };
};
exports.verifyEmail = verifyEmail;
const welcomeEmail = () => {
    return {
        subject: "Welcome to Westacare",
        body: `
    <p>You are welcome to Westacare App</p>
    <p>You can proceed to login</p>
    `
    };
};
exports.welcomeEmail = welcomeEmail;
const seekerAppointmentEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Confirmation",
        body: `
    <p>You have an appointment with Dr.
    ${((_a = appointment.provider) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.provider) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()}</p>
    `
    };
};
exports.seekerAppointmentEmail = seekerAppointmentEmail;
const providerAppointmentEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Confirmation",
        body: `
    <p>You have an appointment with
    ${((_a = appointment.seeker) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.seeker) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()}</p>
    `
    };
};
exports.providerAppointmentEmail = providerAppointmentEmail;
const appointmentCancelledEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Cancellation",
        body: `
    <p>Your appointment with Dr.
    ${((_a = appointment.provider) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.provider) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been cancelled</p>
    `
    };
};
exports.appointmentCancelledEmail = appointmentCancelledEmail;
const providerAppointmentCancelledEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Cancellation",
        body: `
    <p>Your appointment with
    ${((_a = appointment.seeker) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.seeker) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been cancelled</p>
    `
    };
};
exports.providerAppointmentCancelledEmail = providerAppointmentCancelledEmail;
const appointmentRescheduledEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Reschedule",
        body: `
    <p>Your appointment with Dr.
    ${((_a = appointment.provider) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.provider) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been rescheduled</p>
    `
    };
};
exports.appointmentRescheduledEmail = appointmentRescheduledEmail;
const providerAppointmentRescheduledEmail = (appointment) => {
    var _a, _b;
    return {
        subject: "Appointment Reschedule",
        body: `
    <p>Your appointment with
    ${((_a = appointment.seeker) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = appointment.seeker) === null || _b === void 0 ? void 0 : _b.lastName)} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been rescheduled</p>
    `
    };
};
exports.providerAppointmentRescheduledEmail = providerAppointmentRescheduledEmail;
const seekerReferralEmail = (referral) => {
    var _a, _b;
    return {
        subject: "Referral",
        body: `
    <p>You have been referred to Dr.
    ${((_a = referral.referredTo) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = referral.referredTo) === null || _b === void 0 ? void 0 : _b.lastName)} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `
    };
};
exports.seekerReferralEmail = seekerReferralEmail;
const providerFromReferralEmail = (referral) => {
    var _a, _b;
    return {
        subject: "Referral",
        body: `
    <p>You have referred
    ${((_a = referral.seeker) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = referral.seeker) === null || _b === void 0 ? void 0 : _b.lastName)} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `
    };
};
exports.providerFromReferralEmail = providerFromReferralEmail;
const providerToReferralEmail = (referral) => {
    var _a, _b, _c, _d;
    return {
        subject: "Referral",
        body: `
    <p>A patient ${((_a = referral.seeker) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = referral.seeker) === null || _b === void 0 ? void 0 : _b.lastName)} have been referred to you by Dr.
    ${((_c = referral.referredBy) === null || _c === void 0 ? void 0 : _c.firstName) + ' ' + ((_d = referral.referredBy) === null || _d === void 0 ? void 0 : _d.lastName)} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `
    };
};
exports.providerToReferralEmail = providerToReferralEmail;
const medicineReminderNotification = (reminder, time) => {
    return {
        title: "Medicine Reminder",
        body: `You are a supposed to take ${reminder.dosage} of ${reminder.medicine} at ${time}`
    };
};
exports.medicineReminderNotification = medicineReminderNotification;
