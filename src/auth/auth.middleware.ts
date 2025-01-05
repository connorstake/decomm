import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUserRequest } from './interfaces/IUserRequest';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: IUserRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;
    console.log('TOKEN', token);

    if (!token) {
      console.error('no token found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'secretjwttest'); // Replace with your JWT secret
      req.user = decoded; // Attach user info to the request
      req.userId = (decoded as any).userId;
      req.subscriptionType = (decoded as any).subscriptionType;
      console.log('DECODED', decoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
