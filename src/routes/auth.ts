const express = require('express');
const router = express.Router();
import { registerSeeker, registerProvider, sendOTP, verifyOTP, login } from "../controllers/auth";
import { createProviderProfile1, uploadAvatar, updateProfile2, dashboard, upload_credential, me } from '../controllers/profile'
import { uploads } from "../utils/upload";

router.post('/auth/seeker/register', registerSeeker)
router.post('/auth/provider/register', registerProvider)
router.post('/auth/send-otp', sendOTP)
router.post('/auth/verify-otp', verifyOTP)
router.post('/auth/login', login)
router.get('/auth/me', me)

router.get('/dashboard', dashboard);
router.post('/provider/upload-avatar', uploads.single('image'), uploadAvatar);
router.post('/provider/create-profile', createProviderProfile1);
router.post('/provider/update-profile2/:providerId', updateProfile2);

router.post('/provider/upload-credential', uploads.single('file'), upload_credential);



export default router;