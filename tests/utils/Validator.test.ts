import { faker } from '@faker-js/faker';
import { Validator } from './../../src/utils/Validator';

describe('Validator', () => {

    describe('validateEmail', () => {

        test('Should return false if email does not contain @', () => {
            const email = faker.internet.email().replace('@', '');
            expect(Validator.validateEmail(email)).toBe(false);
        });

        test('Should return false if email does not have a username', () => {
            const email = faker.internet.email().replace(/.*@/, '@');
            expect(Validator.validateEmail(email)).toBe(false);
        });

        test('Should return false if email does not have a domain', () => {
            const email = faker.internet.email().replace(/@.*/, '@');
            expect(Validator.validateEmail(email)).toBe(false);
        });

        test('Should return false if email has multiple @', () => {
            const email = faker.internet.email().replace('@', '@@');
            expect(Validator.validateEmail(email)).toBe(false);
        });

        test('Should return false if email does not have a domain extension', () => {
            const email = faker.internet.email().replace(/\.[a-z]+$/, '');
            expect(Validator.validateEmail(email)).toBe(false);
        });

        test('Should return true if email is valid', () => {
            const email = faker.internet.email();
            expect(Validator.validateEmail(email)).toBe(true);
        });

    });

    describe('validatePassword', () => {

        test('Should return false if password is less than 8 characters', () => {
            const password = faker.internet.password(7);
            expect(Validator.validatePassword(password)).toBe(false);
        });

        test('Should return true if password is 8 characters', () => {
            const password = faker.internet.password(8);
            expect(Validator.validatePassword(password)).toBe(true);
        });

        test('Should return true if password is more than 8 characters', () => {
            const password = faker.internet.password(9);
            expect(Validator.validatePassword(password)).toBe(true);
        });

    });

    describe('validateName', () => {

        test('Should return false if name is shorter than 2 symbols', () => {
            const name = faker.person.firstName().slice(0, 1);
            expect(Validator.validateName(name)).toBe(false);
        });

        test('Should return false if name contains numbers', () => {
            const name = faker.person.firstName() + faker.number.int(10);
            expect(Validator.validateName(name)).toBe(false);
        });

        test('Should return true if name is valid', () => {
            const name = faker.person.firstName();
            expect(Validator.validateName(name)).toBe(true);
        })

    });

});