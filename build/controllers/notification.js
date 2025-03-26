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
exports.storeDeviceToken = exports.readNotification = exports.deleteNotification = exports.getNotificationById = exports.getAllNotifications = void 0;
const Models_1 = require("../models/Models");
const modules_1 = require("../utils/modules");
const pagination_1 = require("../utils/pagination");
// Controller logic for handling user routes
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { page, count, read } = req.query;
    let { metadata } = req.query;
    let isRead;
    if (read) {
        isRead = read === 'true' ? true : false;
    }
    let condition = {
        userid: id
    };
    condition = Object.assign(Object.assign({}, condition), { read: isRead });
    let hasMetadata = page && metadata !== 'false' ? true : false;
    try {
        const notifications = yield Models_1.Notification.findAll(Object.assign({ where: condition }, (0, pagination_1.paginate)(Number(page), Number(count))));
        if (hasMetadata) {
            const total = yield Models_1.Notification.count({
                where: condition
            });
            const totalPages = Math.ceil(total / Number(count));
            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            };
            return (0, modules_1.successResponse)(res, "error", { notifications, metadata: pagemetadata });
        }
        return (0, modules_1.successResponse)(res, "success", { notifications });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
});
exports.getAllNotifications = getAllNotifications;
const getNotificationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield Models_1.Notification.findByPk(req.params.id);
        if (!notification) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Notification not found');
        }
        return (0, modules_1.successResponse)(res, "success", notification);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error fetching notifications", error);
    }
});
exports.getNotificationById = getNotificationById;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield Models_1.Notification.findByPk(req.params.id);
        if (!notification) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Notification not found');
        }
        yield notification.destroy();
        return (0, modules_1.successResponse)(res, "success", { message: 'Notification deleted' });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error deleting notification", error);
    }
});
exports.deleteNotification = deleteNotification;
const readNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield Models_1.Notification.findByPk(req.params.id);
        if (!notification) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Notification not found');
        }
        notification.read = true;
        yield notification.save();
        return (0, modules_1.successResponse)(res, "success", { message: 'Notification read' });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error reading notification", error);
    }
});
exports.readNotification = readNotification;
const storeDeviceToken = (req, res) => {
    const { id } = req.user;
    const { deviceToken } = req.body;
    try {
        const updated = Models_1.User.update({ deviceToken }, {
            where: { id }
        });
        return (0, modules_1.successResponse)(res, "success", "Device token updated sucessfully");
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error);
    }
};
exports.storeDeviceToken = storeDeviceToken;
