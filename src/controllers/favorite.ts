import { Request, Response } from 'express'
import { Favorite, Provider, Seeker } from '../models/Models'
import { UserRole } from '../models/User';
import { errorResponse, successResponse } from '../utils/modules';

export const getAllFavorites = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    try {
        if (role !== UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can view their favorites' });
        }

        const seeker = await Seeker.findOne({
            where: { userId: id },
            include: [
                {
                    model: Provider,
                    as: 'favoriteProviders'
                }
            ]
        });

        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }

        return successResponse(res, "success", seeker.favoriteProviders);
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}

export const addFavorite = async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { providerId } = req.body;

    try {
        if (role !== UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can add favorites' });
        }

        const seeker = await Seeker.findOne({ where: { userId: id } });

        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }

        const provider = await Provider.findOne({ where: { id: providerId } });

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        const favorite = await Favorite.create({ seekerId: seeker.id, providerId: provider.id });


        successResponse(res, "success", favorite);
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}

export const removeFavorite = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    const providerId = req.params.providerId

    try {
        if (role !== UserRole.SEEKER) {
            return res.status(403).json({ message: 'Only seekers can remove favorites' });
        }

        const seeker = await Seeker.findOne({ where: { userId: id } });

        if (!seeker) {
            return res.status(404).json({ message: 'Seeker not found' });
        }

        const favorite = await Favorite.destroy({ where: { seekerId: seeker.id, providerId: providerId } });

        successResponse(res, "success", favorite);
    } catch (error) {
        return errorResponse(res, "error", error);
    }
}