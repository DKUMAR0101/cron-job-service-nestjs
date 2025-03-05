
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobSchema, CronJob } from 'src/schema/cronJob.schema';
import { CronJobController } from './cronJob.controller';
import { cronJobService } from './cronJob.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CronJob.name, schema: CronJobSchema }])],
  controllers: [CronJobController],
  providers: [cronJobService],
})
export class CronJobModule {}
