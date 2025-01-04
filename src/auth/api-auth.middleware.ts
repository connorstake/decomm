import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IUserApiRequest } from './interfaces/IUserApiRequest';
import * as crypto from 'crypto';
import { ApiKeyTable } from '../prisma/api-key/ApiKeyTable';
import { User } from '@prisma/client';
import { RequestLogTable } from '../prisma/request-log/RequestLogTable';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly apiKeyService: ApiKeyTable,
    private readonly logRequestService: RequestLogTable,
  ) {}

  public async use(req: IUserApiRequest, res: Response, next: NextFunction) {
    try {
      // 1. Extract API key from request (could be in headers, query, etc.)
      // For example, we look in 'x-api-key' header:
      const apiKey = req.header('x-api-key') || null;
      const hashIp = req.ip
        ? crypto.createHash('sha256').update(req.ip).digest('hex')
        : null;

      if (apiKey) {
        // 2. Validate the API key
        const validationResult: User | null =
          await this.apiKeyService.keyHolder(apiKey);
        const keyInfo = await this.apiKeyService.infoByKey(apiKey);
        if (!keyInfo || keyInfo.revoked) {
          return res.status(401).json({ message: 'Invalid API key' });
        }
        if (validationResult) {
          await this.logRequestService.save(
            validationResult.id,
            keyInfo?.id,
            hashIp,
            req.path,
            req.method,
          );
          req.userId = validationResult.id;
          req.apiKey = apiKey;
          return next();
        }
        return res
          .status(401)
          .json({ message: 'No valid API key or IP address found' });
      }

      const ipAddress = req.ip;
      // e.g. make a hash for privacy
      if (!ipAddress) {
        return res
          .status(401)
          .json({ message: 'No valid API key or IP address found' });
      }

      if (!hashIp) {
        return res
          .status(401)
          .json({ message: 'No valid API key or IP address found' });
      }
      // 5. Log request with "guest"
      await this.logRequestService.save(
        null,
        null,
        hashIp || null,
        req.path,
        req.method,
      );

      // If you still want to allow "guest usage," do next:
      // next();

      // If you want to block them, do:
      return next();
    } catch (error) {
      console.error('API Key validation error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
