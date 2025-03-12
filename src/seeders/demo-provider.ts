import { QueryInterface } from 'sequelize';
import { Gender } from '../models/Seeker';
import { Provider } from '../models/Provider';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
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

        await queryInterface.bulkInsert('providers', providers);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('providers', {});
    },
};
