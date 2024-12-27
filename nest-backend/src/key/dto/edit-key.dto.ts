import {
    IsOptional,
    IsEmail,
    IsString,
} from 'class-validator';

export class EditKeyDto {
    @IsString()
    @IsOptional()
    api_key: string;

    @IsEmail()
    @IsOptional()
    api_email: string;
}