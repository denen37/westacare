import { User, Notification } from "../models/Models";
const admin = require("firebase-admin");
import { firebaseAdminSDK } from "../secret/firebase-adminsdk-fbsvc";


admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminSDK)
});


export const pushNotification = async (user: User, payload: { title: string, body: string }) => {
    try {

        let response = await admin.messaging().send({
            token: user.deviceToken,
            notification: payload,
        });

        console.log("Mobile notification sent!", response);
    } catch (error: any) {
        if (error.code === 'messaging/registration-token-not-registered') {
            console.log(`Token ${user.deviceToken} is invalid, removing from database...`);
            // Remove token from your database
        } else {
            console.error("Error sending notification:", error);
        }
    }
};


export const sendNotification = async (user: User, payload: { title: string, body: string }) => {
    try {
        await pushNotification(user, payload);

        await Notification.create({
            subject: payload.title,
            message: payload.body,
            userId: user.id
        });
    } catch (error) {
        console.error(error);
    }
}



