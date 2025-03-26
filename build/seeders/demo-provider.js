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
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const providers = [
            {
                firstName: 'John',
                lastName: 'Doe',
                image: null,
                yearsOfExperience: 10,
                about: 'Experienced healthcare provider.',
                gender: Gender.MALE,
                dateOfBirth: '1985-06-15',
                address: '123 Main Street',
                city: 'New York',
                country: 'USA',
                clinic: 'Health First Clinic',
                userId: 1,
                centreId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                image: null,
                yearsOfExperience: 8,
                about: 'Dedicated to patient care.',
                gender: Gender.FEMALE,
                dateOfBirth: '1990-09-25',
                address: '456 Elm Street',
                city: 'Los Angeles',
                country: 'USA',
                clinic: 'Wellness Clinic',
                userId: 2,
                centreId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Michael',
                lastName: 'Brown',
                image: null,
                yearsOfExperience: 12,
                about: 'Specialist in chronic disease management.',
                gender: Gender.MALE,
                dateOfBirth: '1980-12-10',
                address: '789 Oak Avenue',
                city: 'Chicago',
                country: 'USA',
                clinic: 'City Health Center',
                userId: 3,
                centreId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        yield queryInterface.bulkInsert('providers', providers);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('providers', {});
    }),
};
