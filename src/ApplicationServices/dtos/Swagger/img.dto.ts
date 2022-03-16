import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ImageDto {
    @IsString()
    @IsNotEmpty()
    public id: string;


    @IsArray()
    @IsNotEmpty()
    public photos: string;
}