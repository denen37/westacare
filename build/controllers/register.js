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
exports.register = void 0;
const modules_1 = require("../utils/modules");
const Models_1 = require("../models/Models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const email_1 = require("../services/email");
const jsonwebtoken_1 = require("jsonwebtoken");
const configSetup_1 = __importDefault(require("../config/configSetup"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, password, type } = req.body;
    if (!email || !phone || !password || !type)
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide all required fields');
    if (!(0, modules_1.validateEmail)(email))
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide a valid email');
    //fetch user
    let user = yield Models_1.User.findOne({ where: { email } });
    if (user)
        return (0, modules_1.handleResponse)(res, 409, false, 'User already exists');
    let hashPassword = yield bcryptjs_1.default.hash(password, 10);
    let userCreated = yield Models_1.User.create({ email, phone, password: hashPassword, role: type });
    userCreated.password = undefined;
    let otp = (0, modules_1.getRandom)(6);
    let messageId = yield (0, email_1.sendEmail)(email, "Welcome to Westacare", `<p>You are welcome to Westacare App</p>
        <p>Use this OTP to complete your registration: <h2>${otp}</h2></p>
        `, 'User');
    let emailSendStatus = Boolean(messageId);
    let token = (0, jsonwebtoken_1.sign)({ id: userCreated.id, email: userCreated.email }, configSetup_1.default.TOKEN_SECRET);
    return (0, modules_1.successResponse)(res, 'User created', {
        user: userCreated,
        emailSendStatus: emailSendStatus,
        token: token
    });
});
exports.register = register;
