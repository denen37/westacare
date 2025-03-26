import { Request, Response } from "express";
import { Seeker } from "../models/Seeker";
import { Reminder } from "../models/Reminder";
import { errorResponse, handleResponse, successResponse } from "../utils/modules";
import { initializeReminders, scheduleReminder } from "../services/reminder";
import { User } from "../models/User";

export const getAllMyReminders = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    try {
        const seeker = await Seeker.findOne({
            attributes: ["id"],
            where: { userId: id },
        })

        const reminders = await Reminder.findAll({
            where: { seekerId: seeker?.id },
        })

        return successResponse(res, "success", reminders.map((reminder) => {
            return { ...reminder.dataValues, times: JSON.parse(reminder.dataValues.times) }
        }));
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}


export const getReminder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findOne({
            where: { id },
        })

        return successResponse(res, "success", { ...reminder?.dataValues, times: JSON.parse(reminder?.dataValues.times) });
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}



// Create a new reminder
export const createReminder = async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { medicine, dosage, startDate, recurrence, times } = req.body;

    const seeker = await Seeker.findOne({
        attributes: ["id"],
        where: { userId: id },
        include: User
    })

    const newReminder = await Reminder.create({
        medicine,
        dosage,
        startDate,
        recurrence,
        times,
        seekerId: seeker?.id
    });

    //Add reminder
    let reminder = { ...newReminder.dataValues, times: JSON.stringify(times) };

    if (seeker)
        scheduleReminder(seeker.user, reminder);

    return successResponse(res, "success", newReminder);
}


export const updateReminder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { time, status } = req.body;

        const reminder = await Reminder.findByPk(id);
        if (!reminder) {
            return handleResponse(res, 404, false, "Reminder not found");
        }

        await reminder.update({ time, status });

        await reminder.save();

        initializeReminders();

        return successResponse(res, "success", reminder);
    } catch (error: any) {
        return errorResponse(res, "error", error.message);
    }
}


export const deleteReminder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findByPk(id);
        if (!reminder) {
            return handleResponse(res, 404, false, "Reminder not found");
        }

        await reminder.destroy();
        return successResponse(res, "success", "Reminder deleted successfully");
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}