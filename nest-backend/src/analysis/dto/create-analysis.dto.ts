import {
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';

export class CreateAnalysisDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    created: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
