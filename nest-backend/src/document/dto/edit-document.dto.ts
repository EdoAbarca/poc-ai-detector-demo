import {
    IsOptional,
    IsString,
    IsInt,
} from 'class-validator';

export class EditDocumentDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsInt()
    @IsOptional()
    analysis_id: number;
}