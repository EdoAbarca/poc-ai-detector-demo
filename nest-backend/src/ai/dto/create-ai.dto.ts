//import { Key, Result } from '@prisma/client';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
} from 'class-validator';

export class CreateAIDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    is_free: boolean;
    /* 
    @IsArray()
    key: Key[];

    @IsArray()
    results: Result[];*/
}