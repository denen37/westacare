import { Request, Response } from "express"
import { Wallet, Transaction } from "../models/Models";
import bcrypt from "bcryptjs"
import { errorResponse, handleResponse, successResponse } from "../utils/modules";
import { TransactionType } from "../models/Transaction";

export const debitWallet = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    const { amount, pin, reason } = req.body;

    try {
        const wallet = await Wallet.findOne({ where: { userId: id } });

        if (!wallet) {
            return handleResponse(res, 404, false, 'Wallet not found')
        }

        if (wallet.pin) {

            const match = await bcrypt.compare(pin, wallet.pin);

            if (!match) {
                return handleResponse(res, 400, false, 'Incorrect pin')
            }

        }

        let balance = wallet.balance;

        if (balance < amount) {
            return handleResponse(res, 400, false, 'Insufficient balance')
        }

        balance -= amount;

        await wallet.update({ balance });

        await wallet.save();

        const transaction = await Transaction.create({
            userId: id,
            amount: amount,
            reference: null,
            status: 'success',
            channel: 'wallet',
            timestamp: Date.now(),
            description: reason || 'Wallet payment',
            type: TransactionType.DEBIT,
        })

        return successResponse(res, 'success', { balance })

    } catch (error) {
        return errorResponse(res, 'error', 'An error occurred')
    }
}

export const setPin = async (req: Request, res: Response) => {
    const { id, role } = req.user;

    const { pin } = req.body;

    if (!pin || pin.length < 5) {
        return handleResponse(res, 400, false, 'Pin must be at least 5 characters')
    }

    try {
        const wallet = await Wallet.findOne({ where: { userId: id } });

        if (!wallet) {
            return handleResponse(res, 404, false, 'Wallet not found')
        }

        // Hash pin
        const hashedPin = await bcrypt.hash(pin, 10);

        await wallet.update({ pin: hashedPin });

        await wallet.save();

        return successResponse(res, 'success', 'Pin set successfully')

    } catch (error) {
        return errorResponse(res, 'error', 'An error occurred')
    }
}