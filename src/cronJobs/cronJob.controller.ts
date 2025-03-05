import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CronJob } from "src/schema/cronJob.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CronJobDto } from "src/dto/cronjob.dto";
import { cronJobService } from "./cronJob.service";
import { promises } from "dns";


@Controller('cronJob')
export class CronJobController{

    constructor(private readonly cronJobService: cronJobService,
    @InjectModel(CronJob.name) private CronJobModel: Model<CronJob>
    ) {}

    // to create cronjobs
    @Post('create')
    async Create(@Body() job:CronJobDto){
        try {
            const createdJob = new this.CronJobModel(job)
            return await createdJob.save()
        } catch (error) {
           console.log('failed to create job',error) 
        }
    }

    // to get all cron jobs
    @Get('all')
    async FindAll(){
        try {
            return await this.CronJobModel.find({})
        } catch (error) {
            console.log('failed to get jobs',error);
            
        }
    }

    // to get one cron job by id
    @Get(':id')
    async FindbyId(@Param('id') id: any){
        try {
            console.log(id);
            return await this.CronJobModel.findById(id).exec()
        } catch (error) {
            console.log('failed to get job by id',error);
            
        }
    }

    // to update cron job by id
    @Put('update/:id')
    async Update(@Param('id') id: any, @Body() updateJob: CronJobDto){
        try {
            return await this.CronJobModel.findByIdAndUpdate(id,updateJob).exec()
        } catch (error) {
            console.log('failed to update',error);
        }
    }

    // to delete cron job
    @Delete('delete/:id')
    async Remove(@Param('id') id: any){
        try {
            return await this.CronJobModel.findByIdAndDelete(id).exec()
        } catch (error) {
            console.log('failed to delete',error);
            
        }
    }

}