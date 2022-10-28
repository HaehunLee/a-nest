import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// 실제로는 NestMogan을 사용하면 됨.

@Injectable() // Providers에 넣어줘야함.
export class LoggerMiddleware implements NestMiddleware {
  // implements를 사용하면 Typescript의 강점을 이용하여 무조건 구현해야하는 것을 잡아준다.
  private logger = new Logger('HTTP'); // 로그 구분을 용이하게 해줌.

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
