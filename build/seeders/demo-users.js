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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const saltRounds = 10;
        const users = [
            {
                email: 'admin@example.com',
                phone: '1234567890',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.VERIFIED,
                role: User_1.UserRole.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker1@example.com',
                phone: '0987654321',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.STEP_TWO,
                role: User_1.UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker2@example.com',
                phone: '0987654322',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.SUSPENDED,
                state: User_1.UserState.STEP_THREE,
                role: User_1.UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider1@example.com',
                phone: '1122334455',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.INACTIVE,
                state: User_1.UserState.STEP_ONE,
                role: User_1.UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider2@example.com',
                phone: '1122334456',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.VERIFIED,
                role: User_1.UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'centre1@example.com',
                phone: '2233445566',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.STEP_TWO,
                role: User_1.UserRole.CENTRE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'centre2@example.com',
                phone: '2233445567',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.INACTIVE,
                state: User_1.UserState.STEP_ONE,
                role: User_1.UserRole.CENTRE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'admin2@example.com',
                phone: '3344556677',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.VERIFIED,
                role: User_1.UserRole.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker3@example.com',
                phone: '4455667788',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.ACTIVE,
                state: User_1.UserState.STEP_ONE,
                role: User_1.UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider3@example.com',
                phone: '5566778899',
                password: yield bcryptjs_1.default.hash('password123', saltRounds),
                status: User_1.UserStatus.SUSPENDED,
                state: User_1.UserState.STEP_THREE,
                role: User_1.UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        yield queryInterface.bulkInsert('users', users);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('users', {});
    }),
};
