import { Sequelize } from "sequelize";
import { Recurrence, Reminder, ReminderStatus } from "../models/Reminder";
import schedule from "node-schedule";
import { Op } from "sequelize";
import moment from 'moment';
import { sendPushNotification } from "./notification";
import { medicineReminderNotification } from "../utils/messages";
import { Seeker } from "../models/Seeker";
import { User } from "../models/User";

// const User = require("../models/users/userModel");
// const Medicine = require("../models/users/medicineModel");
// const { sendNotification } = require('../controllers/api/notification');
// const { pushNotification } = require("../services/pushNotification");
// const Notification = require("../models/shared/notificationModel");

export const scheduleReminder = async (user: User, reminder: Reminder) => {

    const times: string[] = reminder.times

    try {

        if (reminder.recurrence === Recurrence.DAILY) {
            times.forEach(time => {
                const hours = time.split(':')[0];
                const minutes = time.split(':')[1];

                let notification = medicineReminderNotification(reminder, `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`)

                schedule.scheduleJob(`*/${minutes} ${hours} * * *`, () =>
                    sendPushNotification(
                        user.deviceToken,
                        notification.title,
                        notification.title,
                        {}
                    ));

            })

        } else if (reminder.recurrence === Recurrence.ONEOFF) {

            let startDate = new Date(reminder.startDate);

            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const day = startDate.getDate();

            times.forEach(time => {
                const now = new Date();
                const hours = Number(time.split(':')[0]);
                const minutes = Number(time.split(':')[1]);

                if (hours >= now.getHours() && minutes >= now.getMinutes()) {
                    const date = new Date(year, month, day, hours, minutes, 0);

                    let notification = medicineReminderNotification(reminder, date.toLocaleTimeString())

                    schedule.scheduleJob(date, () => sendPushNotification(
                        user.deviceToken,
                        notification.title,
                        notification.body,
                        {}
                    ));
                }
            })
        }
    } catch (error) {
        throw error
    }
};


export const initializeReminders = async () => {
    const now = moment().format('YYYY-MM-DD');

    const reminders = await Reminder.findAll({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { status: "ongoing" },
                        { recurrence: "daily" },
                    ],
                },
                {
                    [Op.and]: [
                        { recurrence: "oneoff" },
                        { startDate: { [Op.gte]: now } }
                    ],
                },
            ],
        },

        include: [{
            attributes: ['id'],
            model: Seeker,
            include: [
                { model: User }
            ]
        }]
    });

    reminders.forEach(reminder => scheduleReminder(reminder.seeker.user, reminder));
};




