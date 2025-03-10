import { IsNotEmpty, IsString } from "class-validator";


export class CronjobDto{

    @IsString()
    @IsNotEmpty()
    name: String

    @IsString()
    @IsNotEmpty()
    link: String

    @IsString()
    @IsNotEmpty()
    apiKey: String

    @IsString()
    @IsNotEmpty()
    scheduleTime: String

    @IsString()
    @IsNotEmpty()
    startDate: String

}