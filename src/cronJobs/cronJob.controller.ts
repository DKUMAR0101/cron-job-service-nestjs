import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Cronjob } from "src/schema/cronJob.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CronjobDto } from "src/dto/cronjob.dto";
import { cronJobService } from "./cronJob.service";
import { Webhook, WebhookSchema } from "src/schema/webHook.schema";
import { webhookDto } from "src/dto/webhookDto.dto";




@Controller('cronjob')
export class CronJobController{

    constructor(private readonly cronJobService: cronJobService,
    @InjectModel(Cronjob.name) private CronjobModel: Model<Cronjob>,
    @InjectModel(Webhook.name) private WebhookModel: Model<Webhook>
    ) {}

    // to create cronjobs
    @Post('create')
    async Create(@Body() job:CronjobDto){
        try {
            const createdJob = new this.CronjobModel(job)
            return await createdJob.save()
        } catch (error) {
           console.log('failed to create job',error) 
        }
    }

    // to get all cron jobs
    @Get('all')
    async FindAll(){
        try {
            return await this.CronjobModel.find({})
        } catch (error) {
            console.log('failed to get jobs',error);
            
        }
    }

    // to get one cron job by id
    @Get(':id')
    async FindbyId(@Param('id') id: any){
        try {
            return await this.CronjobModel.findById(id).exec()
        } catch (error) {
            console.log('failed to get job by id',error);   
        }
    }

    // to update cron job by id
    @Put('update/:id')
    async Update(@Param('id') id: any, @Body() updateJob: CronjobDto){
        try {
            return await this.CronjobModel.findByIdAndUpdate(id,updateJob).exec()
        } catch (error) {
            console.log('failed to update',error);
        }
    }

    // to delete cron job
    @Delete('delete/:id')
    async Remove(@Param('id') id: any){
        try {
            return await this.CronjobModel.findByIdAndDelete(id).exec()
        } catch (error) {
            console.log('failed to delete',error);
            
        }
    }

    @Post('createWebhook')
    async createWebhook(@Body() data:webhookDto){
        try {
            const createdWebhook = new this.WebhookModel(data)
            return await createdWebhook.save()
        } catch (error) {
            console.log('failed to create Webhook', error)
        }
    }

    @Get('allWebhooks')
    async findAllWebhooks(){
        try {
            return await this.WebhookModel.find({})
        } catch (error) {
            console.log('failed to get all webhooks',error)
        }
    }

}