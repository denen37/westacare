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
exports.getProviders = exports.getProfileById = exports.dashboard = exports.me = exports.upload_credential = exports.updateProfile2 = exports.uploadAvatar = exports.updateSeekerProfile2 = exports.updateSeekerProfile1 = exports.createProviderProfile1 = void 0;
const modules_1 = require("../utils/modules");
const Models_1 = require("../models/Models");
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const createProviderProfile1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { image, fullName, qualification, registration, clinic, yearsOfExperience, about, userId } = req.body;
    try {
        const user = yield Models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return (0, modules_1.errorResponse)(res, 'User not found');
        }
        if (user.role !== User_1.UserRole.PROVIDER) {
            return (0, modules_1.errorResponse)(res, 'User is not a provider');
        }
        const savedProfile = yield Models_1.Provider.create({
            fullName,
            image,
            yearsOfExperience,
            about,
            userId,
            clinic,
            qualification,
            registration
        }, {
            include: [
                {
                    model: Models_1.Qualification,
                    as: 'qualification'
                },
                {
                    model: Models_1.Registration,
                    as: 'registration'
                }
            ]
        });
        const createdWallet = yield Models_1.Wallet.create({
            balance: 0,
            currency: 'NGN',
            userId: savedProfile.userId
        });
        return (0, modules_1.successResponse)(res, 'success', savedProfile);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.createProviderProfile1 = createProviderProfile1;
