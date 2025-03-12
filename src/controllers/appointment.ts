import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"
import { UserRole } from "../models/User"
import { Seeker } from "../models/Seeker"
import { Provider } from "../models/Provider"
import { errorResponse, successResponse } from "../utils/modules"

export const getAppointments = async (req: Request, res: Response) => {
    let { id, role } = req.user
    let { type, date, status } = req.query

    let userObj = role === UserRole.PROVIDER ? { providerId: id } : { seekerId: id }

    let whereCondition: { [key: string]: any; } = userObj

    if (type)
        whereCondition.type = type
    if (date)
        whereCondition.date = date
    if (status)
        whereCondition.status = status


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

