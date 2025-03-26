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
exports.sendNotification = exports.pushNotification = void 0;
const Models_1 = require("../models/Models");
const admin = require("firebase-admin");
const firebase_adminsdk_fbsvc_1 = require("../secret/firebase-adminsdk-fbsvc");
admin.initializeApp({
    credential: admin.credential.cert(firebase_adminsdk_fbsvc_1.firebaseAdminSDK)
});
const pushNotification = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield admin.messaging().send({
            token: user.deviceToken,
            notification: payload,
        });
        console.log("Mobile notification sent!", response);
    }
    catch (error) {
        if (error.code === 'messaging/registration-token-not-registered') {
            console.log(`Token ${user.deviceToken} is invalid, removing from database...`);
            // Remove token from your database
        }
        else {
            console.error("Error sending notification:", error);
        }
    }
});
exports.pushNotification = pushNotification;
const sendNotification = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.pushNotification)(user, payload);
        yield Models_1.Notification.create({
            subject: payload.title,
            message: payload.body,
            userId: user.id
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendNotification = sendNotification;
