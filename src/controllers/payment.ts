import { Request, Response } from "express";
import { User, Transaction, Wallet, Transfer } from "../models/Models"
import { errorResponse, handleResponse, successResponse } from "../utils/modules";
import { UserRole } from "../models/User";
import config from "../config/configSetup"
import axios from 'axios'
import { TransactionStatus, TransactionType } from "../models/Transaction";
import { v4 as uuidv4 } from 'uuid';



export const initiatePayment = async (req: Request, res: Response) => {
    const { id, email, role } = req.user
    const { amount } = req.body

    try {
        if (!id || !email || !role) {
            return handleResponse(res, 403, false, "Unauthorized user")
        }

        if (role !== UserRole.SEEKER) {
            return handleResponse(res, 403, false, "Only Seekers can make payments")
        }


        // Initiate payment with Paystack API
        const paystackResponseInit = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email: email,
                amount: amount * 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        return successResponse(res, 'success', paystackResponseInit.data.data)
    } catch (error) {
        return handleResponse(res, 500, false, 'An error occurred while initiating payment')
    }
}

export const verifyPayment = async (req: Request, res: Response) => {
    const { id } = req.user
    const { ref } = req.params

    const paystackResponse = await axios.get(
        `https://api.paystack.co/transaction/verify/${ref}`,
        {
            headers: {
                Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
            },
        }
    );

    const { data } = paystackResponse.data;

    const transaction = await Transaction.create({
        userId: id,
        amount: data.amount / 100,
        reference: data.reference,
        status: data.status,
        channel: data.channel,
        currency: data.currency,
        timestamp: data.paid_at,
        description: 'Wallet topup',
        type: TransactionType.CREDIT,
    })

    if (data.status === TransactionStatus.SUCCESS) {
        const wallet = await Wallet.findOne({ where: { userId: id } })

        if (wallet) {
            let prevAmount = Number(wallet.balance);
            let newAmount = Number(transaction.amount);

            wallet.balance = prevAmount + newAmount;

            await wallet.save()
        }

        return successResponse(res, 'success', { transaction, wallet });
    }

    return successResponse(res, 'success', transaction);
}


export const initiateTransfer = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { amount, recipientCode, reason = "Withdrawal" } = req.body;

    // try {
    const wallet = await Wallet.findOne({ where: { userId: id } })

    if (!wallet) {
        return handleResponse(res, 404, false, 'Wallet not found')
    }

    if (amount > wallet.balance) {
        return handleResponse(res, 400, false, 'Insufficient funds')
    }

    const reference = uuidv4();

    const transfer = await Transfer.create({
        userId: req.user.id,
        amount,
        recipientCode,
        reference,
        reason,
        timestamp: new Date(),
    })

    const response = await axios.post(
        'https://api.paystack.co/transfer',
        {
            source: 'balance',
            amount: amount * 100,
            recipient: recipientCode,
            reference: reference,
            reason: reason,
        },
        {
            headers: {
                Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const responseData = response.data.data;

    if (!responseData.status) {
        return handleResponse(res, 400, false, 'Transfer failed');
    }

    wallet.balance -= amount;

    await wallet.save();

    const transaction = await Transaction.create({
        amount: amount,
        type: 'debit',
        status: 'success',
        channel: 'wallet payment',
        currency: 'NGN',
        reference: reference,
        timestamp: new Date(),
        userId: id
    })

    return successResponse(res, 'success', transaction);
    // } catch (error) {
    //     return errorResponse(res, "error", error);
    // }
}
