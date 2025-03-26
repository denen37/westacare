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
Object.defineProperty(exports, "__esModule", { value: true });
const Gender = {
    MALE: "male",
    FEMALE: "female",
};
const MaritalStatus = {
    SINGLE: "single",
    MARRIED: "married",
    DIVORCED: "divorced",
};
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const seekers = [
            {
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                dateOfBirth: '1990-01-01',
                gender: Gender.MALE,
                maritalStatus: MaritalStatus.SINGLE,
                height: 175.5,
                weight: 70.2,
                bloodGroup: 'O+',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '0987654321',
                dateOfBirth: '1985-05-15',
                gender: Gender.FEMALE,
                maritalStatus: MaritalStatus.MARRIED,
                height: 160.2,
                weight: 60.8,
                bloodGroup: 'A-',
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Michael',
                lastName: 'Johnson',
                phone: '1122334455',
                dateOfBirth: '1992-07-20',
                gender: Gender.MALE,
                maritalStatus: MaritalStatus.SINGLE,
                height: 180.0,
                weight: 75.5,
                bloodGroup: 'B+',
                userId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Emily',
                lastName: 'Davis',
                phone: '2233445566',
                dateOfBirth: '1995-09-10',
                gender: Gender.FEMALE,
                maritalStatus: MaritalStatus.DIVORCED,
                height: 165.4,
                weight: 68.3,
                bloodGroup: 'AB-',
                userId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'David',
                lastName: 'Wilson',
                phone: '3344556677',
                dateOfBirth: '1988-03-25',
                gender: Gender.MALE,
                maritalStatus: MaritalStatus.MARRIED,
                height: 172.0,
                weight: 80.0,
                bloodGroup: 'O-',
                userId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        yield queryInterface.bulkInsert('seekers', seekers);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('seekers', {});
    }),
};
