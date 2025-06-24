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
exports.initializeReminders = exports.scheduleReminder = void 0;
const Reminder_1 = require("../models/Reminder");
const node_schedule_1 = __importDefault(require("node-schedule"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const notification_1 = require("./notification");
const messages_1 = require("../utils/messages");
const Seeker_1 = require("../models/Seeker");
const User_1 = require("../models/User");
// const User = require("../models/users/userModel");
// const Medicine = require("../models/users/medicineModel");
// const { sendNotification } = require('../controllers/api/notification');
// const { pushNotification } = require("../services/pushNotification");
// const Notification = require("../models/shared/notificationModel");
const scheduleReminder = (user, reminder) => __awaiter(void 0, void 0, void 0, function* () {
    let timesMod = reminder.times.split(":").join("-");
    const times = JSON.parse(timesMod);
    try {
        if (reminder.recurrence === Reminder_1.Recurrence.DAILY) {
            times.forEach(time => {
                const hours = time.split('-')[0];
                const minutes = time.split('-')[1];
                let notification = (0, messages_1.medicineReminderNotification)(reminder, `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
                node_schedule_1.default.scheduleJob(`*/${minutes} ${hours} * * *`, () => (0, notification_1.sendPushNotification)(user.deviceToken, notification.title, notification.title, {}));
            });
        }
        else if (reminder.recurrence === Reminder_1.Recurrence.ONEOFF) {
            let startDate = new Date(reminder.startDate);
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const day = startDate.getDate();
            times.forEach(time => {
                const now = new Date();
                const hours = Number(time.split('-')[0]);
                const minutes = Number(time.split('-')[1]);
                if (hours >= now.getHours() && minutes >= now.getMinutes()) {
                    const date = new Date(year, month, day, hours, minutes, 0);
                    let notification = (0, messages_1.medicineReminderNotification)(reminder, date.toLocaleTimeString());
                    node_schedule_1.default.scheduleJob(date, () => (0, notification_1.sendPushNotification)(user.deviceToken, notification.title, notification.body, {}));
                }
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.scheduleReminder = scheduleReminder;
const initializeReminders = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, moment_1.default)().format('YYYY-MM-DD');
    const reminders = yield Reminder_1.Reminder.findAll({
        where: {
            [sequelize_1.Op.or]: [
                {
                    [sequelize_1.Op.and]: [
                        { status: "ongoing" },
                        { recurrence: "daily" },
                    ],
                },
                {
                    [sequelize_1.Op.and]: [
                        { recurrence: "oneoff" },
                        { startDate: { [sequelize_1.Op.gte]: now } }
                    ],
                },
            ],
        },
        include: [{
                attributes: ['id'],
                model: Seeker_1.Seeker,
                include: [
                    { model: User_1.User }
                ]
            }]
    });
    reminders.forEach(reminder => (0, exports.scheduleReminder)(reminder.seeker.user, reminder));
});
exports.initializeReminders = initializeReminders;
