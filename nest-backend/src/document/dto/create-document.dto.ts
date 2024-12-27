import {
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @IsNotEmpty()
    analysis_id: number;
}
