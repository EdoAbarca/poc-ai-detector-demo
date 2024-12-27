import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsInt,
} from 'class-validator';

export class CreateKeyDto {
    @IsString()
    @IsNotEmpty()
    api_key: string;

    @IsEmail()
    @IsNotEmpty()
    api_email: string;

    @IsInt()
    @IsNotEmpty()
    ai_id: number;
    
    @IsInt()
    @IsNotEmpty()
    user_id: number;
}