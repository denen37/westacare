"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeEmail = exports.verifyEmail = exports.registerEmail = exports.passwordReset = void 0;
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
