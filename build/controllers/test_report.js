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
exports.deleteTestReport = exports.updateTestReport = exports.createTestReport = exports.getTestReportById = exports.getAllTestReports = void 0;
const Models_1 = require("../models/Models");
const modules_1 = require("../utils/modules");
const User_1 = require("../models/User");
const getAllTestReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        let whereCondition = {};
        if (role === User_1.UserRole.SEEKER) {
            const seeker = yield Models_1.Seeker.findOne({ where: { userId: id } });
            whereCondition = { seekerId: seeker === null || seeker === void 0 ? void 0 : seeker.id };
        }
        else if (role === User_1.UserRole.PROVIDER) {
            const provider = yield Models_1.Provider.findOne({ where: { userId: id } });
            whereCondition = { providerId: provider === null || provider === void 0 ? void 0 : provider.id };
        }
        const testreports = yield Models_1.TestReport.findAll({
            where: whereCondition,
            order: [['createdAt', 'DESC']]
        });
        return (0, modules_1.successResponse)(res, 'success', testreports);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getAllTestReports = getAllTestReports;
const getTestReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const testreport = yield Models_1.TestReport.findOne({ where: { id } });
        return (0, modules_1.successResponse)(res, 'success', testreport);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getTestReportById = getTestReportById;
const createTestReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    validateTestReport(req, res);
    try {
        const provider = yield Models_1.Provider.findOne({ where: { userId: id } });
        const testreport = yield Models_1.TestReport.create(Object.assign(Object.assign({}, req.body), { providerId: provider === null || provider === void 0 ? void 0 : provider.id }));
        return (0, modules_1.successResponse)(res, 'success', testreport);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.createTestReport = createTestReport;
const updateTestReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const testreport = yield Models_1.TestReport.update(req.body, { where: { id } });
        return (0, modules_1.successResponse)(res, 'success', testreport);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.updateTestReport = updateTestReport;
const deleteTestReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const testreport = yield Models_1.TestReport.destroy({ where: { id } });
        return (0, modules_1.successResponse)(res, 'success', testreport);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.deleteTestReport = deleteTestReport;
const validateTestReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, doctorName, description, date, image, seekerId } = req.body;
    if (!title || !doctorName || !description || !date || !image || !seekerId) {
        return (0, modules_1.errorResponse)(res, 'error', 'All fields are required');
    }
    const seeker = yield Models_1.Seeker.findOne({ where: { id: seekerId } });
    if (!seeker) {
        return (0, modules_1.errorResponse)(res, 'error', 'Seeker not found');
    }
});
