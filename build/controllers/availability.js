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
exports.deleteAvailability = exports.updateAvailability = exports.createAvailablity = exports.getAvailability = exports.getAvailablities = void 0;
const Provider_1 = require("../models/Provider");
const Availability_1 = require("../models/Availability");
const modules_1 = require("../utils/modules");
const Availability_2 = require("../models/Availability");
const getAvailablities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        const provider = yield Provider_1.Provider.findOne({ where: { userId: id } });
        const availabilities = yield Availability_1.Availability.findAll({ where: { providerId: provider === null || provider === void 0 ? void 0 : provider.id } });
        return (0, modules_1.successResponse)(res, 'success', availabilities);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getAvailablities = getAvailablities;
const getAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const availability = yield Availability_1.Availability.findOne({ where: { id } });
        return (0, modules_1.successResponse)(res, 'success', availability);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getAvailability = getAvailability;
const createAvailablity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, notes } = req.body;
    validateAvailability(res, startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, notes);
    try {
        const provider = yield Provider_1.Provider.findOne({ where: { userId: id } });
        if (!provider) {
            return (0, modules_1.errorResponse)(res, 'error', 'Provider not found');
        }
        const availability = yield Availability_1.Availability.create({
            startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, providerId: provider === null || provider === void 0 ? void 0 : provider.id, notes
        });
        return (0, modules_1.successResponse)(res, 'success', availability);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.createAvailablity = createAvailablity;
const updateAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const availability = yield Availability_1.Availability.update(req.body, {
            where: { id: id }
        });
        return (0, modules_1.successResponse)(res, 'success', availability);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.updateAvailability = updateAvailability;
const deleteAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const availability = yield Availability_1.Availability.findByPk(id);
        if (!availability) {
            return (0, modules_1.errorResponse)(res, 'error', 'Availability not found');
        }
        yield availability.destroy();
        return (0, modules_1.successResponse)(res, 'Availability deleted successfully');
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', 'Error deleting availability');
    }
});
exports.deleteAvailability = deleteAvailability;
const validateAvailability = (res, startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, notes) => {
    const days = [...Object.values(Availability_2.DaysOfWeek)];
    if (!days.includes(startDay) || !days.includes(endDay)) {
        return (0, modules_1.errorResponse)(res, 'error', 'Invalid days of the week');
    }
    if (startDay > endDay) {
        return (0, modules_1.errorResponse)(res, 'error', 'Start day cannot be after end day');
    }
    if (!openingTime && !closingTime && !isOpen24Hours && !isClosed) {
        return (0, modules_1.errorResponse)(res, 'error', 'Must have at least one of the following: opening time, closing time, open 24 hours, or closed');
    }
    if (isOpen24Hours && (openingTime || closingTime)) {
        return (0, modules_1.errorResponse)(res, 'error', 'Cannot have opening and closing time if open 24 hours');
    }
    if (isClosed && (openingTime || closingTime || isOpen24Hours)) {
        return (0, modules_1.errorResponse)(res, 'error', 'Cannot have opening and closing time if closed');
    }
};
