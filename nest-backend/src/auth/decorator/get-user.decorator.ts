import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    //Retornar datos relevantes usuario
    //console.log(request.user);
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);