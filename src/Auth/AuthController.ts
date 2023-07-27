import { Router, Request, Response, NextFunction } from "express";
import IController from "./../common/types/Controller";
import { UserRegisterDTO, UserLoginDTO } from "./../User/User";
import { Validator } from "./../utils/Validator";
import HttpException from "./../common/exceptions/HttpException";
import { isAuthenticated } from "./../common/middlewares/isAuthenticated";
import AuthService from "./AuthService";

class AuthController implements IController {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/logout`, isAuthenticated, this.logout);
    }

    private async register(req: Request, res: Response, next: NextFunction) {
        const registrationData: UserRegisterDTO = req.body;

        if(!Validator.validateEmail(registrationData.email)) {
            return next(new HttpException(400, 'Invalid email'));
        }

        if(!Validator.validatePassword(registrationData.password)) {
            return next(new HttpException(400, 'Invalid password'));
        }

        if(!Validator.validateName(registrationData.firstName)) {
            return next(new HttpException(400, 'First name is required'));
        }

        try {
            const user = await AuthService.register(registrationData);

            res.cookie('accessToken', AuthService.generateAccessToken(user._id), {
                httpOnly: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 10 // 10 minutes
            });

            res.cookie('refreshToken', AuthService.generateRefreshToken(user.email, user.password), {
                httpOnly: process.env.NODE_ENV === 'production'
            });

            return res.status(201).json({
                message: 'success',
                user
            });
        } catch(err: any) {
            if(err.code === 11000) {
                return next(new HttpException(400, 'Email already registered'))
            }
            return next(err);
        }

    }

    private async login(req: Request, res: Response, next: NextFunction) {
        const loginData: UserLoginDTO = req.body;

        if(!Validator.validateEmail(loginData.email)) {
            return next(new HttpException(400, 'Invalid email'));
        }

        if(!Validator.validatePassword(loginData.password)) {
            return next(new HttpException(400, 'Invalid password'));
        }

        try {
            const user = await AuthService.login(loginData);

            res.cookie('accessToken', AuthService.generateAccessToken(user._id), {
                httpOnly: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 10 // 10 minutes
            });

            res.cookie('refreshToken', AuthService.generateRefreshToken(user.email, user.password), {
                httpOnly: process.env.NODE_ENV === 'production'
            });

            return res.status(200).json({
                message: 'success',
                user
            });
        } catch(err:any) {
            if(err.message === 'User not found' || err.message === 'Invalid password') {
                return next(new HttpException(400, 'Invalid credentials'));
            }
            return next(err);
        }

    }

    private async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json({
                message: 'success'
            });
        } catch(err) {
            return next(err);
        }
    }
}

export default AuthController;