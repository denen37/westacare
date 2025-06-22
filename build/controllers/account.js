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
exports.getAccounts = exports.addAccount = exports.getBanks = void 0;
const Models_1 = require("../models/Models");
const configSetup_1 = __importDefault(require("../config/configSetup"));
const axios_1 = __importDefault(require("axios"));
const modules_1 = require("../utils/modules");
const getBanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${configSetup_1.default.PAYSTACK_SECRET_KEY}`
            }
        });
        return (0, modules_1.successResponse)(res, "success", response.data.data);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, "error", error.message);
    }
});
exports.getBanks = getBanks;
const addAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { accountName, bank, bankCode, accountNumber } = req.body;
    if (!accountName || !bank || !bankCode || !accountNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const response = yield axios_1.default.post('https://api.paystack.co/transferrecipient', {
        type: 'nuban',
        name: accountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN',
    }, {
        headers: {
            Authorization: `Bearer ${configSetup_1.default.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    });
    const { data } = response.data;
    const account = yield Models_1.AccountDetails.create({
        userId: id,
        name: accountName,
        bank: bank,
        number: accountNumber,
        recipientCode: data.recipient_code,
        currency: data.currency,
    });
    return (0, modules_1.successResponse)(res, 'success', account);
});
exports.addAccount = addAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const accounts = yield Models_1.AccountDetails.findAll({ where: { userId: id } });
        return (0, modules_1.successResponse)(res, 'success', accounts);
    }
    catch (error) {
        return (0, modules_1.errorResponse)(res, 'error', error.message);
    }
});
exports.getAccounts = getAccounts;
