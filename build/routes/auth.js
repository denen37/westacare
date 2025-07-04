"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const appointment_1 = require("../controllers/appointment");
const auth_1 = require("../controllers/auth");
const profile_1 = require("../controllers/profile");
const upload_1 = require("../utils/upload");
router.post('/auth/seeker/register', auth_1.registerSeeker);
router.post('/auth/provider/register', auth_1.registerProvider);
router.post('/auth/send-otp', auth_1.sendOTP);
router.post('/auth/verify-otp', auth_1.verifyOTP);
router.post('/auth/login', auth_1.login);
router.get('/auth/me', profile_1.me);
router.get('/dashboard', profile_1.dashboard);
router.post('/provider/upload-avatar', upload_1.uploads.single('image'), profile_1.uploadAvatar);
router.post('/provider/create-profile', profile_1.createProviderProfile1);
router.post('/provider/update-profile2/:providerId', profile_1.updateProfile2);
router.post('/provider/upload-credential', upload_1.uploads.single('file'), profile_1.upload_credential);
router.get('/get-apppointments', appointment_1.getAppointments);
exports.default = router;
