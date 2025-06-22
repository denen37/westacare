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
exports.removeFavorite = exports.addFavorite = exports.getAllFavorites = void 0;
const Models_1 = require("../models/Models");
const User_1 = require("../models/User");
const modules_1 = require("../utils/modules");
const getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    try {
        if (role !== User_1.UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can view their favorites' });
        }
        const seeker = yield Models_1.Seeker.findOne({
            where: { userId: id },
            include: [
                {
                    model: Models_1.Provider,
                    as: 'favoriteProviders'
                }
            ]
        });
        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }
        return (0, modules_1.successResponse)(res, "success", seeker.favoriteProviders);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.getAllFavorites = getAllFavorites;
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { providerId } = req.body;
    try {
        if (role !== User_1.UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can add favorites' });
        }
        const seeker = yield Models_1.Seeker.findOne({ where: { userId: id } });
        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }
        const provider = yield Models_1.Provider.findOne({ where: { id: providerId } });
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        const favorite = yield Models_1.Favorite.create({ seekerId: seeker.id, providerId: provider.id });
        (0, modules_1.successResponse)(res, "success", favorite);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.addFavorite = addFavorite;
const removeFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const providerId = req.params.providerId;
    try {
        if (role !== User_1.UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can remove favorites' });
        }
        const seeker = yield Models_1.Seeker.findOne({ where: { userId: id } });
        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }
        const favorite = yield Models_1.Favorite.destroy({ where: { seekerId: seeker.id, providerId: providerId } });
        (0, modules_1.successResponse)(res, "success", favorite);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.removeFavorite = removeFavorite;
