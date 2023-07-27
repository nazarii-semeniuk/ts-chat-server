import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from './../exceptions/HttpException';

import { JWT_SECRET_KEY } from '../../config';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const cookie = req.cookies['accessToken'];

        if(!cookie) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        const decoded = jwt.verify(cookie, JWT_SECRET_KEY) as { _id: string };

        if(!decoded) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        next();

    } catch(err: any) {
        if(err.message === 'jwt expired') {
            return next(new HttpException(400, 'JWT expired'));
        }

        return next(err);
    }
}