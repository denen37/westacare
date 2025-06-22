import { Request, Response } from "express"
import { Provider, Seeker, TestReport } from '../models/Models'
import { errorResponse, successResponse } from "../utils/modules"
import { UserRole } from "../models/User"

export const getAllTestReports = async (req: Request, res: Response) => {
    const { id, role } = req.user

    try {
        let whereCondition = {}

        if (role === UserRole.SEEKER) {
            const seeker = await Seeker.findOne({ where: { userId: id } })

            whereCondition = { seekerId: seeker?.id }

        } else if (role === UserRole.PROVIDER) {
            const provider = await Provider.findOne({ where: { userId: id } })

            whereCondition = { providerId: provider?.id }
        }

        const testreports = await TestReport.findAll({ where: whereCondition })

        return successResponse(res, 'success', testreports);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }

}

export const getTestReportById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const testreport = await TestReport.findOne({ where: { id } })

        return successResponse(res, 'success', testreport);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const createTestReport = async (req: Request, res: Response) => {
    const { id, role } = req.user

    validateTestReport(req, res);

    try {
        const provider = await Provider.findOne({ where: { userId: id } })

        const testreport = await TestReport.create({ ...req.body, providerId: provider?.id });

        return successResponse(res, 'success', testreport);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}

export const updateTestReport = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const testreport = await TestReport.update(req.body, { where: { id } })

        return successResponse(res, 'success', testreport);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}

export const deleteTestReport = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const testreport = await TestReport.destroy({ where: { id } })

        return successResponse(res, 'success', testreport);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}

const validateTestReport = async (req: Request, res: Response) => {
    const { title, doctorName, description, date, image, seekerId } = req.body;

    if (!title || !doctorName || !description || !date || !image || !seekerId) {
        return errorResponse(res, 'error', 'All fields are required')
    }

    const seeker = await Seeker.findOne({ where: { id: seekerId } })

    if (!seeker) {
        return errorResponse(res, 'error', 'Seeker not found')
    }
}