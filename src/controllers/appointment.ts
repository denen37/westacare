import { Request, Response } from "express"
import { User, UserRole } from "../models/User"
import { errorResponse, handleResponse, successResponse } from "../utils/modules"
import { Appointment, Seeker, Provider, MedicalInfo, MedicalHistory, Centre, Prescription, PrescriptionItem, Referral } from "../models/Models"
import { sendEmail } from "../services/email"
import { appointmentCancelledEmail, appointmentRescheduledEmail, providerAppointmentCancelledEmail, providerAppointmentEmail, providerAppointmentRescheduledEmail, seekerAppointmentEmail } from "../utils/messages"
import { AppointmentStatus } from "../models/Appointment"
import { Op } from 'sequelize';


export const getAppointments = async (req: Request, res: Response) => {
    let { id, role } = req.user

    let { type, date, status } = req.query

    let user = await User.findByPk(id, {
        include: [
            {
                model: Provider,
                attributes: ['id']
            },
            {
                model: Seeker,
                attributes: ['id']
            }
        ]
    })

    let proOrSeekId = role === UserRole.PROVIDER ? user?.provider.id : user?.seeker.id

    let userObj = role === UserRole.PROVIDER ? { providerId: proOrSeekId } : { seekerId: proOrSeekId }

    let whereCondition: { [key: string]: any; } = userObj

    if (type)
        whereCondition.type = type.toString().trim()
    const rawDate = req.query.date;

    let dateString: string | undefined;
    if (typeof rawDate === 'string') {
        dateString = rawDate;
    } else if (Array.isArray(rawDate) && typeof rawDate[0] === 'string') {
        dateString = rawDate[0];
    }

    if (dateString) {
        const start = new Date(dateString);
        start.setHours(0, 0, 0, 0);

        const end = new Date(dateString);
        end.setHours(23, 59, 59, 999);

        whereCondition.datetime = {
            [Op.between]: [start, end]
        };
    }
    if (status)
        whereCondition.status = status.toString().trim()


    try {
        const appointments = await Appointment.findAll({
            where: whereCondition,
            include: [{
                model: role === UserRole.PROVIDER ? Seeker : Provider,
                attributes: ['id', 'firstName', 'lastName', 'image',]
            }]
        })

        return successResponse(res, 'success', appointments);
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}

export const getAppointmentById = async (req: Request, res: Response) => {
    let { id, role } = req.user

    let isProvider = role === UserRole.PROVIDER

    try {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
            include: isProvider ? [
                {
                    model: Seeker,
                    include: [
                        {
                            model: MedicalInfo,
                        },
                        {
                            model: MedicalHistory,
                            include: [
                                {
                                    model: Provider,
                                    attributes: ['id', 'firstName', 'lastName', 'image']
                                },
                                {
                                    model: Centre,
                                    attributes: ['id', 'name', 'image']
                                }
                            ]
                        },
                        {
                            model: Prescription,
                            include: [
                                {
                                    model: PrescriptionItem
                                }
                            ]
                        },
                        {
                            model: Referral,
                        }
                    ]
                }
            ] : [{
                model: Provider,
                attributes: ['id', 'firstName', 'lastName', 'image']
            }]
        })

        return successResponse(res, 'success', appointment)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 'error', error)
    }
}

export const createAppointment = async (req: Request, res: Response) => {
    let { type, location, datetime, duration, paid, seekerId, providerId, referralId } = req.body;

    const provider = await Provider.findByPk(providerId, {
        attributes: ['id', 'firstName', 'lastName', 'image'],
        include: [{
            model: User,
            attributes: ['email']
        }]
    })


    const seeker = await Seeker.findByPk(seekerId, {
        attributes: ['id', 'firstName', 'lastName', 'image'],
        include: [{
            model: User,
            attributes: ['email']
        }]
    })

    if (!provider) {
        return handleResponse(res, 400, false, 'Provider not found')
    }

    if (!seeker) {
        return handleResponse(res, 400, false, 'Seeker not found')
    }

    try {
        const appointment = await Appointment.create({
            type,
            location,
            datetime,
            duration,
            paid,
            seekerId,
            providerId,
            referralId
        })


        //send email to provider and seeker
        //send notification to provider and seeker

        appointment.setDataValue('provider', provider)

        appointment.setDataValue('seeker', seeker)

        let appointmentVal = appointment.toJSON();


        // send email to seeker
        let seekApntEmail = seekerAppointmentEmail(appointmentVal);

        let messageId = await sendEmail(
            appointmentVal.seeker.user.email,
            seekApntEmail.subject,
            seekApntEmail.body,
            appointmentVal.seeker?.firstName || 'Seeker'
        )

        let emailSendStatusSeek = Boolean(messageId);



        let proApntEmail = providerAppointmentEmail(appointmentVal);

        messageId = await sendEmail(
            appointmentVal.provider.user.email,
            proApntEmail.subject,
            proApntEmail.body,
            appointmentVal.provider?.firstName || "Provider"
        )

        let emailSendStatusPro = Boolean(messageId);


        //send notifiactions to both

        return successResponse(res, 'success', { appointmentVal, emailSendStatusSeek, emailSendStatusPro })
    } catch (error) {
        console.log(error)
        return errorResponse(res, 'error', error)
    }
}


