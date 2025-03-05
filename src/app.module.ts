import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobModule } from './cronJobs/cronJob.module';



@Module({
  imports: [CronJobModule,
    MongooseModule.forRoot('mongodb+srv://db1:db1@cluster0.zhdkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
