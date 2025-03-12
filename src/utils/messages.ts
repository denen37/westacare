import config from "../config/configSetup"

interface Message {
    subject: string,
    body: string
}

export const passwordReset = (otp: string): Message => {
    return {
        subject: "Password Reset",
        body: `
    <p>We have received a request to reset your password. Use the OTP below to reset your password.</p>
    <h2>${otp}</h2>
    <p>Note that this OTP expires in ${config.OTP_EXPIRY_TIME}</p>
    `
    }
}

export const registerEmail = (otp: string): Message => {
    return {
        subject: "Welcome to Westacare",
        body:
            `<p>You are welcome to Westacare App</p>
        <p>Use this OTP to complete your registration: <h2>${otp}</h2></p>
        `
    }
}

export const verifyEmail = (otp: string): Message => {
    return {
        subject: "Verify your email",
        body: `
    <p>We have received a request to verify your email. Use the OTP below to verify your email.</p>
    <h2>${otp}</h2>
    <p>Note that this OTP expires in ${config.OTP_EXPIRY_TIME}</p>
    `
    }
}

export const welcomeEmail = (): Message => {
    return {
        subject: "Welcome to Westacare",
        body: `
    <p>You are welcome to Westacare App</p>
    <p>You can proceed to login</p>
    `
    }
}