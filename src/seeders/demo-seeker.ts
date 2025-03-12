import { QueryInterface } from 'sequelize';
import { Gender, MaritalStatus } from '../models/Seeker';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
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

        await queryInterface.bulkInsert('seekers', seekers);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('seekers', {});
    },
};
