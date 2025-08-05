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
exports.getProviders = exports.getProfileById = exports.dashboard = exports.me = exports.upload_credential = exports.updateProviderProfile = exports.updateProfile2 = exports.uploadAvatar = exports.updateSeekerProfile = exports.updateSeekerProfile2 = exports.updateSeekerProfile1 = exports.createProviderProfile1 = void 0;
const modules_1 = require("../utils/modules");
const Models_1 = require("../models/Models");
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const uploadCloud_1 = require("../services/uploadCloud");
const sequelize_typescript_1 = require("sequelize-typescript");
var StorageContainer;
(function (StorageContainer) {
    StorageContainer["PROFILE"] = "profile";
    StorageContainer["GENERAL"] = "general";
    StorageContainer["CREDENTIALS"] = "credentials";
})(StorageContainer || (StorageContainer = {}));
const createProviderProfile1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { image, firstName, lastName, qualification, registration, specializationId, clinic, yearsOfExperience, about, userId } = req.body;
    try {
        const user = yield Models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return (0, modules_1.errorResponse)(res, 'User not found');
        }
        if (user.role !== User_1.UserRole.PROVIDER) {
            return (0, modules_1.errorResponse)(res, 'User is not a provider');
        }
        const savedProfile = yield Models_1.Provider.create({
            firstName,
            lastName,
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
    try {
        const updatedProfile = yield Models_1.Seeker.update(req.body, {
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
const updateSeekerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const updated = yield Models_1.Seeker.update(req.body, {
            where: {
                userId: id
            }
        });
        return (0, modules_1.successResponse)(res, 'success', updated);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.updateSeekerProfile = updateSeekerProfile;
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return (0, modules_1.handleResponse)(res, 404, false, 'No file uploaded');
    }
    const file = req.file;
    try {
        return (0, modules_1.successResponse)(res, 'success', { url: `/${file.path.slice(file.path.indexOf('uploads')).split('\\').join('/')}` });
    }
    catch (error) {
        return (0, modules_1.handleResponse)(res, 500, false, 'Error uploading file');
    }
});
exports.uploadAvatar = uploadAvatar;
//TODO - error here this is not returning the updated provider
const updateProfile2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    let { gender, dateOfBirth, address, city, country, availabilities, charge } = req.body;
    try {
        const provider = yield Models_1.Provider.findOne({ where: { userId: id } });
        if (!provider) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Provider not found');
        }
        provider.gender = gender;
        provider.dateOfBirth = dateOfBirth;
        provider.address = address;
        provider.city = city;
        provider.country = country;
        const updated = yield provider.save();
        const updatedAval = [];
        availabilities.forEach((aval) => __awaiter(void 0, void 0, void 0, function* () {
            const avalData = {
                startDay: aval.startDay,
                endDay: aval.endDay,
                openingTime: aval.openingTime,
                closingTime: aval.closingTime,
                isClosed: aval.isClosed,
                isOpen24Hours: aval.isOpen24Hours,
                notes: aval.notes,
                providerId: provider.id
            };
            const availability = yield Models_1.Availability.create(avalData);
            updatedAval.push(availability);
        }));
        const chargeData = {
            phone: charge.phone,
            video: charge.video,
            clinic: charge.clinic,
            unit: charge.unit,
            providerId: provider.id
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
const updateProviderProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const updated = Models_1.Provider.update(req.body, {
            where: {
                userId: id
            }
        });
        return (0, modules_1.successResponse)(res, 'success', updated);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.updateProviderProfile = updateProviderProfile;
const upload_credential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, providerId } = req.body;
    try {
        // let path = req.file?.path;
        if (!req.files) {
            return (0, modules_1.handleResponse)(res, 404, false, 'No files uploaded');
        }
        const file = req.file;
        const fileModified = {
            buffer: file.buffer,
            name: Date.now().toString(),
            mimetype: file.mimetype,
        };
        const path = yield (0, uploadCloud_1.uploadFileToBlob)(StorageContainer.CREDENTIALS, fileModified);
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
    console.log(id, email);
    let { monthsAgo = 4 } = req.query;
    const xMonthsAgo = new Date();
    xMonthsAgo.setMonth(xMonthsAgo.getMonth() - Number(monthsAgo));
    try {
        const user = yield Models_1.User.findOne({
            where: { id, email },
            attributes: ['id', 'email', 'phone', 'role'],
            include: [
                {
                    model: Models_1.Provider,
                    attributes: ['id', 'firstName', 'lastName', 'image', 'gender'],
                    include: [
                        {
                            model: Models_1.Appointment,
                            where: {
                                datetime: {
                                    [sequelize_1.Op.gt]: xMonthsAgo,
                                }
                            },
                            required: false
                        },
                    ]
                }, {
                    model: Models_1.Seeker,
                    attributes: ['id', 'firstName', 'lastName', 'image', 'gender'],
                    include: [
                        {
                            model: Models_1.Appointment,
                            where: {
                                datetime: {
                                    [sequelize_1.Op.gt]: xMonthsAgo,
                                }
                            },
                            required: false
                        },
                    ]
                },
                // {
                //     model: Centre,
                //     attributes: ['id', 'name', 'regNo', 'image', 'address'],
                //     include: [{
                //         model: Appointment,
                //         where: {
                //             datetime: {
                //                 [Op.gt]: xMonthsAgo,
                //             },
                //             required: false
                //         }
                //     }]
                // }, 
                {
                    model: Models_1.Wallet,
                    attributes: ['id', 'balance', 'currency']
                }
            ]
        });
        Object.entries(user === null || user === void 0 ? void 0 : user.dataValues).forEach(([key, value]) => {
            if (typeof (value) === "object" && value === null) {
                user === null || user === void 0 ? true : delete user.dataValues[key];
            }
        });
        return (0, modules_1.successResponse)(res, 'success', user);
    }
    catch (error) {
        (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.dashboard = dashboard;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { providerId } = req.params;
    try {
        const provider = yield Models_1.Provider.findOne({
            where: { id: providerId },
            include: [
                {
                    model: Models_1.User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Models_1.Specialization
                },
                {
                    model: Models_1.Centre,
                },
                {
                    model: Models_1.Availability
                },
                {
                    model: Models_1.Qualification
                },
                {
                    model: Models_1.Experience
                }
            ]
        });
        const countRating = yield Models_1.Feedback.count({ where: { providerId: provider === null || provider === void 0 ? void 0 : provider.id } });
        const addRating = (_a = yield Models_1.Feedback.sum('rating', {
            where: {
                providerId: provider === null || provider === void 0 ? void 0 : provider.id
            }
        })) !== null && _a !== void 0 ? _a : 0;
        let avgRating = 0;
        if (countRating > 0)
            avgRating = addRating / countRating;
        const countFavourites = yield Models_1.Favorite.count({ where: { providerId: provider === null || provider === void 0 ? void 0 : provider.id } });
        provider === null || provider === void 0 ? void 0 : provider.setDataValue('avgRating', avgRating);
        provider === null || provider === void 0 ? void 0 : provider.setDataValue('favourites', countFavourites);
        return (0, modules_1.successResponse)(res, 'success', provider);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getProfileById = getProfileById;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { specialization, category, orderBy } = req.query;
    let whereCondition = {};
    if (specialization) {
        const spec = yield Models_1.Specialization.findOne({
            where: { name: specialization }
        });
        if (spec) {
            whereCondition.specializationId = spec.id;
        }
    }
    if (category) {
        whereCondition.category = category;
    }
    try {
        let providers = yield Models_1.Provider.findAll({
            where: whereCondition,
            include: [
                {
                    model: Models_1.User,
                    attributes: {
                        exclude: ['updatedAt', 'password']
                    },
                },
                {
                    model: Models_1.Specialization
                }
            ],
            raw: false
        });
        const providerIds = providers.map(p => p.id);
        // Batch-fetch feedback stats
        const feedbackStats = yield Models_1.Feedback.findAll({
            attributes: [
                'providerId',
                [sequelize_typescript_1.Sequelize.fn('AVG', sequelize_typescript_1.Sequelize.col('rating')), 'avgRating'],
                [sequelize_typescript_1.Sequelize.fn('COUNT', sequelize_typescript_1.Sequelize.col('id')), 'countRating']
            ],
            where: { providerId: providerIds },
            group: ['providerId'],
            raw: true
        });
        const feedbackMap = new Map();
        feedbackStats.forEach((stat) => {
            feedbackMap.set(stat.providerId, {
                avgRating: Math.round(parseFloat(stat.avgRating) * 10) / 10,
                countRating: parseInt(stat.countRating)
            });
        });
        // Batch-fetch favorites count
        const favorites = yield Models_1.Favorite.findAll({
            attributes: [
                'providerId',
                [sequelize_typescript_1.Sequelize.fn('COUNT', sequelize_typescript_1.Sequelize.col('id')), 'countFavourites']
            ],
            where: { providerId: providerIds },
            group: ['providerId'],
            raw: true
        });
        const favMap = new Map();
        favorites.forEach((fav) => {
            favMap.set(fav.providerId, parseInt(fav.countFavourites));
        });
        // Attach stats to providers
        providers.forEach(provider => {
            var _a, _b, _c;
            const stats = feedbackMap.get(provider.id);
            const favCount = (_a = favMap.get(provider.id)) !== null && _a !== void 0 ? _a : 0;
            provider.setDataValue('avgRating', (_b = stats === null || stats === void 0 ? void 0 : stats.avgRating) !== null && _b !== void 0 ? _b : 0);
            provider.setDataValue('countRating', (_c = stats === null || stats === void 0 ? void 0 : stats.countRating) !== null && _c !== void 0 ? _c : 0);
            provider.setDataValue('countFavourites', favCount);
        });
        // Ordering
        if (orderBy) {
            const [field, direction = 'ASC'] = orderBy.toString().split(',');
            const isDesc = direction.toUpperCase() === 'DESC';
            if (field === 'rating') {
                providers.sort((a, b) => {
                    var _a, _b;
                    const aRating = (_a = a.getDataValue('avgRating')) !== null && _a !== void 0 ? _a : -1;
                    const bRating = (_b = b.getDataValue('avgRating')) !== null && _b !== void 0 ? _b : -1;
                    return isDesc ? bRating - aRating : aRating - bRating;
                });
            }
            else if (field === 'favorites') {
                providers.sort((a, b) => {
                    var _a, _b;
                    const aFav = (_a = a.getDataValue('countFavourites')) !== null && _a !== void 0 ? _a : 0;
                    const bFav = (_b = b.getDataValue('countFavourites')) !== null && _b !== void 0 ? _b : 0;
                    return isDesc ? bFav - aFav : aFav - bFav;
                });
            }
        }
        return (0, modules_1.successResponse)(res, 'success', providers);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error);
    }
});
exports.getProviders = getProviders;
