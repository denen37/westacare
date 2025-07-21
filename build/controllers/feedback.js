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
exports.updateFeedback = exports.getFeedbacks = exports.giveFeedback = void 0;
const User_1 = require("../models/User");
const modules_1 = require("../utils/modules");
const Seeker_1 = require("../models/Seeker");
const Feedback_1 = require("../models/Feedback");
const Provider_1 = require("../models/Provider");
const Centre_1 = require("../models/Centre");
const giveFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { rating, review, providerId, centreId } = req.body;
    if (providerId && centreId) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Cannot give feedback to both provider and centre at a time');
    }
    try {
        const seeker = yield Seeker_1.Seeker.findOne({ where: { userId: id } });
        let whereCondition = providerId ? { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id, providerId } : { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id, centreId };
        const prevFeedback = yield Feedback_1.Feedback.findOne({
            where: whereCondition
        });
        if (prevFeedback) {
            return (0, modules_1.handleResponse)(res, 400, false, 'You have already given a review for this provider or centre');
        }
        const feedback = yield Feedback_1.Feedback.create({
            rating,
            review,
            seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id,
            providerId: providerId,
            centreId: centreId
        });
        return (0, modules_1.successResponse)(res, 'success', feedback);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.giveFeedback = giveFeedback;
const getFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        if (role === User_1.UserRole.PROVIDER) {
            const provider = yield Provider_1.Provider.findOne({ where: { userId: id } });
            const feedbacks = yield Feedback_1.Feedback.findAll({ where: { providerId: provider === null || provider === void 0 ? void 0 : provider.id } });
            return (0, modules_1.successResponse)(res, 'success', feedbacks);
        }
        else if (role === User_1.UserRole.CENTRE) {
            const centre = yield Centre_1.Centre.findOne({ where: { userId: id } });
            const feedbacks = yield Feedback_1.Feedback.findAll({ where: { centreId: centre === null || centre === void 0 ? void 0 : centre.id } });
            return (0, modules_1.successResponse)(res, 'success', feedbacks);
        }
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getFeedbacks = getFeedbacks;
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { rating, review, providerId, centreId } = req.body;
    if (providerId && centreId) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Cannot update feedback to both provider and centre at a time');
    }
    try {
        const seeker = yield Seeker_1.Seeker.findOne({ where: { userId: id } });
        let whereCondition = providerId ? { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id, providerId } : { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id, centreId };
        const feedback = yield Feedback_1.Feedback.update({
            rating,
            review,
            providerId: providerId,
            centreId: centreId
        }, {
            where: whereCondition
        });
        return (0, modules_1.successResponse)(res, 'success', feedback);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.updateFeedback = updateFeedback;
