// import { User, Notification } from "../models/Models";
// const admin = require("firebase-admin");
// import config from '../config/configSetup';
import axios from 'axios';

// const rawEnv = config.FIREBASE_ADMIN_CREDENTIALS || '{}';

// // Replace escaped newlines with real newlines
// const serviceAccount = JSON.parse(rawEnv, (key, value) => {
//     if (key === 'private_key') {
//         return value.replace(/\\n/g, '\n');
//     }
//     return value;
// });


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });


// export const pushNotification = async (user: User, payload: { title: string, body: string }) => {
//     try {

//         let response = await admin.messaging().send({
//             token: user.deviceToken,
//             notification: payload,
//         });

//         console.log("Mobile notification sent!", response);
//     } catch (error: any) {
//         if (error.code === 'messaging/registration-token-not-registered') {
//             console.log(`Token ${user.deviceToken} is invalid, removing from database...`);
//             // Remove token from your database
//         } else {
//             console.error("Error sending notification:", error);
//         }
//     }
// };


// export const sendNotification = async (user: User, payload: { title: string, body: string }) => {
//     try {
//         await pushNotification(user, payload);

//         await Notification.create({
//             subject: payload.title,
//             message: payload.body,
//             userId: user.id
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }


export async function sendPushNotification(expoPushToken: string, title: string, message: string, data: any) {
    try {
        const response = await axios.post('https://exp.host/--/api/v2/push/send', {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: message,
            data: data,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (response.status <= 300) {
            console.log(response.data)
            return {
                status: true,
                message: response.data,
            }
        } else {
            console.log(response.data)
            return {
                status: false,
                message: response.data,
            };
        }

    } catch (error: any) {
        console.error('Error sending notification:', error.response ? error.response.data : error.message);
    }
}




