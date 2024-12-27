import {
    IsOptional,
    IsString,
    IsInt,
} from 'class-validator';

export class EditResultDto{
    @IsOptional()
    @IsInt()
    ai_score: number;

    @IsOptional()
    @IsString()
    ai_result: string;

    @IsOptional()
    @IsInt()
    ai_id: number;

    @IsOptional()
    @IsInt()
    document_id: number;
}
