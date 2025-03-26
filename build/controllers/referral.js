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
exports.createReferral = exports.getReferralById = exports.getMyReferrals = void 0;
const Models_1 = require("../models/Models");
const modules_1 = require("../utils/modules");
const messages_1 = require("../utils/messages");
const email_1 = require("../services/email");
const getMyReferrals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        const referrals = yield Models_1.Referral.findAll({
            where: {
                [role === "provider" ? "providerId" : "seekerId"]: id,
            }
        });
        return (0, modules_1.successResponse)(res, 'success', referrals);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getMyReferrals = getMyReferrals;
const getReferralById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const referral = yield Models_1.Referral.findByPk(id);
    if (!referral) {
        return (0, modules_1.errorResponse)(res, 'error', 'Referral not found');
    }
    return (0, modules_1.successResponse)(res, 'success', referral);
});
exports.getReferralById = getReferralById;
const createReferral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id, role } = req.user;
    if (role !== "provider") {
        return (0, modules_1.errorResponse)(res, 'error', 'Only providers can create referrals');
    }
    const { reason, seekerId, notes, referredByProviderId, referredToProviderId } = req.body;
    try {
        const referral = yield Models_1.Referral.create({
            reason,
            seekerId,
            datetime: new Date(),
            notes,
            referredByProviderId,
            referredToProviderId
        });
        let seeker = yield Models_1.Seeker.findByPk(seekerId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                    model: Models_1.User,
                    attributes: ['id', 'email']
                }]
        });
        let fromProvider = yield Models_1.Provider.findByPk(referredByProviderId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                    model: Models_1.User,
                    attributes: ['id', 'email']
                }]
        });
        let toProvider = yield Models_1.Provider.findByPk(referredToProviderId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                    model: Models_1.User,
                    attributes: ['id', 'email']
                }]
        });
        referral.setDataValue('seeker', seeker);
        referral.setDataValue('referredBy', fromProvider);
        referral.setDataValue('referredTo', toProvider);
        let refferalVal = referral.toJSON();
        let messageId = yield (0, email_1.sendEmail)(refferalVal.seeker.user.email, (0, messages_1.seekerReferralEmail)(refferalVal).subject, (0, messages_1.seekerReferralEmail)(refferalVal).body, ((_a = refferalVal.seeker) === null || _a === void 0 ? void 0 : _a.firstName) || 'Seeker');
        let emailSendStatusSeek = Boolean(messageId);
        messageId = yield (0, email_1.sendEmail)(refferalVal.referredBy.user.email, (0, messages_1.providerFromReferralEmail)(refferalVal).subject, (0, messages_1.providerFromReferralEmail)(refferalVal).body, ((_b = refferalVal.referredBy) === null || _b === void 0 ? void 0 : _b.firstName) || 'Provider');
        let emailSendStatusProFrom = Boolean(messageId);
        messageId = yield (0, email_1.sendEmail)(refferalVal.referredTo.user.email, (0, messages_1.providerToReferralEmail)(refferalVal).subject, (0, messages_1.providerToReferralEmail)(refferalVal).body, ((_c = refferalVal.referredTo) === null || _c === void 0 ? void 0 : _c.firstName) || 'Provider');
        let emailSendStatusProTo = Boolean(messageId);
        return (0, modules_1.successResponse)(res, 'Referral created and emails sent successfully', {
            referral,
            emailSendStatusSeek,
            emailSendStatusProFrom,
            emailSendStatusProTo
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'Error sending referral emails', error);
    }
});
exports.createReferral = createReferral;
