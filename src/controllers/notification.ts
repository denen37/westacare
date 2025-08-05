import { Request, Response } from "express";
import { Notification, User } from "../models/Models";
import { errorResponse, handleResponse, successResponse } from "../utils/modules";
import { paginate } from "../utils/pagination"


// Controller logic for handling user routes
export const getAllNotifications = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { page = 1, count = 10, read } = req.query;
    let { metadata = "false" } = req.query;

    let condition: { [key: string]: any } = {
        userId: id
    }

    let isRead
    if (read) {
        isRead = read === 'true' ? true : false
        condition = { ...condition, read: isRead }
    }

    let hasMetadata = metadata !== 'false' ? true : false;

    // try {
    const notifications = await Notification.findAll({
        where: condition,

        ...paginate(Number(page), Number(count))
    });

    if (hasMetadata) {
        const total = await Notification.count({
            where: condition
        });
        const totalPages = Math.ceil(total / Number(count));
        let pagemetadata = {
            currentPage: Number(page),
            numPerPage: Number(count),
            totalPages: totalPages,
            totalItems: total
        }

        return successResponse(res, "error", { notifications, metadata: pagemetadata })
    }
    return successResponse(res, "success", { notifications })
    // } catch (error) {
    //     return errorResponse(res, "error", error)
    // }
};

export const getNotificationCount = (req: Request, res: Response) => {
    try {
        const notifications = Notification.count();

        return successResponse(res, "success", { notifications })
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}


export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return handleResponse(res, 404, false, 'Notification not found')
        }

        return successResponse(res, "success", notification)
    } catch (error) {
        return errorResponse(res, "error fetching notifications", error)
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return handleResponse(res, 404, false, 'Notification not found');
        }
        await notification.destroy();

        return successResponse(res, "success", { message: 'Notification deleted' })
    } catch (error) {
        return errorResponse(res, "error deleting notification", error)
    }
}

export const readNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return handleResponse(res, 404, false, 'Notification not found');
        }
        notification.read = true;
        await notification.save();

        return successResponse(res, "success", { message: 'Notification read' })
    } catch (error) {
        return errorResponse(res, "error reading notification", error)
    }
}


export const storeDeviceToken = (req: Request, res: Response) => {
    const { id } = req.user

    const { deviceToken } = req.body;

    try {
        const updated = User.update({ deviceToken }, {
            where: { id }
        })

        return successResponse(res, "success", "Device token updated sucessfully")
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const refreshDeviceToken = (req: Request, res: Response) => {
    const { id } = req.user

    const { deviceToken } = req.body;

    try {
        const updated = User.update({ deviceToken }, {
            where: { id }
        })

        return successResponse(res, "success", "Device token updated sucessfully")
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}