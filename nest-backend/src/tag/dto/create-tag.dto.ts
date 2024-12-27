import {
    IsNotEmpty,
    IsString,
    IsInt
} from 'class-validator';

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    user_id: number;
}