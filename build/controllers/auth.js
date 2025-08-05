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
exports.changePassword = exports.resetPassword = exports.sendOTP = exports.verifyOTP = exports.login = exports.registerProvider = exports.registerSeeker = void 0;
const modules_1 = require("../utils/modules");
const Models_1 = require("../models/Models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const email_1 = require("../services/email");
const jsonwebtoken_1 = require("jsonwebtoken");
const configSetup_1 = __importDefault(require("../config/configSetup"));
const OTP_1 = require("../models/OTP");
const messages_1 = require("../utils/messages");
const User_1 = require("../models/User");
const registerSeeker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, phone, dateOfBirth, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Password does not match');
    }
    if (!(0, modules_1.validateEmail)(email)) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Invalid email');
    }
    let hashPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const user = yield Models_1.User.create({
            email,
            phone,
            password: hashPassword,
            role: User_1.UserRole.SEEKER
        });
        user.password = undefined;
        const seeker = yield Models_1.Seeker.create({
            firstName,
            phone,
            lastName,
            dateOfBirth,
            gender,
            userId: user.id
        });
        const wallet = yield Models_1.Wallet.create({
            balance: 0,
            currency: 'NGN',
            userId: user.id
        });
        let emailSendStatus;
        let messageId = yield (0, email_1.sendEmail)(email, (0, messages_1.welcomeEmail)().subject, (0, messages_1.welcomeEmail)().body, seeker.firstName);
        emailSendStatus = Boolean(messageId);
        let token = (0, jsonwebtoken_1.sign)({
            id: user.id,
            email: user.email,
            role: user.role
        }, configSetup_1.default.TOKEN_SECRET);
        return (0, modules_1.handleResponse)(res, 200, true, 'Seeker registered successfully', {
            user, seeker, token, emailSendStatus
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.registerSeeker = registerSeeker;
const registerProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, password, type } = req.body;
    if (!email || !phone || !password || !type)
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide all required fields');
    if (!(0, modules_1.validateEmail)(email))
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide a valid email');
    try {
        //fetch user
        let user = yield Models_1.User.findOne({ where: { email } });
        if (user)
            return (0, modules_1.handleResponse)(res, 409, false, 'User already exists');
        let hashPassword = yield bcryptjs_1.default.hash(password, 10);
        let userCreated = yield Models_1.User.create({ email, phone, password: hashPassword, role: type });
        userCreated.password = undefined;
        let otp = (0, modules_1.getRandom)(6).toString();
        const otpExpiration = new Date(Date.now() + configSetup_1.default.OTP_EXPIRY_TIME * 60 * 1000);
        yield Models_1.OTP.create({ email, otp, expiresAt: otpExpiration });
        let regEmail = (0, messages_1.registerEmail)(otp);
        let messageId = yield (0, email_1.sendEmail)(email, regEmail.subject, regEmail.body, 'User');
        let emailSendStatus = Boolean(messageId);
        let token = (0, jsonwebtoken_1.sign)({
            id: userCreated.id,
            email: userCreated.email,
            role: userCreated.role
        }, configSetup_1.default.TOKEN_SECRET);
        return (0, modules_1.successResponse)(res, 'User created', {
            user: userCreated,
            emailSendStatus: emailSendStatus,
            token: token
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.registerProvider = registerProvider;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    if (!email || !password)
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide email and password');
    try {
        let user = yield Models_1.User.findOne({ where: { email } });
        if (!user)
            return (0, modules_1.handleResponse)(res, 404, false, 'User not found');
        let passwordMatch = yield bcryptjs_1.default.compare(password, user.password || '');
        if (!passwordMatch)
            return (0, modules_1.handleResponse)(res, 401, false, 'Invalid password');
        user.password = undefined;
        let token = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email, role: user.role }, configSetup_1.default.TOKEN_SECRET);
        return (0, modules_1.successResponse)(res, 'Login successful', {
            user: user,
            token: token
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.login = login;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, otp } = req.body;
    try {
        let otpRecord = yield Models_1.OTP.findOne({ where: { email, otp } });
        if (!otpRecord)
            return (0, modules_1.handleResponse)(res, 404, false, 'OTP not found');
        if (otpRecord.expiresAt < new Date())
            return (0, modules_1.handleResponse)(res, 401, false, 'OTP expired');
        yield Models_1.OTP.destroy({ where: { email } });
        // if (reason === 'verify_email') {
        //     const user = await User.findOne({ where: { email } })
        //     if (!user) return handleResponse(res, 404, false, 'User not found')
        //     user.emailVerified = true
        //     await user.save()
        // }
        return (0, modules_1.successResponse)(res, 'OTP verified');
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.verifyOTP = verifyOTP;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, reason } = req.body;
    try {
        //let user = await User.findOne({ where: { email } })
        //if (!user) return handleResponse(res, 404, false, 'User not found')
        let otp = (0, modules_1.getRandom)(6).toString();
        let otpExpires = new Date(Date.now() + configSetup_1.default.OTP_EXPIRY_TIME * 60 * 1000);
        let otpRecord = yield Models_1.OTP.create({ email, otp, expiresAt: otpExpires });
        let emailSendStatus;
        if (reason === OTP_1.OTPReason.FORGOT_PASSWORD) {
            let resetEmail = (0, messages_1.passwordReset)(otp);
            let messageId = yield (0, email_1.sendEmail)(email, resetEmail.subject, resetEmail.body, 'User');
            emailSendStatus = Boolean(messageId);
        }
        else if (reason === OTP_1.OTPReason.VERIFY_EMAIL) {
            let emailSent = (0, messages_1.verifyEmail)(otp);
            let messageId = yield (0, email_1.sendEmail)(email, emailSent.subject, emailSent.body, 'User');
            emailSendStatus = Boolean(messageId);
        }
        return (0, modules_1.successResponse)(res, 'OTP sent', { emailSendStatus });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.sendOTP = sendOTP;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, otp, newPassword, confirmPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmPassword) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Please provide all required fields');
    }
    if (newPassword !== confirmPassword) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Passwords do not match');
    }
    try {
        let otpRecord = yield Models_1.OTP.findOne({ where: { email, otp } });
        if (!otpRecord)
            return (0, modules_1.handleResponse)(res, 404, false, 'OTP not found');
        if (otpRecord.expiresAt < new Date())
            return (0, modules_1.handleResponse)(res, 401, false, 'OTP expired');
        let user = yield Models_1.User.findOne({ where: { email } });
        if (!user)
            return (0, modules_1.handleResponse)(res, 404, false, 'User not found');
        let hashPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashPassword;
        yield user.save();
        yield Models_1.OTP.destroy({ where: { email } });
        return (0, modules_1.successResponse)(res, 'Password reset successful');
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return (0, modules_1.handleResponse)(res, 400, false, 'Please provide all required fields');
        }
        const user = yield Models_1.User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return (0, modules_1.handleResponse)(res, 404, false, 'User not found');
        }
        const isMatch = yield bcryptjs_1.default.compare(oldPassword, (_a = user.password) !== null && _a !== void 0 ? _a : '');
        if (!isMatch) {
            return (0, modules_1.handleResponse)(res, 400, false, 'Invalid old password');
        }
        const hashPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashPassword;
        yield user.save();
        return (0, modules_1.handleResponse)(res, 200, true, 'Password changed successfully');
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "Failed", { status: false, message: "Error changing password" });
    }
});
exports.changePassword = changePassword;
