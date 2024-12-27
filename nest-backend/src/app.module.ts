import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { KeyModule } from './key/key.module';
import { DocumentModule } from './document/document.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ResultModule } from './result/result.module';
import { MethodsModule } from './methods/methods.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';

global.ReadableStream = require('web-streams-polyfill').ReadableStream;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AiModule,
    KeyModule,
    DocumentModule,
    AnalysisModule,
    ResultModule,
    MethodsModule,
    UserModule,
    AuthModule,
    TagModule,
  ],
})
export class AppModule {}
