
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronjobSchema, Cronjob } from 'src/schema/cronJob.schema';
import { CronJobController } from './cronJob.controller';
import { cronJobService } from './cronJob.service';
import { Webhook, WebhookSchema } from 'src/schema/webHook.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Cronjob.name, schema: CronjobSchema }]),
  MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema }])
],
  controllers: [CronJobController],
  providers: [cronJobService],
})
export class CronJobModule {}
