import { Request, Response, response } from 'express';
import { getRandom, hash, handleResponse, successResponse, successResponseFalse, validateEmail, randomId, errorResponse } from '../utils/modules';
import { User, OTP, Qualification, Registration, Provider, Availability, Charge, Credential, Wallet, Seeker, Centre, Appointment, Experience, Specialization, MedicalHistory, MedicalInfo, Feedback, Favorite } from '../models/Models'
import { Gender } from '../models/Seeker';
import { Op } from 'sequelize';
import { UserRole } from '../models/User';
import { uploadFileToBlob } from '../services/uploadCloud';


enum StorageContainer {
    PROFILE = 'profile',
    GENERAL = 'general',
    CREDENTIALS = 'credentials',
}


export const createProviderProfile1 = async (req: Request, res: Response) => {
    let {
        image,
        firstName,
        lastName,
        qualification,
        registration,
        specializationId,
        clinic,
        yearsOfExperience,
        about,
        userId
    }: {
        image: string;
        firstName: string;
        lastName: string;
        qualification: Qualification;
        registration: Registration;
        specializationId: number;
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
            firstName,
            lastName,
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

export const updateSeekerProfile1 = async (req: Request, res: Response) => {
    const { id, email } = req.user;

    const user = await User.findOne({ where: { id }, include: [{ model: Seeker }] })

    const seekerId = user?.seeker.id;

    const { image, bloodGroup, maritalStatus, height, weight } = req.body;

    try {
        const updatedProfile = await Seeker.update({
            image,
            bloodGroup,
            maritalStatus,
            height,
            weight
        }, {
            where: {
                id: seekerId
            }
        })

        return successResponse(res, 'success', updatedProfile)
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}

export const updateSeekerProfile2 = async (req: Request, res: Response) => {
    const { id, email } = req.user;

    const user = await User.findOne({ where: { id }, include: [{ model: Seeker }] })

    const seekerId = user?.seeker.id;

    const {
        allergies,
        currMed,
        pastMed,
        chronicDisease,
        injuries,
        surgeries,
        smokingHabits,
        alcoholConsumption,
        activityLevel
    } = req.body;

    try {

        const [medicalInfo, created] = await MedicalInfo.findOrCreate({
            where: {
                seekerId
            },
            defaults: {
                allergies,
                currMed,
                pastMed,
                chronicDisease,
                injuries,
                surgeries,
                smokingHabits,
                alcoholConsumption,
                activityLevel
            }
        })

        if (!created) {
            const rows = await medicalInfo.update({
                allergies,
                currMed,
                pastMed,
                chronicDisease,
                injuries,
                surgeries,
                smokingHabits,
                alcoholConsumption,
                activityLevel
            })

            medicalInfo.save();

            return successResponse(res, 'success', rows)
        }

        return successResponse(res, 'success', medicalInfo)
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}

export const uploadAvatar = async (req: Request, res: Response) => {
    if (!req.file) {
        return handleResponse(res, 404, false, 'No file uploaded');
    }

    const file = req.file as Express.Multer.File;

    // const fileModified = {
    //     buffer: file.buffer,
    //     name: Date.now().toString(),
    //     mimetype: file.mimetype,
    // }

    // try {
    //     const path = await uploadFileToBlob(StorageContainer.PROFILE, fileModified)

    //     return successResponse(res, 'success', { url: path })
    // } catch (error) {
    //     return handleResponse(res, 500, false, 'Error uploading file');
    // }

    try {
        return successResponse(res, 'success', { url: '/uploads/' + file.filename })
    } catch (error) {
        return handleResponse(res, 500, false, 'Error uploading file');
    }
}

//TODO - error here this is not returning the updated provider
export const updateProfile2 = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    interface Profile2 {
        gender: Gender;
        dateOfBirth: Date;
        address: string;
        city: string;
        country: string;
        availabilities: Availability[];
        charge: Charge;
    }

    let { gender, dateOfBirth, address, city, country, availabilities, charge }: Profile2 = req.body;

    try {

        const provider = await Provider.findOne({ where: { userId: id } })

        if (!provider) {
            return handleResponse(res, 404, false, 'Provider not found');
        }

        provider.gender = gender;
        provider.dateOfBirth = dateOfBirth;
        provider.address = address;
        provider.city = city;
        provider.country = country;

        const updated = await provider.save()



        const updatedAval: Availability[] = []

        availabilities.forEach(async (aval) => {
            const avalData: Partial<Availability> = {
                startDay: aval.startDay,
                endDay: aval.endDay,
                openingTime: aval.openingTime,
                closingTime: aval.closingTime,
                isClosed: aval.isClosed,
                isOpen24Hours: aval.isOpen24Hours,
                notes: aval.notes,
                providerId: provider.id
            }

            const availability = await Availability.create(avalData)

            updatedAval.push(availability);
        })

        const chargeData: Partial<Charge> = {
            phone: charge.phone,
            video: charge.video,
            clinic: charge.clinic,
            unit: charge.unit,
            providerId: provider.id
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

    try {
        // let path = req.file?.path;

        if (!req.files) {
            return handleResponse(res, 404, false, 'No files uploaded');
        }

        const file = req.file as Express.Multer.File;

        const fileModified = {
            buffer: file.buffer,
            name: Date.now().toString(),
            mimetype: file.mimetype,
        }

        const path = await uploadFileToBlob(StorageContainer.CREDENTIALS, fileModified)

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

    console.log(id, email);

    let { monthsAgo = 4 } = req.query;

    const xMonthsAgo = new Date();
    xMonthsAgo.setMonth(xMonthsAgo.getMonth() - Number(monthsAgo));

    console.log(xMonthsAgo);

    try {
        const user = await User.findOne({
            where: { id, email },
            attributes: ['id', 'email', 'phone', 'role'],

            include: [
                {
                    model: Provider,
                    attributes: ['id', 'firstName', 'lastName', 'image', 'gender'],
                    include: [
                        {
                            model: Appointment,
                            where: {
                                datetime: {
                                    [Op.gt]: xMonthsAgo,
                                }
                            },
                            required: false
                        },
                    ]
                }, {
                    model: Seeker,
                    attributes: ['id', 'firstName', 'lastName', 'image', 'gender'],
                    include: [
                        {
                            model: Appointment,
                            where: {
                                datetime: {
                                    [Op.gt]: xMonthsAgo,
                                }
                            },
                            required: false
                        },
                    ]
                },
                // {
                //     model: Centre,
                //     attributes: ['id', 'name', 'regNo', 'image', 'address'],
                //     include: [{
                //         model: Appointment,
                //         where: {
                //             datetime: {
                //                 [Op.gt]: xMonthsAgo,
                //             },

                //             required: false
                //         }
                //     }]
                // }, 
                {
                    model: Wallet,
                    attributes: ['id', 'balance', 'currency']
                }]
        });


        Object.entries(user?.dataValues).forEach(([key, value]) => {
            if (typeof (value) === "object" && value === null) {
                delete user?.dataValues[key];
            }
        });


        return successResponse(res, 'success', user);
    } catch (error) {
        errorResponse(res, 'error', error);
    }
}


export const getProfileById = async (req: Request, res: Response) => {
    let { providerId } = req.params;

    try {
        const provider = await Provider.findOne({
            where: { id: providerId },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Specialization
                },
                {
                    model: Centre,
                },
                {
                    model: Availability
                },
                {
                    model: Qualification
                },
                {
                    model: Experience
                }
            ]
        })


        const countRating = await Feedback.count({ where: { providerId: provider?.id } })
        const addRating = await Feedback.sum('rating', {
            where: {
                providerId: provider?.id
            }
        }) ?? 0;

        let avgRating: number = 0

        if (countRating > 0)
            avgRating = addRating / countRating;

        const countFavourites = await Favorite.count({ where: { providerId: provider?.id } })

        provider?.setDataValue('avgRating', avgRating);
        provider?.setDataValue('favourites', countFavourites);

        return successResponse(res, 'success', provider);
    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


export const getProviders = async (req: Request, res: Response) => {
    let { specialization, category } = req.query;

    let spec
    let whereCondition: { [key: string]: any } = {}

    if (specialization) {
        spec = await Specialization.findOne({
            where: {
                name: specialization
            }
        })

        whereCondition.specializationId = spec?.id;
    }

    if (category) {
        whereCondition.category = category;
    }

    try {
        const providers = await Provider.findAll({
            where: whereCondition,

            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['updatedAt', 'password']
                    },
                },
                {
                    model: Specialization
                }

            ]
        })

        for (let i = 0; i < providers.length; i++) {
            const provider = providers[i];

            const countRating = await Feedback.count({ where: { providerId: provider.id } })
            const addRating = await Feedback.sum('rating', {
                where: {
                    providerId: provider.id
                }
            }) ?? 0;

            let avgRating: number = 0

            if (countRating > 0)
                avgRating = addRating / countRating;

            const countFavourites = await Favorite.count({ where: { providerId: provider.id } })

            provider.setDataValue('avgRating', avgRating);
            provider.setDataValue('favourites', countFavourites);
        }


        return successResponse(res, 'success', providers);
    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}


