import { Injectable } from "@nestjs/common";
import { CronJob } from "src/schema/cronJob.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as cron from 'node-cron';
import axios from "axios";


@Injectable()
export class cronJobService{
    constructor(@InjectModel(CronJob.name) private CronJobModel: Model<CronJob>){
        this.initializeJobs()
    }

    // create a task and start it.
    scheduleJobs(job){

        let task = cron.schedule(job.scheduleTime,async() => {

            try {
                console.log(`triggering job:  ${job.name}`)
                const response = await axios.get(job.link)
                console.log(response);

                job.history.push({time: new Date(), response:'response'})
                await job.save()
            } catch (error) {
                console.log(error)
            }
        })
        task.start()

    }

    async initializeJobs(){
        try {
            const jobs = await this.CronJobModel.find().exec()

            for (const job of jobs) {
                this.scheduleJobs(job)
            }
        } catch (error) {
            console.log(error);    
        }
    }

}