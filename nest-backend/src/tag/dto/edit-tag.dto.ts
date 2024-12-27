import {
    IsOptional,
    IsString
} from 'class-validator';

export class EditTagDto {
    @IsString()
    @IsOptional()
    name?: string;
}