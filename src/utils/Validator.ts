export class Validator {

    static validateEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static validatePassword(password: string): boolean {
        return typeof password === 'string' && password.length >= 8;
    }

    static validateName(name: string): boolean {
        return typeof name === 'string' && /^[a-zA-Z ,.'-]+$/i.test(name) && name.length >= 2;
    }

}