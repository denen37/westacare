import { Request, Response, response } from 'express';
import { getRandom, hash, handleResponse, successResponse, successResponseFalse, validateEmail, randomId, errorResponse } from '../utils/modules';
import { User, OTP, Wallet, Seeker } from '../models/Models'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../services/email';
import { sign } from 'jsonwebtoken';
import config from '../config/configSetup'
import { OTPReason } from '../models/OTP';
import { passwordReset, registerEmail, verifyEmail, welcomeEmail } from '../utils/messages';
import { UserRole } from '../models/User';


export const registerSeeker = async (req: Request, res: Response) => {
    let { firstName, lastName, email, phone, dateOfBirth, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
        return handleResponse(res, 400, false, 'Password does not match')
    }

    if (!validateEmail(email)) {
        return handleResponse(res, 400, false, 'Invalid email')
    }

    let hashPassword = await bcrypt.hash(password, 10)

    try {
        const user = await User.create({
            email,
            phone,
            password: hashPassword,
            role: UserRole.SEEKER
        })

        user.password = undefined;

        const seeker = await Seeker.create({
            firstName,
            phone,
            lastName,
            dateOfBirth,
            gender,
            userId: user.id
        })

        const wallet = await Wallet.create({
            balance: 0,
            currency: 'NGN',
            userId: user.id
        })

        let emailSendStatus: boolean


        let messageId = await sendEmail(
            email,
            welcomeEmail().subject,
            welcomeEmail().body,
            seeker.firstName
        )

        emailSendStatus = Boolean(messageId);

        return handleResponse(res, 200, true, 'Seeker registered successfully', {
            user, seeker, emailSendStatus
        })
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}


export const registerProvider = async (req: Request, res: Response) => {
    const { email, phone, password, type } = req.body;

    if (!email || !phone || !password || !type) return handleResponse(res, 400, false, 'Please provide all required fields')

    if (!validateEmail(email)) return handleResponse(res, 400, false, 'Please provide a valid email')

    try {
        //fetch user
        let user = await User.findOne({ where: { email } })

        if (user) return handleResponse(res, 409, false, 'User already exists')

        let hashPassword = await bcrypt.hash(password, 10)

        let userCreated = await User.create({ email, phone, password: hashPassword, role: type })

        userCreated.password = undefined

        let otp = getRandom(6).toString();

        const otpExpiration = new Date(Date.now() + config.OTP_EXPIRY_TIME * 60 * 1000);

        await OTP.create({ email, otp, expiresAt: otpExpiration });

        let regEmail = registerEmail(otp);

        let messageId = await sendEmail(
            email,
            regEmail.subject,
            regEmail.body,
            'User'
        )

        let emailSendStatus = Boolean(messageId);

        let token = sign({ id: userCreated.id, email: userCreated.email }, config.TOKEN_SECRET);

        return successResponse(res, 'User created', {
            user: userCreated,
            emailSendStatus: emailSendStatus,
            token: token
        })
    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    if (!email || !password) return handleResponse(res, 400, false, 'Please provide email and password')

    try {
        let user = await User.findOne({ where: { email } })

        if (!user) return handleResponse(res, 404, false, 'User not found')

        let passwordMatch = await bcrypt.compare(password, user.password || '')

        if (!passwordMatch) return handleResponse(res, 401, false, 'Invalid password')

        user.password = undefined;

        let token = sign({ id: user.id, email: user.email, role: user.role }, config.TOKEN_SECRET);

        return successResponse(res, 'Login successful', {
            user: user,
            token: token
        })
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}



export const verifyOTP = async (req: Request, res: Response) => {
    let { email, otp, reason } = req.body;

    // let user = await User.findOne({ where: { email } })

    // if (!user) return handleResponse(res, 404, false, 'User not found')

    try {
        let otpRecord = await OTP.findOne({ where: { email, otp } })

        if (!otpRecord) return handleResponse(res, 404, false, 'OTP not found')

        if (otpRecord.expiresAt < new Date()) return handleResponse(res, 401, false, 'OTP expired')

        await OTP.destroy({ where: { email } })

        if (reason === 'verify_email') {
            const user = await User.findOne({ where: { email } })

            if (!user) return handleResponse(res, 404, false, 'User not found')

            user.emailVerified = true

            await user.save()
        }

        return successResponse(res, 'OTP verified')
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}



export const sendOTP = async (req: Request, res: Response) => {
    let { email, reason } = req.body;

    try {
        //let user = await User.findOne({ where: { email } })

        //if (!user) return handleResponse(res, 404, false, 'User not found')

        let otp = getRandom(6).toString();

        let otpExpires = new Date(Date.now() + config.OTP_EXPIRY_TIME * 60 * 1000);

        let otpRecord = await OTP.create({ email, otp, expiresAt: otpExpires })

        let emailSendStatus

        if (reason === OTPReason.FORGOT_PASSWORD) {
            let resetEmail = passwordReset(otp)

            let messageId = await sendEmail(
                email,
                resetEmail.subject,
                resetEmail.body,
                'User'
            )

            emailSendStatus = Boolean(messageId);
        } else if (reason === OTPReason.VERIFY_EMAIL) {
            let emailSent = verifyEmail(otp)

            let messageId = await sendEmail(
                email,
                emailSent.subject,
                emailSent.body,
                'User'
            )

            emailSendStatus = Boolean(messageId);
        }


        return successResponse(res, 'OTP sent', { emailSendStatus })
    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


