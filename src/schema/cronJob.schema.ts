import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CronjobDocument = HydratedDocument<Cronjob> 

@Schema({timestamps: true})
export class Cronjob{
  @Prop({required: true})
  name: string

  @Prop({required: true})
  link: string

  @Prop({required: true})
  apiKey: string

  @Prop({required: true})
  scheduleTime: string

  @Prop({required: true})
  startDate: string

  @Prop({default:[]})
  history: {triggerTime: string, response: []}[]
}

export const CronjobSchema = SchemaFactory.createForClass(Cronjob)