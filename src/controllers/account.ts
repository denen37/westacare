import { Request, Response } from "express";
import { AccountDetails } from "../models/Models";
import config from "../config/configSetup";
import axios from "axios";
import { errorResponse, successResponse } from "../utils/modules";

export const getBanks = async (req: Request, res: Response) => {
    try {
        const response = await axios.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`
            }
        })

        return successResponse(res, "success", response.data.data)
    } catch (error: any) {
        return errorResponse(res, "error", error.message)
    }
}


export const addAccount = async (req: Request, res: Response) => {
    const { id } = req.user;

    const { accountName, bank, bankCode, accountNumber } = req.body;

    if (!accountName || !bank || !bankCode || !accountNumber) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const response = await axios.post(
        'https://api.paystack.co/transferrecipient',
        {
            type: 'nuban',
            name: accountName,
            account_number: accountNumber,
            bank_code: bankCode,
            currency: 'NGN',
        },
        {
            headers: {
                Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const { data } = response.data;

    const account = await AccountDetails.create({
        userId: id,
        name: accountName,
        bank: bank,
        number: accountNumber,
        recipientCode: data.recipient_code,
        currency: data.currency,
    })

    return successResponse(res, 'success', account);
}


export const getAccounts = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;

        const accounts = await AccountDetails.findAll({ where: { userId: id } });

        return successResponse(res, 'success', accounts);
    } catch (error: any) {
        return errorResponse(res, 'error', error.message);
    }
}