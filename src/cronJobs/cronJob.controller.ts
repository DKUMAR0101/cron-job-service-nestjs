import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CronJob } from "src/schema/cronJob.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CronJobDto } from "src/dto/cronjob.dto";
import { cronJobService } from "./cronJob.service";


@Controller('cronJob')
export class CronJobController{

    constructor(private readonly cronJobService: cronJobService,
    @InjectModel(CronJob.name) private CronJobModel: Model<CronJob>
    ) {}

    // to create cronjobs
    @Post('create')
    async Create(@Body() job:CronJobDto){
        const createdJob = new this.CronJobModel(job)
        return await createdJob.save()
    }

    // to get all cron jobs
    @Get('all')
    async FindAll(){
        return await this.CronJobModel.find({})
    }

    // to get one cron job by id
    @Get(':id')
    async FindbyId(@Param('id') id: any){
        console.log(id);
        return await this.CronJobModel.findById(id).exec()
    }

    // to update cron job by id
    @Put('update/:id')
    async Update(@Param('id') id: any, @Body() updateJob: CronJobDto) {
        return  await this.CronJobModel.findByIdAndUpdate(id,updateJob)
    }

    // to delete cron job
    @Delete('delete/:id')
    async Remove(@Param('id') id: any) {
        return await this.CronJobModel.findByIdAndDelete(id).exec()
    }

}