export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { reason } = req.body;

        let appointmentVal = await Appointment.findByPk(id, {
            include: [
                {
                    model: Provider,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User }]
                },

                {
                    model: Seeker,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User }]
                }
            ]
        })

        if (!appointmentVal) {
            return errorResponse(res, 'error', 'Appointment not found')
        }

        if (appointmentVal.status !== 'pending') {
            return errorResponse(res, 'error', 'Appointment already accepted or rejected')
        }

        appointmentVal.status = AppointmentStatus.CANCELLED;
        appointmentVal.notes = reason;
        await appointmentVal.save();

        //send emails
        let emailSendStatusSeek = await sendEmail(
            appointmentVal.seeker.user.email,
            appointmentCancelledEmail(appointmentVal).subject,
            appointmentCancelledEmail(appointmentVal).body,
            appointmentVal.seeker.firstName
        )

        let emailSendStatusProvider = await sendEmail(
            appointmentVal.provider.user.email,
            providerAppointmentCancelledEmail(appointmentVal).subject,
            providerAppointmentCancelledEmail(appointmentVal).body,
            appointmentVal.provider.firstName
        )


        //send push notifications

        return successResponse(res, 'success', {
            message: 'Appointment cancelled successfully',
            emailSendStatusSeeker: Boolean(emailSendStatusSeek),
            emailSendStatusProvider: Boolean(emailSendStatusProvider)
        })
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}


export const rescheduleAppointment = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;

        let { reason, datetime } = req.body;

        let appointmentVal = await Appointment.findByPk(id, {
            include: [
                {
                    model: Provider,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User }]
                },

                {
                    model: Seeker,
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [{ model: User }]
                }
            ]
        })


        if (!appointmentVal) {
            return errorResponse(res, 'error', 'Appointment not found')
        }

        if (appointmentVal.status !== AppointmentStatus.PENDING) {
            return errorResponse(res, 'error', 'Appointment cannot be rescheduled')
        }

        if (new Date(appointmentVal.datetime) < new Date(datetime)) {
            return errorResponse(res, 'error', 'Appointment cannot be rescheduled to a past date')
        }


        appointmentVal.status = AppointmentStatus.RESCHEDULED;
        appointmentVal.notes = reason;
        appointmentVal.datetime = datetime;
        await appointmentVal.save();

        let emailSendStatusSeek = await sendEmail(
            appointmentVal.seeker.user.email,
            appointmentRescheduledEmail(appointmentVal).subject,
            appointmentRescheduledEmail(appointmentVal).body,
            appointmentVal.seeker.firstName
        )

        let emailSendStatusProvider = await sendEmail(
            appointmentVal.provider.user.email,
            providerAppointmentRescheduledEmail(appointmentVal).subject,
            providerAppointmentRescheduledEmail(appointmentVal).body,
            appointmentVal.provider.firstName
        )

        return successResponse(res, 'success', {
            message: 'Appointment rescheduled successfully',
            emailSendStatusSeeker: Boolean(emailSendStatusSeek),
            emailSendStatusProvider: Boolean(emailSendStatusProvider),
        })
    } catch (error) {
        return errorResponse(res, 'error', { message: 'Error rescheduling appointment', error })
    }
}

export const completeAppointment = async (req: Request, res: Response) => {
    try {
        let appointmentVal = await Appointment.findByPk(req.params.id)

        if (!appointmentVal) {
            return errorResponse(res, 'error', 'Appointment not found')
        }

        appointmentVal.status = AppointmentStatus.COMPLETED
        await appointmentVal.save()

        return successResponse(res, 'success', {
            message: 'Appointment completed successfully',
        })
    } catch (error) {
        return errorResponse(res, 'error', 'Error completing appointment')
    }
}
