import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus, UserState } from '../models/User';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        const saltRounds = 10;

        const users = [
            {
                email: 'admin@example.com',
                phone: '1234567890',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.VERIFIED,
                role: UserRole.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker1@example.com',
                phone: '0987654321',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.STEP_TWO,
                role: UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker2@example.com',
                phone: '0987654322',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.SUSPENDED,
                state: UserState.STEP_THREE,
                role: UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider1@example.com',
                phone: '1122334455',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.INACTIVE,
                state: UserState.STEP_ONE,
                role: UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider2@example.com',
                phone: '1122334456',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.VERIFIED,
                role: UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'centre1@example.com',
                phone: '2233445566',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.STEP_TWO,
                role: UserRole.CENTRE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'centre2@example.com',
                phone: '2233445567',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.INACTIVE,
                state: UserState.STEP_ONE,
                role: UserRole.CENTRE,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'admin2@example.com',
                phone: '3344556677',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.VERIFIED,
                role: UserRole.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'seeker3@example.com',
                phone: '4455667788',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.ACTIVE,
                state: UserState.STEP_ONE,
                role: UserRole.SEEKER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'provider3@example.com',
                phone: '5566778899',
                password: await bcrypt.hash('password123', saltRounds),
                status: UserStatus.SUSPENDED,
                state: UserState.STEP_THREE,
                role: UserRole.PROVIDER,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await queryInterface.bulkInsert('users', users);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('users', {});
    },
};
