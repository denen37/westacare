"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPin = exports.debitWallet = void 0;
const Models_1 = require("../models/Models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const modules_1 = require("../utils/modules");
const Transaction_1 = require("../models/Transaction");
const debitWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { amount, pin, reason } = req.body;
    try {
        const wallet = yield Models_1.Wallet.findOne({ where: { userId: id } });
        if (!wallet) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Wallet not found');
        }
        if (wallet.pin) {
            const match = yield bcryptjs_1.default.compare(pin, wallet.pin);
            if (!match) {
                return (0, modules_1.handleResponse)(res, 400, false, 'Incorrect pin');
            }
        }
        let balance = wallet.balance;
        if (balance < amount) {
            return (0, modules_1.handleResponse)(res, 400, false, 'Insufficient balance');
        }
        balance -= amount;
        yield wallet.update({ balance });
        yield wallet.save();
        const transaction = yield Models_1.Transaction.create({
            userId: id,
            amount: amount,
            reference: null,
            status: 'success',
            channel: 'wallet',
            timestamp: Date.now(),
            description: reason || 'Wallet payment',
            type: Transaction_1.TransactionType.DEBIT,
        });
        return (0, modules_1.successResponse)(res, 'success', { balance });
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', 'An error occurred');
    }
});
exports.debitWallet = debitWallet;
const setPin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { pin } = req.body;
    if (!pin || pin.length < 5) {
        return (0, modules_1.handleResponse)(res, 400, false, 'Pin must be at least 5 characters');
    }
    try {
        const wallet = yield Models_1.Wallet.findOne({ where: { userId: id } });
        if (!wallet) {
            return (0, modules_1.handleResponse)(res, 404, false, 'Wallet not found');
        }
        // Hash pin
        const hashedPin = yield bcryptjs_1.default.hash(pin, 10);
        yield wallet.update({ pin: hashedPin });
        yield wallet.save();
        return (0, modules_1.successResponse)(res, 'success', 'Pin set successfully');
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', 'An error occurred');
    }
});
exports.setPin = setPin;
