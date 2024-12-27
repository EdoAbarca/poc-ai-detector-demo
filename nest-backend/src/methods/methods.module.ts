import { Module } from '@nestjs/common';
import { MethodsController } from './methods.controller';
import { MethodsService } from './methods.service';

@Module({
  controllers: [MethodsController],
  providers: [MethodsService]
})
export class MethodsModule {}