const updateSeekerProfile1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = req.user;
    const user = yield Models_1.User.findOne({ where: { id }, include: [{ model: Models_1.Seeker }] });
    const seekerId = user === null || user === void 0 ? void 0 : user.seeker.id;
    const { image, bloodGroup, maritalStatus, height, weight } = req.body;
    try {
        const updatedProfile = yield Models_1.Seeker.update({
            image,
            bloodGroup,
            maritalStatus,
            height,
            weight
        }, {
            where: {
                id: seekerId
            }
        });
        return (0, modules_1.successResponse)(res, 'success', updatedProfile);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.updateSeekerProfile1 = updateSeekerProfile1;
const updateSeekerProfile2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = req.user;
    const user = yield Models_1.User.findOne({ where: { id }, include: [{ model: Models_1.Seeker }] });
    const seekerId = user === null || user === void 0 ? void 0 : user.seeker.id;
    const { allergies, currMed, pastMed, chronicDisease, injuries, surgeries, smokingHabits, alcoholConsumption, activityLevel } = req.body;
    try {
        const [medicalInfo, created] = yield Models_1.MedicalInfo.findOrCreate({
            where: {
                seekerId
            },
            defaults: {
                allergies,
                currMed,
                pastMed,
                chronicDisease,
                injuries,
                surgeries,
                smokingHabits,
                alcoholConsumption,
                activityLevel
            }
        });
        if (!created) {
            const rows = yield medicalInfo.update({
                allergies,
                currMed,
                pastMed,
                chronicDisease,
                injuries,
                surgeries,
                smokingHabits,
                alcoholConsumption,
                activityLevel
            });
            medicalInfo.save();
            return (0, modules_1.successResponse)(res, 'success', rows);
        }
        return (0, modules_1.successResponse)(res, 'success', medicalInfo);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.updateSeekerProfile2 = updateSeekerProfile2;
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!avatar) {
        return (0, modules_1.errorResponse)(res, 'error', 'No file uploaded');
    }
    return (0, modules_1.successResponse)(res, 'success', avatar);
});
exports.uploadAvatar = uploadAvatar;
//TODO - error here this is not returning the updated provider
const updateProfile2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { providerId } = req.params;
    let { gender, dateOfBirth, address, city, country, availabilities, charge } = req.body;
    try {
        const updated = yield Models_1.Provider.update({
            gender,
            dateOfBirth,
            address,
            city,
            country,
        }, {
            where: {
                id: providerId
            }
        });
        const updatedAval = [];
        availabilities.forEach((aval) => __awaiter(void 0, void 0, void 0, function* () {
            const avalData = {
                startDayOfWeek: aval.startDayOfWeek,
                endDayOfWeek: aval.endDayOfWeek,
                openingTime: aval.openingTime,
                closingTime: aval.closingTime,
                isClosed: aval.isClosed,
                isOpen24Hours: aval.isOpen24Hours,
                notes: aval.notes,
                providerId: aval.providerId
            };
            const availability = yield Models_1.Availability.create(avalData);
            updatedAval.push(availability);
        }));
        const chargeData = {
            phone: charge.phone,
            video: charge.video,
            clinic: charge.clinic,
            unit: charge.unit,
            providerId: charge.providerId
        };
        const updatedCharge = yield Models_1.Charge.create(chargeData);
        updated.charge = updatedCharge;
        updated.availabilities = updatedAval;
        return (0, modules_1.successResponse)(res, 'success', updated);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.updateProfile2 = updateProfile2;
const upload_credential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { name, providerId } = req.body;
    let path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const createdCredentials = yield Models_1.Credential.create({ name, filePath: path, providerId });
        (0, modules_1.successResponse)(res, 'success', createdCredentials);
    }
    catch (err) {
        return (0, modules_1.errorResponse)(res, 'error', err);
    }
});
exports.upload_credential = upload_credential;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    return (0, modules_1.successResponse)(res, 'success', req.user);
});
exports.me = me;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, email } = req.user;
    let { monthsAgo } = req.query;
    const xMonthsAgo = new Date();
    xMonthsAgo.setMonth(xMonthsAgo.getMonth() - Number(monthsAgo));
    try {
        const user = yield Models_1.User.findOne({
            where: { id, email },
            attributes: ['id', 'email', 'phone', 'role'],
            include: [{
                    model: Models_1.Provider,
                    attributes: ['id', 'fullName', 'image', 'gender']
                }, {
                    model: Models_1.Seeker,
                    attributes: ['id', 'firstName', 'lastName', 'image', 'gender']
                }, {
                    model: Models_1.Centre,
                    attributes: ['id', 'name', 'regNo', 'image', 'address']
                }, {
                    model: Models_1.Wallet,
                    attributes: ['id', 'balance', 'currency']
                }, {
                    model: Models_1.Appointment,
                    where: {
                        datetime: {
                            [sequelize_1.Op.gt]: xMonthsAgo,
                        }
                    }
                }]
        });
        Object.entries(user === null || user === void 0 ? void 0 : user.dataValues).forEach(([key, value]) => {
            if (typeof (value) === "object" && value === null) {
                user === null || user === void 0 ? true : delete user.dataValues[key];
            }
        });
        return (0, modules_1.successResponse)(res, 'success', user);
    }
    catch (err) {
        return (0, modules_1.errorResponse)(res, 'error', err);
    }
});
exports.dashboard = dashboard;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const user = yield Models_1.Provider.findOne({
            include: [
                {
                    model: Models_1.User
                },
                {
                    model: Models_1.Centre,
                },
                {
                    model: Models_1.Availability
                },
                {
                    model: Models_1.Appointment
                },
                {
                    model: Models_1.Qualification
                },
                {
                    model: Models_1.Experience
                }
            ]
        });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getProfileById = getProfileById;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { specialization } = req.query;
    let spec;
    if (specialization) {
        spec = yield Models_1.Specialization.findOne({
            where: {
                name: specialization
            }
        });
    }
    let whereCondition = spec ? {
        specialization: spec.id
    } : {};
    try {
        const providers = yield Models_1.Provider.findAll({
            where: whereCondition,
            include: [
                {
                    model: Models_1.User
                },
                {
                    model: Models_1.Specialization
                    //Include ratings also
                }
            ]
        });
        return (0, modules_1.successResponse)(res, 'success', providers);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getProviders = getProviders;
