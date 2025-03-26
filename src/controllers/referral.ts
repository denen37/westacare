import { Provider, Referral, Seeker, User } from "../models/Models"
import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/modules";
import { providerFromReferralEmail, providerToReferralEmail, seekerReferralEmail } from "../utils/messages";
import { sendEmail } from "../services/email";

export const getMyReferrals = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    try {
        const referrals = await Referral.findAll({
            where: {
                [role === "provider" ? "providerId" : "seekerId"]: id,
            }
        });

        return successResponse(res, 'success', referrals);
    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


export const getReferralById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const referral = await Referral.findByPk(id);

    if (!referral) {
        return errorResponse(res, 'error', 'Referral not found');
    }

    return successResponse(res, 'success', referral);
}


export const createReferral = async (req: Request, res: Response) => {
    const { id, role } = req.user;
    if (role !== "provider") {
        return errorResponse(res, 'error', 'Only providers can create referrals');
    }
    const { reason, seekerId, notes, referredByProviderId, referredToProviderId } = req.body;

    try {
        const referral = await Referral.create({
            reason,
            seekerId,
            datetime: new Date(),
            notes,
            referredByProviderId,
            referredToProviderId
        });

        let seeker = await Seeker.findByPk(seekerId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                model: User,
                attributes: ['id', 'email']
            }]
        })


        let fromProvider = await Provider.findByPk(referredByProviderId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                model: User,
                attributes: ['id', 'email']
            }]
        })


        let toProvider = await Provider.findByPk(referredToProviderId, {
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                model: User,
                attributes: ['id', 'email']
            }]
        })


        referral.setDataValue('seeker', seeker);

        referral.setDataValue('referredBy', fromProvider);

        referral.setDataValue('referredTo', toProvider);

        let refferalVal = referral.toJSON();

        let messageId = await sendEmail(
            refferalVal.seeker.user.email,
            seekerReferralEmail(refferalVal).subject,
            seekerReferralEmail(refferalVal).body,
            refferalVal.seeker?.firstName || 'Seeker'
        )

        let emailSendStatusSeek = Boolean(messageId);


        messageId = await sendEmail(
            refferalVal.referredBy.user.email,
            providerFromReferralEmail(refferalVal).subject,
            providerFromReferralEmail(refferalVal).body,
            refferalVal.referredBy?.firstName || 'Provider'
        )

        let emailSendStatusProFrom = Boolean(messageId);


        messageId = await sendEmail(
            refferalVal.referredTo.user.email,
            providerToReferralEmail(refferalVal).subject,
            providerToReferralEmail(refferalVal).body,
            refferalVal.referredTo?.firstName || 'Provider'
        )

        let emailSendStatusProTo = Boolean(messageId);

        return successResponse(res, 'Referral created and emails sent successfully', {
            referral,
            emailSendStatusSeek,
            emailSendStatusProFrom,
            emailSendStatusProTo
        })
    } catch (error) {
        return errorResponse(res, 'Error sending referral emails', error)
    }
}