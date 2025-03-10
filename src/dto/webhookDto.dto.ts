import { IsNotEmpty } from "class-validator"


export class webhookDto{

    @IsNotEmpty()
    data: any

    @IsNotEmpty()
    creationDate: string

}