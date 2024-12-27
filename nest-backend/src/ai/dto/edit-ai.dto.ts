import {
    IsBoolean,
    IsOptional,
    IsString,
} from 'class-validator';

export class EditAIDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    is_free?: boolean;
}