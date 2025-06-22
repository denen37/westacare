import { Request, Response, response } from "express"
import { Provider } from "../models/Provider";
import { Availability } from "../models/Availability";
import { errorResponse, successResponse } from "../utils/modules";
import { DaysOfWeek } from "../models/Availability";

export const getAvailablities = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    try {
        const provider = await Provider.findOne({ where: { userId: id } });

        const availabilities = await Availability.findAll({ where: { providerId: provider?.id } });

        return successResponse(res, 'success', availabilities);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const getAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const availability = await Availability.findOne({ where: { id } });

        return successResponse(res, 'success', availability);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const createAvailablity = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    const { startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, notes } = req.body;


    validateAvailability(res, startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, notes);


    try {
        const provider = await Provider.findOne({ where: { userId: id } });

        if (!provider) {
            return errorResponse(res, 'error', 'Provider not found');
        }


        const availability = await Availability.create({
            startDay, endDay, openingTime, closingTime, isOpen24Hours, isClosed, providerId: provider?.id, notes
        });

        return successResponse(res, 'success', availability);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const updateAvailability = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const availability = await Availability.update(req.body, {
            where: { id: id }
        });

        return successResponse(res, 'success', availability);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const deleteAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const availability = await Availability.findByPk(id);

        if (!availability) {
            return errorResponse(res, 'error', 'Availability not found');
        }

        await availability.destroy();

        return successResponse(res, 'Availability deleted successfully');
    } catch (error) {
        return errorResponse(res, 'error', 'Error deleting availability');
    }
}


const validateAvailability = (res: Response, startDay: string, endDay: string, openingTime: string, closingTime: string, isOpen24Hours: boolean, isClosed: boolean, notes: string) => {
    const days = [...Object.values(DaysOfWeek)]

    if (!days.includes(startDay) || !days.includes(endDay)) {
        return errorResponse(res, 'error', 'Invalid days of the week');
    }

    if (startDay > endDay) {
        return errorResponse(res, 'error', 'Start day cannot be after end day');
    }

    if (!openingTime && !closingTime && !isOpen24Hours && !isClosed) {
        return errorResponse(res, 'error', 'Must have at least one of the following: opening time, closing time, open 24 hours, or closed');
    }

    if (isOpen24Hours && (openingTime || closingTime)) {
        return errorResponse(res, 'error', 'Cannot have opening and closing time if open 24 hours');
    }

    if (isClosed && (openingTime || closingTime || isOpen24Hours)) {
        return errorResponse(res, 'error', 'Cannot have opening and closing time if closed');
    }
}

