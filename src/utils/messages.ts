import config from "../config/configSetup"
import { Appointment } from "../models/Appointment"
import { Referral, Reminder } from "../models/Models"
import { getDate } from "./modules"

interface Message {
    subject: string,
    body: string
}

interface Notification {
    title: string,
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

export const seekerAppointmentEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Confirmation",
        body: `
    <p>You have an appointment with Dr.
    ${appointment.provider?.firstName + ' ' + appointment.provider?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()}</p>
    `
    }
}

export const providerAppointmentEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Confirmation",
        body: `
    <p>You have an appointment with
    ${appointment.seeker?.firstName + ' ' + appointment.seeker?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()}</p>
    `
    }
}

export const appointmentCancelledEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Cancellation",
        body: `
    <p>Your appointment with Dr.
    ${appointment.provider?.firstName + ' ' + appointment.provider?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been cancelled</p>
    `
    }
}

export const providerAppointmentCancelledEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Cancellation",
        body: `
    <p>Your appointment with
    ${appointment.seeker?.firstName + ' ' + appointment.seeker?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been cancelled</p>
    `
    }
}

export const appointmentRescheduledEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Reschedule",
        body: `
    <p>Your appointment with Dr.
    ${appointment.provider?.firstName + ' ' + appointment.provider?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been rescheduled</p>
    `
    }
}

export const providerAppointmentRescheduledEmail = (appointment: Appointment): Message => {
    return {
        subject: "Appointment Reschedule",
        body: `
    <p>Your appointment with
    ${appointment.seeker?.firstName + ' ' + appointment.seeker?.lastName} 
    on ${appointment.datetime.toLocaleDateString()} at ${appointment.datetime.toLocaleTimeString()} has been rescheduled</p>
    `}
}

export const seekerReferralEmail = (referral: Referral): Message => {
    return {
        subject: "Referral",
        body: `
    <p>You have been referred to Dr.
    ${referral.referredTo?.firstName + ' ' + referral.referredTo?.lastName} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `
    }
}

export const providerFromReferralEmail = (referral: Referral): Message => {
    return {
        subject: "Referral",
        body: `
    <p>You have referred
    ${referral.seeker?.firstName + ' ' + referral.seeker?.lastName} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `  }
}


export const providerToReferralEmail = (referral: Referral): Message => {
    return {
        subject: "Referral",
        body: `
    <p>A patient ${referral.seeker?.firstName + ' ' + referral.seeker?.lastName} have been referred to you by Dr.
    ${referral.referredBy?.firstName + ' ' + referral.referredBy?.lastName} 
    for ${referral.reason} on ${referral.datetime.toLocaleDateString()} at ${referral.datetime.toLocaleTimeString()}</p>
    `   }
}

export const medicineReminderNotification = (reminder: Reminder, time: string): Notification => {
    return {
        title: "Medicine Reminder",
        body: `You are a supposed to take ${reminder.dosage} of ${reminder.medicine} at ${time}`
    }
}