import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type WebhookDocument = HydratedDocument<Webhook>

@Schema()
export class Webhook {

    @Prop({type:Object, required: true})
    data: any

    @Prop({required: true})
    creationDate: string
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook)