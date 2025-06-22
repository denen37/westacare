import { Request, Response } from 'express';
import { UserRole } from '../models/User';
import { errorResponse, handleResponse, successResponse } from '../utils/modules';
import { Seeker } from '../models/Seeker';
import { Feedback } from '../models/Feedback';
import { Provider } from '../models/Provider';
import { Centre } from '../models/Centre';
import { Op } from 'sequelize';

export const giveFeedback = async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { rating, review, providerId, centreId } = req.body;

    if (providerId && centreId) {
        return handleResponse(res, 400, false, 'Cannot give feedback to both provider and centre at a time');
    }

    try {
        const seeker = await Seeker.findOne({ where: { userId: id } });

        let whereCondition = providerId ? { seekerId: seeker?.id, providerId } : { seekerId: seeker?.id, centreId };

        const prevFeedback = await Feedback.findOne({
            where: whereCondition
        })

        if (prevFeedback) {
            return handleResponse(res, 400, false, 'You have already given a review for this provider or centre');
        }

        const feedback = await Feedback.create({
            rating,
            review,
            seekerId: seeker?.id,
            providerId: providerId,
            centreId: centreId
        })

        return successResponse(res, 'success', feedback);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message);
    }
}

export const getFeedbacks = async (req: Request, res: Response) => {
    const { id, role } = req.user;


    try {
        if (role === UserRole.PROVIDER) {
            const provider = await Provider.findOne({ where: { userId: id } });

            const feedbacks = await Feedback.findAll({ where: { providerId: provider?.id } });

            return successResponse(res, 'success', feedbacks);
        } else if (role === UserRole.CENTRE) {
            const centre = await Centre.findOne({ where: { userId: id } });

            const feedbacks = await Feedback.findAll({ where: { centreId: centre?.id } });

            return successResponse(res, 'success', feedbacks);
        }
    } catch (error: any) {
        return errorResponse(res, 'error', error.message);
    }
}

export const updateFeedback = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating, review, providerId, centreId } = req.body;

    if (providerId && centreId) {
        return handleResponse(res, 400, false, 'Cannot update feedback to both provider and centre at a time');
    }

    try {
        const seeker = await Seeker.findOne({ where: { userId: id } });

        let whereCondition = providerId ? { seekerId: seeker?.id, providerId } : { seekerId: seeker?.id, centreId };

        const feedback = await Feedback.update({
            rating,
            review,
            providerId: providerId,
            centreId: centreId
        }, {
            where: whereCondition
        })

        return successResponse(res, 'success', feedback);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message);
    }
}

