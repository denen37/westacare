const express = require('express');
const router = express.Router();
import { addAccount, getAccounts, getBanks } from "../controllers/account";
import { cancelAppointment, completeAppointment, createAppointment, getAppointmentById, getAppointments, rescheduleAppointment } from "../controllers/appointment";
import { registerSeeker, registerProvider, sendOTP, verifyOTP, login, resetPassword, changePassword } from "../controllers/auth";
import { addFavorite, getAllFavorites, removeFavorite } from "../controllers/favorite";
import { deleteNotification, getAllNotifications, getNotificationById, readNotification, refreshDeviceToken } from "../controllers/notification";
import { initiatePayment, initiateTransfer, verifyPayment } from "../controllers/payment";
import { createProviderProfile1, uploadAvatar, updateProfile2, dashboard, upload_credential, me, getProfileById, getProviders, updateSeekerProfile1, updateSeekerProfile2, updateProviderProfile, updateSeekerProfile } from '../controllers/profile'
import { createReferral, getMyReferrals, getReferralById } from "../controllers/referral";
import { createReminder, deleteReminder, getAllMyReminders, getReminder, updateReminder } from "../controllers/reminder";
import { uploads } from "../services/upload";
import { allowRoles } from "../middleware/allowRoles";
import { getFeedbacks, giveFeedback, updateFeedback } from "../controllers/feedback";
import { UserRole } from "../models/User";
import { createAvailablity, deleteAvailability, getAvailability, getAvailablities, updateAvailability } from "../controllers/availability";
import { createTestReport, deleteTestReport, getAllTestReports, getTestReportById, updateTestReport } from "../controllers/test_report";
import { debitWallet, setPin } from "../controllers/wallet";
import { getAllTransactions, getTransactionById } from "../controllers/transaction";

router.post('/auth/seeker/register', registerSeeker)
router.post('/auth/provider/register', registerProvider)
router.post('/auth/send-otp', sendOTP)
router.post('/auth/verify-otp', verifyOTP)
router.post('/auth/login', login)
router.get('/auth/me', me)
router.post('/auth/reset-password', resetPassword);
router.post('/auth/change-password', changePassword);

router.get('/dashboard', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), dashboard);
router.post('/upload-avatar', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), uploads.single('avatar'), uploadAvatar);
router.post('/providers/create-profile', allowRoles(UserRole.PROVIDER), createProviderProfile1);
router.post('/providers/update-profile', allowRoles(UserRole.PROVIDER), updateProfile2);
router.post('/providers/update-any', allowRoles(UserRole.PROVIDER), updateProviderProfile);
router.post('/providers/upload-credential', allowRoles(UserRole.PROVIDER), uploads.single('file'), upload_credential);

router.get('/providers', allowRoles(UserRole.SEEKER), getProviders)
router.get('/providers/profile/:providerId', allowRoles(UserRole.SEEKER), getProfileById)

router.post('/seekers/update-profile1', allowRoles(UserRole.SEEKER), updateSeekerProfile1);
router.post('/seekers/update-profile2', allowRoles(UserRole.SEEKER), updateSeekerProfile2);
router.post('/seekers/update-any', allowRoles(UserRole.SEEKER), updateSeekerProfile);

router.get('/appointments', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getAppointments)
router.get('/appointments/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getAppointmentById)
router.post('/appointments', allowRoles(UserRole.SEEKER), createAppointment)
router.post('/appointments/cancel/:id', allowRoles(UserRole.SEEKER), cancelAppointment)
router.post('/appointments/complete/:id', allowRoles(UserRole.SEEKER), completeAppointment)
router.post('/appointments/reschedule/:id', allowRoles(UserRole.SEEKER), rescheduleAppointment)

router.get('/availabilities', allowRoles(UserRole.PROVIDER), getAvailablities);
router.get('/availabilities/:id', allowRoles(UserRole.PROVIDER), getAvailability);
router.post('/availabilities', allowRoles(UserRole.PROVIDER), createAvailablity);
router.put('/availabilities/:id', allowRoles(UserRole.PROVIDER), updateAvailability);
router.delete('/availabilities/:id', allowRoles(UserRole.PROVIDER), deleteAvailability);

router.get('/testreports', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getAllTestReports);
router.get('/testreports/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getTestReportById);
router.post('/testreports', allowRoles(UserRole.PROVIDER), createTestReport);
router.put('/testreports/:id', allowRoles(UserRole.PROVIDER), updateTestReport);
router.delete('/testreports/:id', allowRoles(UserRole.PROVIDER), deleteTestReport);

router.get('/referrals', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getMyReferrals);
router.get('/referrals/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getReferralById);
router.post('/referrals', allowRoles(UserRole.PROVIDER), createReferral);

router.get('/reminders', allowRoles(UserRole.SEEKER), getAllMyReminders);
router.get('/reminders/:id', allowRoles(UserRole.SEEKER), getReminder)
router.post('/reminders', allowRoles(UserRole.SEEKER), createReminder);
router.put('/reminders/:id', allowRoles(UserRole.SEEKER), updateReminder);
router.delete('/reminders/:id', allowRoles(UserRole.SEEKER), deleteReminder)

router.get('/notifications', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getAllNotifications);
router.get('/notifications/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getNotificationById);
router.delete('/notifications/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), deleteNotification);
router.post('/read-notification/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), readNotification);
//router.post('/get-unread-notification-count', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getUnreadNotificationCount);

router.post('refresh-device-token', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), refreshDeviceToken)

router.get('/favourites', allowRoles(UserRole.SEEKER), getAllFavorites);
router.post('/favourites', allowRoles(UserRole.SEEKER), addFavorite);
router.delete('/favourites/:providerId', allowRoles(UserRole.SEEKER), removeFavorite);

router.get('/accounts/banks', allowRoles(UserRole.PROVIDER), getBanks);
router.post('/accounts', allowRoles(UserRole.PROVIDER), addAccount);
router.get('/accounts', allowRoles(UserRole.PROVIDER), getAccounts);

router.post('/payments/initiate-payment', allowRoles(UserRole.SEEKER), initiatePayment);
router.post('/payments/verify-payment/:ref', allowRoles(UserRole.SEEKER), verifyPayment);
router.post('/payments/initiate-transfer', allowRoles(UserRole.PROVIDER), initiateTransfer);

router.post('/debit-wallet', allowRoles(UserRole.SEEKER), debitWallet);
router.post('/set-pin', allowRoles(UserRole.SEEKER), setPin);

router.get('/transactions', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getAllTransactions);
router.get('/transactions/:id', allowRoles(UserRole.SEEKER, UserRole.PROVIDER), getTransactionById);

router.post('/feedbacks', allowRoles(UserRole.SEEKER), giveFeedback)
router.get('/feedbacks', allowRoles(UserRole.PROVIDER), getFeedbacks)
router.put('/feedbacks', allowRoles(UserRole.SEEKER), updateFeedback)


export default router;