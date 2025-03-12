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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const email_1 = require("../config/email");
const template_1 = require("../utils/template");
const configSetup_1 = __importDefault(require("../config/configSetup"));
function sendEmail(to, subject, text, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: configSetup_1.default.EMAIL_USER,
            to: to,
            subject: subject,
            text: '',
            html: (0, template_1.templateData)(text, username)
        };
        try {
            const info = yield email_1.transporter.sendMail(mailOptions);
            return info;
        }
        catch (error) {
            console.log(error);
            return;
        }
    });
}
