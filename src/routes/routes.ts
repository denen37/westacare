const express = require('express');
const router = express.Router();
import { cancelAppointment, completeAppointment, createAppointment, getAppointmentById, getAppointments, rescheduleAppointment } from "../controllers/appointment";
import { registerSeeker, registerProvider, sendOTP, verifyOTP, login } from "../controllers/auth";
import { deleteNotification, getAllNotifications, getNotificationById, readNotification } from "../controllers/notification";
import { createProviderProfile1, uploadAvatar, updateProfile2, dashboard, upload_credential, me, getProfileById, getProviders, updateSeekerProfile1, updateSeekerProfile2 } from '../controllers/profile'
import { createReferral, getMyReferrals, getReferralById } from "../controllers/referral";
import { createReminder, deleteReminder, getAllMyReminders, getReminder, updateReminder } from "../controllers/reminder";
import { uploads } from "../utils/upload";

router.post('/auth/seeker/register', registerSeeker)
router.post('/auth/provider/register', registerProvider)
router.post('/auth/send-otp', sendOTP)
router.post('/auth/verify-otp', verifyOTP)
router.post('/auth/login', login)
router.get('/auth/me', me)

router.get('/dashboard', dashboard);
router.post('/providers/upload-avatar', uploads.single('image'), uploadAvatar);
router.post('/providers/create-profile', createProviderProfile1);
router.post('/providers/update-profile2/:providerId', updateProfile2);
router.get('providers/profile:id', getProfileById)
router.post('/providers/upload-credential', uploads.single('file'), upload_credential);
router.get('/providers', getProviders)

router.post('/seekers/update-profile1', updateSeekerProfile1);
router.post('/seekers/update-profile2', updateSeekerProfile2);

router.get('/appointments', getAppointments)
router.get('/appointments/:id', getAppointmentById)
router.post('/appointments', createAppointment)
router.post('/appointments/cancel/:id', cancelAppointment)
router.post('/appointments/complete/:id', completeAppointment)
router.post('/appointments/reschedule/:id', rescheduleAppointment)

router.get('/referrals', getMyReferrals);
router.get('/referrals/:id', getReferralById);
router.post('/referrals', createReferral);

router.get('/reminders', getAllMyReminders);
router.get('/reminders/:id', getReminder)
router.post('/reminders', createReminder);
router.put('/reminders/:id', updateReminder);
router.delete('/reminders/:id', deleteReminder)

router.get('/notifications', getAllNotifications);
router.get('/notifications/:id', getNotificationById);
router.delete('/notifications/:id', deleteNotification);
router.post('/read-notification/:id', readNotification);

//router.post('refresh-notification-token', refreshNotificationToken)




export default router;