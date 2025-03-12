"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
const configSetup_1 = __importDefault(require("../config/configSetup"));
exports.transporter = nodemailer.createTransport({
    service: configSetup_1.default.EMAIL_SERVICE,
    port: configSetup_1.default.EMAIL_PORT,
    secure: configSetup_1.default.EMAIL_PORT === 465 ? true : false,
    auth: {
        user: configSetup_1.default.EMAIL_USER,
        pass: configSetup_1.default.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
