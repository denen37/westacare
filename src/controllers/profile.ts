import { Request, Response, response } from 'express';
import { getRandom, hash, handleResponse, successResponse, successResponseFalse, validateEmail, randomId, errorResponse } from '../utils/modules';
import { User, OTP, Qualification, Registration, Provider, Availability, Charge, Credential, Wallet, Seeker, Centre, Appointment } from '../models/Models'
import { Gender } from '../models/Seeker';
import { Op } from 'sequelize';
import { UserRole } from '../models/User';


export const createProviderProfile1 = async (req: Request, res: Response) => {
    let {
        image,
        fullName,
        qualification,
        registration,
        clinic,
        yearsOfExperience,
        about,
        userId
    }: {
        image: string;
        fullName: string;
        qualification: Qualification;
        registration: Registration;
        clinic: string;
        yearsOfExperience: number;
        about: string;
        userId: number;
    } = req.body;


    try {

        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            return errorResponse(res, 'User not found')
        }

        if (user.role !== UserRole.PROVIDER) {
            return errorResponse(res, 'User is not a provider')
        }

        const savedProfile = await Provider.create({
            fullName,
            image,
            yearsOfExperience,
            about,
            userId,
            clinic,
            qualification,
            registration
        },
            {
                include: [
                    {
                        model: Qualification,
                        as: 'qualification'
                    },
                    {
                        model: Registration,
                        as: 'registration'
                    }
                ]
            })

        const createdWallet = await Wallet.create({
            balance: 0,
            currency: 'NGN',
            userId: savedProfile.userId
        })

        return successResponse(res, 'success', savedProfile)
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}

export const uploadAvatar = async (req: Request, res: Response) => {
    let avatar = req.file?.path;

    if (!avatar) {
        return errorResponse(res, 'error', 'No file uploaded')
    }

    return successResponse(res, 'success', avatar)
}

//TODO - error here this is not returning the updated provider
export const updateProfile2 = async (req: Request, res: Response) => {
    interface Profile2 {
        gender: Gender;
        dateOfBirth: Date;
        address: string;
        city: string;
        country: string;
        availabilities: Availability[];
        charge: Charge;
    }

    let { providerId } = req.params;

    let { gender, dateOfBirth, address, city, country, availabilities, charge }: Profile2 = req.body;

    try {
        const updated = await Provider.update({
            gender,
            dateOfBirth,
            address,
            city,
            country,
        }, {
            where: {
                id: providerId
            }
        })

        const updatedAval: Availability[] = []

        availabilities.forEach(async (aval) => {
            const avalData: Partial<Availability> = {
                startDayOfWeek: aval.startDayOfWeek,
                endDayOfWeek: aval.endDayOfWeek,
                openingTime: aval.openingTime,
                closingTime: aval.closingTime,
                isClosed: aval.isClosed,
                isOpen24Hours: aval.isOpen24Hours,
                notes: aval.notes,
                providerId: aval.providerId
            }

            const availability = await Availability.create(avalData)

            updatedAval.push(availability);
        })

        const chargeData: Partial<Charge> = {
            phone: charge.phone,
            video: charge.video,
            clinic: charge.clinic,
            unit: charge.unit,
            providerId: charge.providerId
        }

        const updatedCharge: Charge = await Charge.create(chargeData);

        (updated as any).charge = updatedCharge;

        (updated as any).availabilities = updatedAval;

        return successResponse(res, 'success', updated);

    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


export const upload_credential = async (req: Request, res: Response) => {
    let { name, providerId } = req.body;

    let path = req.file?.path;

    try {
        const createdCredentials = await Credential.create({ name, filePath: path, providerId })

        successResponse(res, 'success', createdCredentials)
    } catch (err) {
        return errorResponse(res, 'error', err);
    }
}

export const me = async (req: Request, res: Response) => {
    console.log(req.user)

    return successResponse(res, 'success', req.user);
}

export const dashboard = async (req: Request, res: Response) => {
    let { id, email } = req.user;

    let { monthsAgo } = req.query;

    const xMonthsAgo = new Date();
    xMonthsAgo.setMonth(xMonthsAgo.getMonth() - Number(monthsAgo));

    try {
        const user = await User.findOne({
            where: { id, email },
            attributes: ['id', 'email', 'phone', 'role'],

            include: [{
                model: Provider,
                attributes: ['id', 'fullName', 'image', 'gender']
            }, {
                model: Seeker,
                attributes: ['id', 'firstName', 'lastName', 'image', 'gender']
            }, {
                model: Centre,
                attributes: ['id', 'name', 'regNo', 'image', 'address']
            }, {
                model: Wallet,
                attributes: ['id', 'balance', 'currency']
            }, {
                model: Appointment,
                where: {
                    datetime: {
                        [Op.gt]: xMonthsAgo,
                    }
                }
            }]
        });


        Object.entries(user?.dataValues).forEach(([key, value]) => {
            if (typeof (value) === "object" && value === null) {
                delete user?.dataValues[key];
            }
        });


        return successResponse(res, 'success', user);
    } catch (err) {
        return errorResponse(res, 'error', err);
    }
}
