import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
