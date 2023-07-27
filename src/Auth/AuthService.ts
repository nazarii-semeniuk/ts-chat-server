import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../User/UserModel";
import { UserLoginDTO, UserRegisterDTO } from "../User/User";

import { JWT_SECRET_KEY } from '../config';

export default class AuthService {

    static async register(userData: UserRegisterDTO) {
        const user = await User.create(userData);
        return user;
    }

    static async login(loginData: UserLoginDTO) {
        const user = await User.findOne({ email: loginData.email });
        
        if(!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.comparePasswords(loginData.password, user.password);

        if(!isPasswordValid) {
            throw new Error('Invalid password');
        }
    
        return user;
    }

    static async logout() {
        return true;
    }

    static async comparePasswords(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateAccessToken(_id: string) {
        return jwt.sign({ _id }, JWT_SECRET_KEY, { expiresIn: '10m' });
    }

    static generateRefreshToken(email: string, password: string) {
        return jwt.sign({ email, password }, JWT_SECRET_KEY)
    }

}