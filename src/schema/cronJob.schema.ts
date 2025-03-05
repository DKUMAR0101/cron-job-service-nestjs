
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CronJobDocument = HydratedDocument<CronJob>;

@Schema({timestamps: true})
export class CronJob {
  @Prop({required: true})
  name: String

  @Prop({required: true})
  link: String

  @Prop({required: true})
  apiKey: String

  @Prop({required: true})
  scheduleTime: String

  @Prop({default: []})
  history: {time: Date, response: string}[]

}

export const CronJobSchema = SchemaFactory.createForClass(CronJob);
