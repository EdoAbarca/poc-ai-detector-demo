import {
    IsNotEmpty,
    IsString,
    IsInt,
} from 'class-validator';

export class CreateResultDto {
    @IsInt()
    @IsNotEmpty()
    ai_score: number;

    @IsString()
    @IsNotEmpty()
    ai_result: string;

    @IsInt()
    @IsNotEmpty()
    ai_id: number;

    @IsInt()
    @IsNotEmpty()
    document_id: number;
}
