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
const Appointment_1 = require("../models/Appointment");
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const appointments = [
            {
                location: '123 Main St, City A',
                type: Appointment_1.AppointmentType.PHYSICAL,
                datetime: new Date(),
                notes: 'General checkup',
                status: Appointment_1.AppointmentStatus.PENDING,
                providerId: 4,
                seekerId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '456 Elm St, City B',
                type: Appointment_1.AppointmentType.VIRTUAL,
                datetime: new Date(),
                notes: 'Follow-up consultation',
                status: Appointment_1.AppointmentStatus.CONFIRMED,
                providerId: 5,
                seekerId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '789 Oak St, City C',
                type: Appointment_1.AppointmentType.PHYSICAL,
                datetime: new Date(),
                notes: 'Dental checkup',
                status: Appointment_1.AppointmentStatus.COMPLETED,
                providerId: 6,
                seekerId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '101 Pine St, City D',
                type: Appointment_1.AppointmentType.VIRTUAL,
                datetime: new Date(),
                notes: 'Eye test',
                status: Appointment_1.AppointmentStatus.CANCELLED,
                providerId: 4,
                seekerId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '202 Birch St, City E',
                type: Appointment_1.AppointmentType.PHYSICAL,
                datetime: new Date(),
                notes: 'Routine health check',
                status: Appointment_1.AppointmentStatus.NO_SHOW,
                providerId: 5,
                seekerId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '303 Cedar St, City F',
                type: Appointment_1.AppointmentType.VIRTUAL,
                datetime: new Date(),
                notes: 'Nutrition consultation',
                status: Appointment_1.AppointmentStatus.PENDING,
                providerId: 6,
                seekerId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '404 Maple St, City G',
                type: Appointment_1.AppointmentType.PHYSICAL,
                datetime: new Date(),
                notes: 'Cardiology check',
                status: Appointment_1.AppointmentStatus.CONFIRMED,
                providerId: 4,
                seekerId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '505 Spruce St, City H',
                type: Appointment_1.AppointmentType.VIRTUAL,
                datetime: new Date(),
                notes: 'Mental health session',
                status: Appointment_1.AppointmentStatus.COMPLETED,
                providerId: 5,
                seekerId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '606 Walnut St, City I',
                type: Appointment_1.AppointmentType.PHYSICAL,
                datetime: new Date(),
                notes: 'Physiotherapy session',
                status: Appointment_1.AppointmentStatus.CANCELLED,
                providerId: 6,
                seekerId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                location: '707 Chestnut St, City J',
                type: Appointment_1.AppointmentType.VIRTUAL,
                datetime: new Date(),
                notes: 'Dermatology consultation',
                status: Appointment_1.AppointmentStatus.NO_SHOW,
                providerId: 4,
                seekerId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        yield queryInterface.bulkInsert('appointments', appointments);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('appointments', {});
    }),
};
